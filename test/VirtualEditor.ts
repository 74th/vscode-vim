import * as Utils from "../src/Utils";
import { Position, Range, VimStyle } from "../src/VimStyle";

export class VirtualEditor implements IEditor {

    public CommandStatus: string;
    public ModeStatus: string;
    public Position: Position;
    public VimStyle: IVimStyle;

    private contents: string[];
    private currentVisualLineModeInfo: IVisualLineModeSelectionInfo;
    private currentVisualModeSelection: IRange;

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
        let len = textList.length;
        for (let i = 0; i < len; i++) {
            let line = textList[i];
            let c = line.indexOf("|");
            if (c !== -1) {
                this.Position.Line = i;
                this.Position.Char = c;
                this.contents[i] = this.contents[i].replace("|", "");
                return;
            }
        }
    }

    public GetContent(): string[] {
        let output = [];
        let len = this.contents.length;
        for (let i = 0; i < len; i++) {
            output.push(this.contents[i]);
        }
        let line = output[this.Position.Line];
        output[this.Position.Line] =
            line.substr(0, this.Position.Char) + "|" + line.substr(this.Position.Char, line.length);
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
        let cLine = this.contents[this.Position.Line];
        let pre = cLine.substr(0, this.Position.Char);
        let su = cLine.substr(this.Position.Char, cLine.length - this.Position.Char);
        let lineList = text.split("\n");
        if (lineList.length === 1) {
            this.contents[this.Position.Line] = pre + text + su;
            this.Position.Char += text.length;
            return;
        }
        this.contents[this.Position.Line] = pre + lineList[0];
        for (let i = 1; i < lineList.length - 1; i++) {
            this.contents.splice(this.Position.Line + i, 0, lineList[i]);
        }
        this.contents.splice(this.Position.Line + lineList.length - 1, 0, lineList[lineList.length - 1] + su);
        this.Position.Line = this.Position.Line + lineList.length - 1;
        this.Position.Char = lineList[lineList.length].length;
    }
    public SetModeStatusVisibility(visible: boolean) {
        return;
    }

    public InsertCharactorAtCurrentPosition(char: string) {
        let cLine = this.contents[this.Position.Line];
        let pre = cLine.substr(0, this.Position.Char);
        let su = cLine.substr(this.Position.Char, cLine.length - this.Position.Char);
        this.contents[this.Position.Line] = pre + char + su;
        this.Position.Char += 1;
    }
    public Insert(position: IPosition, text: string) {
        let cLine = this.contents[position.Line];
        let pre = cLine.substr(0, position.Char);
        let su = cLine.substr(position.Char, cLine.length - position.Char);
        let lineList = text.split("\n");
        if (lineList.length === 1) {
            this.contents[position.Line] = pre + text + su;
            return;
        }
        this.contents[position.Line] = pre + lineList[0];
        for (let i = 1; i < lineList.length - 1; i++) {
            this.contents.splice(position.Line + i, 0, lineList[i]);
        }
        this.contents.splice(position.Line + lineList.length - 1, 0, lineList[lineList.length - 1] + su);
    }
    public DeleteRange(range: IRange, position?: IPosition) {
        if (range.start.Line === range.end.Line) {
            let line = this.contents[range.start.Line];
            let pre = line.substr(0, range.start.Char);
            let su = line.substr(range.end.Char, line.length - range.end.Char);
            this.contents[range.start.Line] = pre + su;
        } else {
            let line = this.contents[range.start.Line].substr(0, range.start.Char);
            line += this.contents[range.end.Line].substr(
                range.end.Char, this.contents[range.end.Line].length - range.end.Char);
            this.contents.splice(range.start.Line, range.end.Line - range.start.Line + 1, line);
        }
        if (position !== undefined) {
            this.Position = position;
        }
    }
    public ReplaceRange(range: IRange, text: string) {
        this.DeleteRange(range);
        this.Insert(range.start, text);
    }

    // Read Line
    public ReadLineAtCurrentPosition(): string {
        return this.ReadLine(this.Position.Line);
    }
    public ReadLine(line: number): string {
        return this.contents[line];
    }

    // Read Range
    public ReadRange(range: IRange): string {
        if (range.start.Line === range.end.Line) {
            return this.contents[range.start.Line].substr(range.start.Char, range.end.Char - range.start.Char);
        }
        let line = this.contents[range.start.Line];
        let result = line.substr(range.start.Char, line.length - range.start.Char);
        for (let i = range.start.Line + 1; i < range.end.Line; i++) {
            result += "\n" + this.contents[i];
        }
        line = this.contents[range.end.Line];
        result += "\n" + line.substr(0, range.end.Char);
        return result;
    }

    // Position
    public GetCurrentPosition(): IPosition {
        return this.Position;
    }
    public SetPosition(position: IPosition) {
        this.Position = position;
    }
    public GetLastPosition(): IPosition {
        let p = new Position();
        p.Line = this.GetLastLineNum();
        p.Char = this.contents[this.GetLastLineNum()].length;
        return p;
    }

    // Document Info
    public GetLastLineNum(): number {
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
    public ShowVisualMode(range: IRange, focusPosition?: IPosition) {
        this.Position = focusPosition;
        this.currentVisualModeSelection = range;
    }

    public GetCurrentVisualModeSelection(): IRange {
        return this.currentVisualModeSelection;
    }

    public ShowVisualLineMode(startLine: number, endLine: number, focusPosition?: IPosition) {
        this.currentVisualLineModeInfo = {
            startLine,
            endLine,
            focusPosition,
        };
    }

    public GetCurrentVisualLineModeSelection(): IVisualLineModeSelectionInfo {
        return this.currentVisualLineModeInfo;
    }
    // check invalid position
    public UpdateValidPosition(p: IPosition, isBlock?: boolean): IPosition {
        if (p.Line > this.GetLastLineNum()) {
            return this.GetLastPosition();
        }
        if (isBlock) {
            if (p.Char > this.contents[p.Line].length - 1) {
                let np = new Position();
                np.Line = p.Line;
                np.Char = this.contents[p.Line].length - 1;
                return np;
            }
        } else {
            if (p.Char > this.contents[p.Line].length) {
                let np = new Position();
                np.Line = p.Line;
                np.Char = this.contents[p.Line].length;
                return np;
            }
        }

        return p;
    }

    public Type(keystroke: string) {
        let len = keystroke.length;
        for (let i = 0; i < len; i++) {
            let k = keystroke.charAt(i);
            if (k === "_") {
                this.VimStyle.PushEscKey();
            } else {
                this.VimStyle.PushKey(k);
            }
        }
    }

    public GetTabSize() {
        return 4;
    }

    public dispose() {
        return;
    }

    // tslint:disable-next-line:no-empty
    public CallEditorCommand(argument: string) {
    }
}
