import { GoAction } from "../action/GoAction";
import { Position } from "../VimStyle";
import { AbstractMotion } from "./AbstractMotion";

/**
 * 0 c0
 */
class FirstCharacterInLineMotion extends AbstractMotion {

    public CalculateEnd(editor: IEditor, vim: IVimStyle, start: IPosition): IPosition {
        let end = new Position();
        end.Line = start.Line;
        end.Char = 0;
        return editor.UpdateValidPosition(end);
    }
}

/**
 * 0
 */
export function GotoFirstCharacterInLine(num: number): IAction {

    let a = new GoAction();
    a.Motion = new FirstCharacterInLineMotion();
    return a;
}

/**
 * c0
 */
export function AddFirstCharacterInLineMotion(num: number, action: IAction): void {
    let a = <IRequireMotionAction>action;
    a.Motion = new FirstCharacterInLineMotion();
}
