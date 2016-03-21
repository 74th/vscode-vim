import {Range, Position} from "../VimStyle";
import {RegisterItem} from "../core/Register";

export class DeleteSelectionAction {

    public isInsert: boolean;
    public isOnlyYanc: boolean;

    constructor() {
        this.isInsert = false;
        this.isOnlyYanc = false;
    }

    public IsEdit(): boolean {
        return !this.isOnlyYanc;
    }

    public GetActionName(): string {
        return "DeleteSelectionAction";
    }

    public SetChangeOption() {
        this.isInsert = true;
    }

    public SetOnlyYancOption() {
        this.isOnlyYanc = true;
    }

    public Execute(editor: IEditor, vim: IVimStyle) {

        let s = editor.GetCurrentSelection();
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