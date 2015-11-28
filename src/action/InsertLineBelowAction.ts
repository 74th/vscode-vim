import {Position} from "../VimStyle";

export class InsertLineBelowAction implements IAction {
    
    private isAbove: boolean;
    
    constructor() {
        this.isAbove = false;
    }
    
    public SetAboveOption() {
        this.isAbove = true;
    }
    public Execute(editor: IEditor, vim: IVimStyle) {
        var cu = editor.GetCurrentPosition();
        var cp = new Position();
        cp.char = 0;
        var lnp = new Position();
        if (this.isAbove) {
            cp.line = cu.line;
            lnp.line = cu.line;
            lnp.char = 0;
        } else {
            cp.line = cu.line + 1;
            lnp.line = cu.line;
            var cline = editor.ReadLine(cu.line);
            lnp.char = cline.length;
        }
        
        editor.Insert(lnp, "\n");
        editor.SetPosition(cp);
        
        vim.ApplyInsertMode();
    }
}