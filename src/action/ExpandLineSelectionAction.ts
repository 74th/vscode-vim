import {Range} from "../VimStyle";
export class ExpandLineSelectionAction implements IAction {

    private motion: IMotion;

    constructor() {
        this.motion = null;
    }

    public GetActionType(): ActionType {
        return ActionType.Other;
    }

    public SetMotion(motion: IMotion) {
        this.motion = motion;
    }

    public SetLineOption() {
    }

    public Execute(editor: IEditor, vim: IVimStyle) {
        let before = editor.GetCurrentVisualLineModeSelection();
        let cp = before.focusPosition;
        let np = this.motion.CalculateEnd(editor, cp);
        editor.ShowVisualLineMode(before.startLine, np.Line, np);
    }
}