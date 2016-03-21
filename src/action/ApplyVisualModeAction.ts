export class ApplyVisualModeAction implements IAction {

    public IsEdit(): boolean {
        return false;
    }

    public GetActionName(): string {
        return "ApplyVisualModeAction";
    }

    public Execute(editor: IEditor, vim: IVimStyle) {
        vim.ApplyVisualMode();
    }
}