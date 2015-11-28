export class InsertAction implements IAction {
    public Execute(editor: IEditor, vim: IVimStyle) {
        vim.ApplyInsertMode();
    }
}