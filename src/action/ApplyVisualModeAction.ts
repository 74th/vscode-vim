import {Range} from "../VimStyle";
export class StartVisualModeAction implements IAction {

    public GetActionType(): ActionType {
        return ActionType.Other;
    }

    public Execute(editor: IEditor, vim: IVimStyle) {
        let cp = editor.GetCurrentPosition();
        let s = new Range();
        s.start = cp;
        s.end = cp;
        editor.ShowVisualMode(s, cp);
        vim.ApplyVisualMode();
    }
}