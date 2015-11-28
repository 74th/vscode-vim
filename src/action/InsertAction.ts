export class InsertCurrentPositionAction implements IAction {
    public Execute(editor: IEditor, vim: IVimStyle) {
        vim.ApplyInsertMode();
    }
}