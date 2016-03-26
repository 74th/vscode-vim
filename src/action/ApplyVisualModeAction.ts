export class ApplyVisualModeAction implements IAction {

    public GetActionType(): ActionType {
        return ActionType.Other;
    }

    public Execute(editor: IEditor, vim: IVimStyle) {
        vim.ApplyVisualMode();
    }
}