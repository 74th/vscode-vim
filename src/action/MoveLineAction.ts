
const commandLegex = /[0-9]*[jk]/;

export class MoveLineAction implements IAction {

    private motion: IMotion;

    constructor() {
        this.motion = null;
    }

    public IsEdit(): boolean {
        return false;
    }

    public GetActionName(): string {
        return "MoveLineAction";
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

        if (vim.LastAction &&
            this.GetActionName() === vim.LastAction.GetActionName()) {
            // use last move position
            to.Char = vim.LastMoveCharPosition;
        } else {
            vim.LastMoveCharPosition = from.Char;
        }

        if (from.Char === to.Char && from.Line === to.Line) {
            // not move
            return;
        }

        editor.SetPosition(editor.UpdateValidPosition(to, true));
    }
}