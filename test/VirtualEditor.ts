import * as Utils from "../src/Utils";
import {VimStyle, Position, Range} from "../src/VimStyle";

export class VirtualEditor implements IEditor {
    private contents: string[];
    public CommandStatus: string;
    public ModeStatus: string;
    public Position: Position;
    public VimStyle: IVimStyle;
    constructor() {
        this.contents = [];
        this.CommandStatus = "";
        this.ModeStatus = "";
        this.Position = new Position();
        this.Position.Char = 0;
        this.Position.Line = 0;
    }

    public SetContent(textList: string[]) {
        this.contents = textList;
        var len = textList.length;
        for (var i = 0; i < len;i++){
            var line = textList[i];
            var c = line.indexOf("|");
            if(c != -1){
                this.Position.Line = i;
                this.Position.Char = c;
                this.contents[i] = this.contents[i].replace("|", "");
                return;
            }
        }
    }

    public GetContent(): string[] {
        var output = [];
        var len = this.contents.length;
        for (var i = 0; i < len; i++){
            output.push(this.contents[i]);
        }
        var line = output[this.Position.Line];
        output[this.Position.Line] = line.substr(0, this.Position.Char) + "|" + line.substr(this.Position.Char, line.length);
        return output;
    }

    public CloseCommandStatus() {
        this.CommandStatus = "";
    }
    public ShowCommandStatus(text: string) {
        this.CommandStatus = text;
    }
    public ShowModeStatus(mode: VimMode) {
        this.ModeStatus = Utils.ModeToString(mode);
    }
    public InsertTextAtCurrentPosition(text: string) {
        var cLine = this.contents[this.Position.Line];
        var pre = cLine.substr(0, this.Position.Char);
        var su = cLine.substr(this.Position.Char, cLine.length - this.Position.Char);
        var lineList = text.split("\n");
        if (lineList.length == 0) {
            this.contents[this.Position.Line] = pre + text + su;
            return;
        }
        this.contents[this.Position.Line] = pre + lineList[0];
        for (var i = 1; i < lineList.length - 1; i++){
            this.contents.splice(this.Position.Line + i, 0, lineList[i]);
        }
        this.contents.splice(this.Position.Line + lineList.length -1, 0, lineList[lineList.length-1] + su);
        this.Position.Line = this.Position.Line + lineList.length - 1;
        this.Position.Char = lineList[lineList.length].length;
    }
    public SetModeStatusVisibility(visible: boolean) {
        return;
    }

    public InsertCharactorAtCurrentPosition(char: string) {
        var cLine = this.contents[this.Position.Line];
        var pre = cLine.substr(0, this.Position.Char);
        var su = cLine.substr(this.Position.Char, cLine.length - this.Position.Char);
        this.contents[this.Position.Line] = pre + char + su;
        this.Position.Char += 1;
    }
    public Insert(position: IPosition, text: string) {
        var cLine = this.contents[position.Line];
        var pre = cLine.substr(0, position.Char);
        var su = cLine.substr(position.Char, cLine.length - position.Char);
        var lineList = text.split("\n");
        if (lineList.length == 0) {
            this.contents[position.Line] = pre + text + su;
            return;
        }
        this.contents[position.Line] = pre + lineList[0];
        for (var i = 1; i < lineList.length - 1; i++){
            this.contents.splice(position.Line + i, 0, lineList[i]);
        }
        this.contents.splice(position.Line + lineList.length -1, 0, lineList[lineList.length-1] + su);
    }
    public DeleteRange(range: IRange, position?: IPosition) {
        if (range.start.Line == range.end.Line) {
            var line = this.contents[range.start.Line];
            var pre = line.substr(0, range.start.Char);
            var su = line.substr(range.end.Char, line.length - range.end.Char);
            this.contents[range.start.Line] = pre + su;
            return;
        }
        var line = this.contents[range.start.Line].substr(0, range.start.Char);
        line += this.contents[range.end.Line].substr(range.end.Char, this.contents[range.end.Line].length - range.end.Char);
        this.contents.splice(range.start.Line, range.end.Line - range.start.Line + 1, line);
        if (position != undefined) {
            this.Position = position;
        }
    }
    public ReplaceRange(range: IRange, text: string) {
        this.DeleteRange(range);
        this.Insert(range.start, text);
    }

    // Read Line
    public ReadLineAtCurrentPosition(): string{
        return this.ReadLine(this.Position.Line);
    }
    public ReadLine(line: number): string{
        return this.contents[line];
    }

    // Read Range
    public ReadRange(range: IRange): string{
        if (range.start.Line == range.end.Line) {
            return this.contents[range.start.Line].substr(range.start.Char, range.end.Char - range.start.Char);
        }
        var line = this.contents[range.start.Line];
        var result = line.substr(range.start.Char, line.length - range.start.Char);
        for (var i = range.start.Line; i < range.end.Line - 1; i++){
            result += "\n" + this.contents[i];
        }
        line = this.contents[range.end.Line];
        result += "\n" + line.substr(0, range.end.Char);
        return result;
    }

    // Position
    public GetCurrentPosition(): IPosition{
        return this.Position;
    }
    public SetPosition(position: IPosition) {
        this.Position = position;
    }
    public GetLastPosition(): IPosition{
        var p = new Position();
        p.Line = this.GetLastLineNum();
        p.Char = this.contents[this.GetLastLineNum()].length;
        return p;
    }

    // Document Info
    public GetLastLineNum(): number{
        return this.contents.length - 1;
    }

    // Set VimStyle
    public SetVimStyle(vim: IVimStyle) {
        this.VimStyle = vim;
    }

