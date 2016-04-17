import {Range, Position} from "../VimStyle";
import {RegisterItem} from "../core/Register";

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