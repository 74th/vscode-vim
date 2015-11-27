export class MoveAction implements IAction {

    private motion: IMotion;

    constructor() {
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
        editor.SetPosition(to);
    }
}