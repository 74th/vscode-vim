import {CommandFactory} from "./core/CommandFactory";
import {InsertModeExecute} from "./mode/InsertMode";
import * as Utils from "./Utils"
import {Register} from "./core/Register"

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
                InsertModeExecute(key, this.editor)
        }
    }

    public PushEscKey() {
        this.setMode(VimMode.Normal);
        this.commandFactory.Clear()
        this.editor.CloseCommandStatus();
    }

    public ApplyInsertMode() {
        this.setMode(Mode.Insert);
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
    public line: number;
    public char: number;
}

export class Range implements IRange {
    public start: IPosition;
    public end: IPosition;

    public Sort() {
        var isReverse = false;
        if (this.end.line < this.start.line) {
            isReverse = true;
        } else if (this.end.line == this.start.line) {
            if (this.end.char < this.start.char) {
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