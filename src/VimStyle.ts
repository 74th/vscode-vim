import * as Enums from "./VimStyleEnums";
import {CommandFactory} from "./CommandFactory";
import {InsertModeExecute} from "./mode/InsertMode";
import * as Utils from "./Utils"
import {Register} from "./Register"

export class VimStyle implements IVimStyle {

    private mode: Enums.Mode;
    private editor: IEditor;
    private commandFactory: ICommandFactory;
    public Register: IRegister;

    constructor(editor: IEditor) {
        this.editor = editor;
        this.setMode(Enums.Mode.Normal);
        this.commandFactory = new CommandFactory();
        this.Register = new Register();
    }

    public PushKey(key: Enums.Key) {
        switch (this.mode) {
            case Enums.Mode.Normal:
                this.readCommand(key);
                return;
            case Enums.Mode.Insert:
                InsertModeExecute(key, this.editor)
        }
    }

    public PushEscKey() {
        this.setMode(Enums.Mode.Normal);
        this.commandFactory.Clear()
        this.editor.CloseStatus();
    }

    public ApplyInsertMode() {
        this.setMode(Enums.Mode.Insert);
    }

    private readCommand(key: Enums.Key) {
        var action = this.commandFactory.PushKey(key);
        if (action == null) {
            this.showCommand();
            return;
        }
        this.editor.CloseStatus();
        action.Execute(this.editor, this);
        this.commandFactory.Clear();
    }

    private showCommand() {
        this.editor.ShowStatus(this.commandFactory.GetCommandString());
    }
    
    private setMode(mode : Enums.Mode) {
        this.mode = mode;
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