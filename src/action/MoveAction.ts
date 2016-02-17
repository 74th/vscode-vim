export class MoveAction implements IAction {

    private motion: IMotion;

    constructor() {
        this.motion = null;
    }

    public SetMotion(motion: IMotion) {
        this.motion = motion;
    }

    public Execute(editor: IEditor, vim: IVimStyle) {
        let from = editor.GetCurrentPosition();
        let to = this.motion.CalculateEnd(editor, from);
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