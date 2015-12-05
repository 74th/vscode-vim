export class InsertCurrentPositionAction implements IAction {
    public Execute(editor: IEditor, vim: IVimStyle) {
        var p = editor.GetCurrentPosition();
        vim.ApplyInsertMode(p);
    }
}