import * as Enums from "./VimStyleEnums";
import {CommandFactory} from "./CommandFactory";
import {InsertModeExecute} from "./mode/InsertMode";
import {IEditor} from "./IEditor"
import * as Utils from "./Utils"
import {Register} from "./Register"

enum Mode {
    Normal,
    Insert
}

export class VimStyle {

    private mode: Mode;
    private editor: IEditor;
    private commandFactory: CommandFactory;
    public Register: Register;

    constructor(editor: IEditor) {
        this.editor = editor;
        this.mode = Mode.Normal;
        this.commandFactory = new CommandFactory();
        this.Register = new Register();
    }

    public PushKey(key: Enums.Key) {
        switch (this.mode) {
            case Mode.Normal:
                this.readCommand(key);
                return;
            case Mode.Insert:
                InsertModeExecute(key, this.editor)
        }
    }

    public PushEscKey() {
        this.mode = Mode.Normal;
        this.commandFactory.Clear()
        this.editor.CloseStatus();
    }

    public ApplyInsertMode() {
        this.mode = Mode.Insert;
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
}

export class Position {
    public line: number;
    public char: number;
}

export class Range {
    public start: Position;
    public end: Position;
    
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
        var b: Position;
            b = this.start;
            this.start = this.end;
            this.end = b;
        }
    }
}