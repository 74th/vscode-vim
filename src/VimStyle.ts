import {CommandFactory} from "./core/CommandFactory";
import {InsertModeExecute} from "./mode/InsertMode";
import * as Utils from "./Utils";
import {Register} from "./core/Register";

export class VimStyle implements IVimStyle {

    private mode: VimMode;
    private editor: IEditor;
    private commandFactory: ICommandFactory;
    public Register: IRegister;

    constructor(editor: IEditor) {
        this.editor = editor;
        editor.SetVimStyle(this);
        this.setMode(VimMode.Normal);
        this.commandFactory = new CommandFactory();
        this.Register = new Register();
    }

    public PushKey(key: Key) {
        switch (this.mode) {
            case VimMode.Normal:
                this.readCommand(key);
                return;
            case VimMode.Insert:
                InsertModeExecute(key, this.editor);
        }
    }

    public PushEscKey() {
        var p = this.editor.GetCurrentPosition();
        if (this.mode == VimMode.Insert && p.Char > 0) {
            p.Char -= 1;
        }
        this.setMode(VimMode.Normal);
        this.commandFactory.Clear();
        this.editor.CloseCommandStatus();
        this.editor.ApplyNormalMode(p);
    }

    public ApplyInsertMode(p?: Position) {
        this.setMode(VimMode.Insert);
        this.editor.ApplyInsertMode(p);
    }
    
    public ApplyVisualMode() {
        this.setMode(VimMode.Visual);
        this.editor.ApplyVisualMode();
    }

    private readCommand(key: Key) {
        var action = this.commandFactory.PushKey(key);
        if (action == null) {
            this.showCommand();
            return;
        }
        this.editor.CloseCommandStatus();
        action.Execute(this.editor, this);
        this.commandFactory.Clear();
    }

    private showCommand() {
        this.editor.ShowCommandStatus(this.commandFactory.GetCommandString());
    }

    private setMode(mode: VimMode) {
        this.mode = mode;
        this.editor.ShowModeStatus(this.mode);
    }

    public GetMode(): VimMode {
        return this.mode;
    }
}

export class Position implements IPosition {
    public Line: number;
    public Char: number;
    constructor(line?: number, char?: number) {
        this.Line = line == undefined ? 0 : line;
        this.Char = char == undefined ? 0 : char;
    }
}

export class Range implements IRange {
    public start: IPosition;
    public end: IPosition;

    constructor() {
        this.start = new Position();
        this.end = new Position();
    }

    public Sort() {
        var isReverse = false;
        if (this.end.Line < this.start.Line) {
            isReverse = true;
        } else if (this.end.Line == this.start.Line) {
            if (this.end.Char < this.start.Char) {
                isReverse = true;
            }
        }
        if (isReverse) {
            var b = this.start;
            this.start = this.end;
            this.end = b;
        }
    }
}