export class GoAction implements IAction {

    public Motion: IMotion;

    constructor() {
        this.Motion = null;
    }

    public GetActionType(): ActionType {
        return ActionType.Move;
    }

    public Execute(editor: IEditor, vim: IVimStyle) {
        let from = editor.GetCurrentPosition();
        let to = this.Motion.CalculateEnd(editor, vim, from);
        if (to == null) {
            // cancel
            return;
        }
        if (from.Char === to.Char && from.Line === to.Line) {
            // not move
            return;
        }
        editor.SetPosition(editor.UpdateValidPosition(to, true));
    }
}
