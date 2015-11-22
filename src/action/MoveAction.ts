import {IEditor} from "../IEditor";
import {VimStyle} from "../VimStyle";
import {IAction} from "./IAction";
import {IMotion} from "../motion/IMotion"

export class MoveAction implements IAction {

    private motion: IMotion;

    constructor() {
    }

    public SetMotion(motion: IMotion) {
        this.motion = motion;
    }

    public Execute(editor: IEditor, vim: VimStyle) {
        var from = editor.GetCurrentPosition();
        var to = this.motion.CalculateEnd(editor, from);
        if (to == null) {
            // cancel
            return;
        }
        editor.SetPosition(to);
    }
}