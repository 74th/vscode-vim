import { Position } from "../VimStyle";

/**
 * .
 */
export class RepeatLastChangeAction implements IAction {

    public GetActionType(): ActionType {
        return ActionType.Repeat;
    }

    public Execute(editor: IEditor, vim: IVimStyle) {
        if (vim.LastEditAction) {
            switch (vim.LastEditAction.GetActionType()) {
                case ActionType.Insert:
                case ActionType.Edit:
                    let action = vim.LastEditAction;
                    vim.LastEditAction.Execute(editor, vim);
            }
        }
    }

}

/**
 * .
 */
export function RepeatLastChange() {
    return new RepeatLastChangeAction();
}
