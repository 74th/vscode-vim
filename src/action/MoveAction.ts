export class MoveAction implements IAction {

    private motion: IMotion;

    constructor() {
        this.motion = null;
    }

    public SetMotion(motion: IMotion) {
        this.motion = motion;
    }

    public Execute(editor: IEditor, vim: IVimStyle) {
        var from = editor.GetCurrentPosition();
        var to = this.motion.CalculateEnd(editor, from);
        if (to == null) {
            // cancel
            return;
        }
        if (from.char == to.char && from.line == to.line) {
            // not move
            return;
        }
        editor.SetPosition(editor.UpdateValidPosition(to, true));
    }
}