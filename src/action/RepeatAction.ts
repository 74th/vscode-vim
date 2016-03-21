import {Position} from "../VimStyle";

export class RepeatAction implements IAction {

    constructor() {
    }

    public IsEdit(): boolean {
        return false;
    }

    public GetActionType(): ActionType {
        return ActionType.Repeat;
    }

    public Execute(editor: IEditor, vim: IVimStyle) {
        if (vim.LastEditAction) {
            switch (vim.LastEditAction.GetActionType()) {
                case ActionType.Insert:
                case ActionType.Edit:
                    (function() {
                        let action: any = vim.LastEditAction;
                        action.SetInsertText(vim.LastInsertText);
                        vim.LastEditAction.Execute(editor, vim);
                    })();
            }
        }
    }

}