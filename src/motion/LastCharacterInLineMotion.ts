import { GoAction } from "../action/GoAction";
import { Position } from "../VimStyle";
import { AbstractMotion } from "./AbstractMotion";

/**
 * $ c$
 */
export class LastCharacterInLineMotion extends AbstractMotion {

    public CalculateEnd(editor: IEditor, vim: IVimStyle, start: IPosition): IPosition {
        let end = new Position();
        end.Line = start.Line;
        end.Char = Number.MAX_VALUE;
        return editor.UpdateValidPosition(end);
    }
}

/**
 * $
 */
export function GotoLastCharacterInLine(num: number): IAction {
    let a = new GoAction();
    a.Motion = new LastCharacterInLineMotion();
    return a;
}

/**
 * c$
 */
export function AddLastCharacterInLineMotion(num: number, action: IAction): void {
    let a = <IRequireMotionAction>action;
    a.Motion = new LastCharacterInLineMotion();
}
