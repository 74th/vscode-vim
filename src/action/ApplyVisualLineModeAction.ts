import {Range} from "../VimStyle";
export class ApplyVisualLineModeAction implements IAction {

    public GetActionType(): ActionType {
        return ActionType.Other;
    }

    public Execute(editor: IEditor, vim: IVimStyle) {
        let cp = editor.GetCurrentPosition();
        editor.ShowVisualLineMode(cp.Line, cp.Line, cp);
        vim.ApplyVisualLineMode();
    }
}