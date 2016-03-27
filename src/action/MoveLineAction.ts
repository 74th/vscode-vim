import * as Utils from "../Utils";

export class MoveLineAction implements IAction {

    private motion: IMotion;

    constructor() {
        this.motion = null;
    }

    public GetActionType(): ActionType {
        return ActionType.LineMove;
    }

    public SetMotion(motion: IMotion) {
        this.motion = motion;
    }

    public Execute(editor: IEditor, vim: IVimStyle) {

        let tabSize = editor.GetTabSize();

        let from = editor.GetCurrentPosition();
        let to = this.motion.CalculateEnd(editor, from);
        if (to == null) {
            // cancel
            return;
        }

        if (vim.LastAction &&
            ActionType.LineMove === vim.LastAction.GetActionType()) {
            // use last move position
            let toText = editor.ReadLine(to.Line);
            to.Char = Utils.CalcSystemPosition(vim.LastMoveCharPosition, toText, tabSize);
        } else {
            let fromText = editor.ReadLine(from.Line);
            vim.LastMoveCharPosition = Utils.CalcVisialPosition(from.Char, fromText, tabSize);
        }

        if (from.Char === to.Char && from.Line === to.Line) {
            // not move
            return;
        }

        editor.SetPosition(editor.UpdateValidPosition(to, true));
    }
}