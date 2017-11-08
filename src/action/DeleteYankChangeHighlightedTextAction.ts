import { RegisterItem } from "../core/Register";
import { Position, Range } from "../VimStyle";

/**
 * {Visual}d {Visual}y {Visual}c
 */
export class DeleteYankChangeHighlightedTextAction implements IInsertTextAction {

    public isInsert: boolean;
    public isOnlyYanc: boolean;
    private insertText: string;
    private insertModeInfo: any;

    constructor() {
        this.isInsert = false;
        this.isOnlyYanc = false;
    }

    public GetActionType(): ActionType {
        if (this.isOnlyYanc) {
            return ActionType.Other;
        } else if (this.isInsert) {
            return ActionType.Insert;
        }
        return ActionType.Other;
    }

    public SetChangeOption() {
        this.isInsert = true;
    }

    public SetOnlyYancOption() {
        this.isOnlyYanc = true;
    }

    public GetInsertModeInfo(): any {
        return this.insertModeInfo;
    }

    public SetInsertText(text: string) {
        this.insertText = text;
    }

    public Execute(editor: IEditor, vim: IVimStyle) {

        let s = editor.GetCurrentVisualModeSelection();
        s.Sort();

        if (s.end.Char === 0 && editor.GetLastLineNum() !== s.end.Line) {
            let lastLine = editor.ReadLine(s.end.Line);
            if (lastLine.length === 0) {
                s = s.Copy();
                s.end.Line += 1;
            }
        }

        let item = new RegisterItem();
        item.Body = editor.ReadRange(s);
        item.Type = RegisterType.Text;
        vim.Register.SetRoll(item);

        if (this.isInsert) {
            vim.ApplyInsertMode();
        } else {
            vim.ApplyNormalMode();
        }

        if (!this.isOnlyYanc) {
            editor.DeleteRange(s, s.start);
        } else {
            editor.SetPosition(s.start);
        }

    }
}

/**
 * {visual}d
 */
export function DeleteHighlightedText(num: number): IAction {
    return new DeleteYankChangeHighlightedTextAction();
}
/**
 * {visual}y
 */
export function YankHighlightedText(num: number): IAction {
    let a = new DeleteYankChangeHighlightedTextAction();
    a.SetOnlyYancOption();
    return a;
}
/**
 * {visual}c
 */
export function ChangeHighlightedText(num: number): IAction {
    let a = new DeleteYankChangeHighlightedTextAction();
    a.SetChangeOption();
    return a;
}
