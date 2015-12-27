export class ApplyVisualModeAction implements IAction {
    public Execute(editor: IEditor, vim: IVimStyle) {
        vim.ApplyVisualMode();
    }
}