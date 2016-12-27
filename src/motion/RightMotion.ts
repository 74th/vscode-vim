import { AbstractMotion } from "./AbstractMotion";
import { GoAction } from "../action/GoAction";
import { Position } from "../VimStyle";

/**
 * h l
 * ch cl
 */
export class RightMotion extends AbstractMotion {

    public IsLeftDirection: boolean;

    constructor() {
        super();
        this.IsLeftDirection = false;
    }

    public CalculateEnd(editor: IEditor, vim: IVimStyle, start: IPosition): IPosition {
        let line = editor.ReadLineAtCurrentPosition();
        let end = new Position();
        end.Line = start.Line;
        if (this.IsLeftDirection) {
            end.Char = start.Char - this.Count;
        } else {
            end.Char = start.Char + this.Count;
        }
        return editor.UpdateValidPosition(end);
    }
}

// Nh
export function GotoRight(num: number): IAction {
    let m = new RightMotion();
    if (num === 0) {
        m.Count = 1;
    } else {
        m.Count = num;
    }
    let a = new GoAction();
    a.Motion = new RightMotion();
    a.Motion = m;
    return a;
}

// Nl
export function GotoLeft(num: number): IAction {
    let m = new RightMotion();
    if (num === 0) {
        m.Count = 1;
    } else {
        m.Count = num;
    }
    m.IsLeftDirection = true;
    let a = new GoAction();
    a.Motion = new RightMotion();
    a.Motion = m;
    return a;
}

// ch
export function AddRightMotion(num: number, action: IAction): void {
    let m = new RightMotion();
    m.Count = num;
    let a = <IRequireMotionAction>action;
    a.Motion = m;
}

// cl
export function AddLeftMotion(num: number, action: IAction): void {
    let m = new RightMotion();
    m.IsLeftDirection = true;
    m.Count = num;
    let a = <IRequireMotionAction>action;
    a.Motion = m;
}