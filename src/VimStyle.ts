import {CommandFactory} from "./core/CommandFactory";
import {LoadKeyBindings, ApplyKeyBindings} from "./core/KeyBindings";
import {InsertModeExecute} from "./mode/InsertMode";
import {InsertTextAction} from "./action/InsertTextAction";
import {FindCharacterMotion} from "./motion/FindCharacterMotion";
import * as Utils from "./Utils";
import {Register} from "./core/Register";

export class VimStyle implements IVimStyle {

    private mode: VimMode;
    private editor: IEditor;
    private commandFactory: ICommandFactory;
    public Options: IVimStyleOptions;
    public Register: IRegister;

    public LastAction: IAction;
    public LastEditAction: IAction;
    public LastMoveCharPosition: number;
    public LastFindCharacterMotion: FindCharacterMotion;

    constructor(editor: IEditor, conf: IVimStyleOptions) {
        this.editor = editor;
        editor.SetVimStyle(this);
        this.setMode(VimMode.Normal);
        this.commandFactory = new CommandFactory();
        this.Register = new Register();

        this.LastAction = null;
        this.LastEditAction = null;
        this.LastMoveCharPosition = null;

        this.ApplyOptions(conf);
    }

    public PushKey(key: string) {
        switch (this.mode) {
            case VimMode.Normal:
            case VimMode.Visual:
            case VimMode.VisualLine:
                this.readCommand(key);
                return;
            case VimMode.Insert:
                InsertModeExecute(key, this.editor);
        }
    }

    public PushEscKey() {

        // if this mode insert
        // save inserted text infomation
        if (this.mode === VimMode.Insert) {
            this.setInsertText();
        }

        let p = this.editor.GetCurrentPosition();
        if (this.mode === VimMode.Insert && p.Char > 0) {
            p.Char -= 1;
        }
        if (this.mode === VimMode.Visual && p.Char > 0) {
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

    }

    public ApplyVisualLineMode() {
        this.setMode(VimMode.VisualLine);
    }

    public GetMode(): VimMode {
        return this.mode;
    }
    public ApplyNormalMode() {
        this.setMode(VimMode.Normal);
    }

    public ApplyOptions(conf: IVimStyleOptions) {
        this.Options = conf;
        this.LoadKeyBinding();
    }

    private readCommand(key: string) {

        let actionList = this.commandFactory.PushKey(key, this.mode);

        if (actionList.length == 0) {
            this.showCommand();
            return;
        }

        this.editor.CloseCommandStatus();

        for (let i = 0; i < actionList.length; i++) {
            let action = actionList[i];
            action.Execute(this.editor, this);

            let type = action.GetActionType();
            switch (type) {
                case ActionType.Edit:
                case ActionType.Insert:
                    this.LastEditAction = action;
                    break;
            }
            this.LastAction = action;
        }

        this.commandFactory.Clear();
    }

    private showCommand() {
        this.editor.ShowCommandStatus(this.commandFactory.GetCommandString());
    }

    private setMode(mode: VimMode) {
        this.mode = mode;
        this.editor.ShowModeStatus(this.mode);
    }

    private LoadKeyBinding() {
        this.commandFactory.KeyBindings = LoadKeyBindings(this.Options);
    }

    private setInsertText() {

        if (this.LastAction.GetActionType() !== ActionType.Insert) {
            return;
        }
        let action = this.LastAction as IInsertTextAction;
        let info = action.GetInsertModeInfo();

        let lineCount = this.editor.GetLastLineNum() + 1;
        if (info.DocumentLineCount > lineCount) {
            // reduced document?
            return;
        }

        let cp = this.editor.GetCurrentPosition();
        if (cp.Line < info.Position.Line) {
            // move to back?
            return;
        }
        let startLine = this.editor.ReadLine(info.Position.Line);
        let endLine = this.editor.ReadLine(cp.Line);
        if (startLine.substring(0, info.Position.Char) !== info.BeforeText) {
            // use backspace?
            return;
        }
        if (endLine.substring(cp.Char) !== info.AfterText) {
            // use delete key?
            return;
        }
        let range = new Range();
        range.start = info.Position;
        range.end = cp;
        action.SetInsertText(this.editor.ReadRange(range));
    }

    public SetAdditionalKeyBinds(keyBindings: IKeyBindings) {
        ApplyKeyBindings(this.commandFactory.KeyBindings, keyBindings)
    }

}

export class Position implements IPosition {
    public Line: number;
    public Char: number;
    constructor(line?: number, char?: number) {
        this.Line = line === undefined ? 0 : line;
        this.Char = char === undefined ? 0 : char;
    }
    public Copy(): IPosition {
        return new Position(this.Line, this.Char);
    }

    public IsEqual(other: IPosition) {
        return other.Line === this.Line && other.Char === this.Char;
    }

    public IsBefore(other: IPosition) {
        if (this.Line === other.Line) {
            return this.Char < other.Char;
        }
        return this.Line < other.Line;
    }

    public IsBeforeOrEqual(other: IPosition) {
        if (this.Line === other.Line) {
            return this.Char <= other.Char;
        }
        return this.Line < other.Line;
    }

    public IsAfter(other: IPosition) {
        if (this.Line === other.Line) {
            return this.Char > other.Char;
        }
        return this.Line > other.Line;
    }

    public IsAfterOrEqual(other: IPosition) {
        if (this.Line === other.Line) {
            return this.Char >= other.Char;
        }
        return this.Line > other.Line;
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
        let isReverse = false;
        if (this.end.Line < this.start.Line) {
            isReverse = true;
        } else if (this.end.Line === this.start.Line) {
            if (this.end.Char < this.start.Char) {
                isReverse = true;
            }
        }
        if (isReverse) {
            let b = this.start;
            this.start = this.end;
            this.end = b;
        }
    }

    public IsContain(p: IPosition): boolean {
        let r = this.Copy();
        r.Sort();
        if (p.Line < r.start.Line) return false;
        if (r.end.Line < p.Line) return false;
        if (p.Line === r.start.Line && p.Char < r.start.Char) return false;
        if (p.Line === r.end.Line && r.end.Char < p.Char) return false;
        return true;
    }

    public Copy(): IRange {
        let r = new Range();
        r.start.Char = this.start.Char;
        r.start.Line = this.start.Line;
        r.end.Char = this.end.Char;
        r.end.Line = this.end.Line;
        return r;
    }
}