    // set modes
    public ApplyNormalMode(cursor?: IPosition, isLineHasNoChar?: boolean, isLastLine?: boolean) {
        return;
    }
    public ApplyInsertMode(p: IPosition) {
        this.Position = p;
    }
    // check invalid position
    public UpdateValidPosition(p: IPosition, isBlock?: boolean): IPosition{
        if (p.Line > this.GetLastLineNum()) {
            return this.GetLastPosition();
        }
        if(p.Char > this.contents[p.Line].length){
            var np = new Position();
            np.Line = p.Line;
            np.Char = this.contents[p.Line].length;
            return np;
        }
        return p;
    }

    public Type(keystroke: string) {
        var len = keystroke.length;
        for (var i = 0; i < len; i++){
            var k = keystroke.charAt(i);
            switch (k) {
                case "a":
                    this.VimStyle.PushKey(Key.a);
                    break;
                case "b":
                    this.VimStyle.PushKey(Key.b);
                    break;
                case "c":
                    this.VimStyle.PushKey(Key.c);
                    break;
                case "d":
                    this.VimStyle.PushKey(Key.e);
                    break;
                case "e":
                    this.VimStyle.PushKey(Key.e);
                    break;
                case "f":
                    this.VimStyle.PushKey(Key.f);
                    break;
                case "g":
                    this.VimStyle.PushKey(Key.g);
                    break;
                case "h":
                    this.VimStyle.PushKey(Key.h);
                    break;
                case "i":
                    this.VimStyle.PushKey(Key.i);
                    break;
                case "j":
                    this.VimStyle.PushKey(Key.j);
                    break;
                case "k":
                    this.VimStyle.PushKey(Key.k);
                    break;
                case "l":
                    this.VimStyle.PushKey(Key.l);
                    break;
                case "m":
                    this.VimStyle.PushKey(Key.m);
                    break;
                case "n":
                    this.VimStyle.PushKey(Key.n);
                    break;
                case "o":
                    this.VimStyle.PushKey(Key.o);
                    break;
                case "p":
                    this.VimStyle.PushKey(Key.p);
                    break;
                case "q":
                    this.VimStyle.PushKey(Key.q);
                    break;
                case "r":
                    this.VimStyle.PushKey(Key.r);
                    break;
                case "s":
                    this.VimStyle.PushKey(Key.s);
                    break;
                case "t":
                    this.VimStyle.PushKey(Key.t);
                    break;
                case "u":
                    this.VimStyle.PushKey(Key.u);
                    break;
                case "v":
                    this.VimStyle.PushKey(Key.v);
                    break;
                case "w":
                    this.VimStyle.PushKey(Key.w);
                    break;
                case "x":
                    this.VimStyle.PushKey(Key.x);
                    break;
                case "y":
                    this.VimStyle.PushKey(Key.y);
                    break;
                case "z":
                    this.VimStyle.PushKey(Key.z);
                    break;
                case "A":
                    this.VimStyle.PushKey(Key.A);
                    break;
                case "B":
                    this.VimStyle.PushKey(Key.B);
                    break;
                case "C":
                    this.VimStyle.PushKey(Key.C);
                    break;
                case "D":
                    this.VimStyle.PushKey(Key.E);
                    break;
                case "E":
                    this.VimStyle.PushKey(Key.E);
                    break;
                case "F":
                    this.VimStyle.PushKey(Key.F);
                    break;
                case "G":
                    this.VimStyle.PushKey(Key.G);
                    break;
                case "H":
                    this.VimStyle.PushKey(Key.H);
                    break;
                case "I":
                    this.VimStyle.PushKey(Key.I);
                    break;
                case "J":
                    this.VimStyle.PushKey(Key.J);
                    break;
                case "K":
                    this.VimStyle.PushKey(Key.K);
                    break;
                case "L":
                    this.VimStyle.PushKey(Key.L);
                    break;
                case "M":
                    this.VimStyle.PushKey(Key.M);
                    break;
                case "N":
                    this.VimStyle.PushKey(Key.N);
                    break;
                case "O":
                    this.VimStyle.PushKey(Key.O);
                    break;
                case "P":
                    this.VimStyle.PushKey(Key.P);
                    break;
                case "Q":
                    this.VimStyle.PushKey(Key.Q);
                    break;
                case "R":
                    this.VimStyle.PushKey(Key.R);
                    break;
                case "S":
                    this.VimStyle.PushKey(Key.S);
                    break;
                case "T":
                    this.VimStyle.PushKey(Key.T);
                    break;
                case "U":
                    this.VimStyle.PushKey(Key.U);
                    break;
                case "V":
                    this.VimStyle.PushKey(Key.V);
                    break;
                case "W":
                    this.VimStyle.PushKey(Key.W);
                    break;
                case "X":
                    this.VimStyle.PushKey(Key.X);
                    break;
                case "Y":
                    this.VimStyle.PushKey(Key.Y);
                    break;
                case "Z":
                    this.VimStyle.PushKey(Key.Z);
                    break;
                case "0":
                    this.VimStyle.PushKey(Key.n0);
                    break;
                case "1":
                    this.VimStyle.PushKey(Key.n1);
                    break;
                case "2":
                    this.VimStyle.PushKey(Key.n2);
                    break;
                case "3":
                    this.VimStyle.PushKey(Key.n3);
                    break;
                case "4":
                    this.VimStyle.PushKey(Key.n4);
                    break;
                case "5":
                    this.VimStyle.PushKey(Key.n5);
                    break;
                case "6":
                    this.VimStyle.PushKey(Key.n6);
                    break;
                case "7":
                    this.VimStyle.PushKey(Key.n7);
                    break;
                case "8":
                    this.VimStyle.PushKey(Key.n8);
                    break;
                case "9":
                    this.VimStyle.PushKey(Key.n9);
                    break;
                case "_":
                    this.VimStyle.PushEscKey();
            }
        }
    }

    public dispose() {
        return;
    }
}
