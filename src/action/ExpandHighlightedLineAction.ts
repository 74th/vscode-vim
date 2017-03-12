import { Range } from "../VimStyle";
export class ExpandHighlightedLineAction implements IAction {

    public Motion: IMotion;

    constructor() {
        this.Motion = null;
    }

    public GetActionType(): ActionType {
        return ActionType.Other;
    }

    public Execute(editor: IEditor, vim: IVimStyle) {
        let before = editor.GetCurrentVisualLineModeSelection();
        let cp = before.focusPosition;
        let np = this.Motion.CalculateEnd(editor, vim, cp);
        editor.ShowVisualLineMode(before.startLine, np.Line, np);
    }
}
