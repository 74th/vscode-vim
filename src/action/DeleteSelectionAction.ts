import {Range, Position} from "../VimStyle";
import {RegisterItem} from "../core/Register";

export class DeleteSelectionAction {

    public isInsert: boolean;
    public isOnlyYanc: boolean;
    
    public SetChangeOption() {
        this.isInsert = true;
    }

    public SetOnlyYancOption() {
        this.isOnlyYanc = true;
    }
    
    public Execute(editor: IEditor, vim: IVimStyle) {
    
        var s = editor.GetCurrentSelection();
        s.Sort();
        
        var item = new RegisterItem();
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