import { GoAction } from "../action/GoAction";
import { Position } from "../VimStyle";
import { AbstractMotion } from "./AbstractMotion";

/**
 * fx Fx tx Tx ; ,
 * cfx cFx ctx cTx c; c,
 */
export class FindCharacterMotion extends AbstractMotion implements IRequireCharacterMotion {

    public CharacterCode: number;
    public Direction: Direction;
    public OppositeDirection: boolean;
    public IsTill: boolean;
    public IsContainTargetChar: boolean;

    constructor(direction: Direction) {
        super();
        this.Direction = direction;
        this.OppositeDirection = false;
        this.IsTill = false;
        this.IsContainTargetChar = false;
        this.CharacterCode = null;
    }

    public SetChar(c: string) {
        this.CharacterCode = c.charCodeAt(0);
    }

    public CalculateEnd(editor: IEditor, vim: IVimStyle, start: IPosition): IPosition {
        let line = editor.ReadLineAtCurrentPosition();
        let end = new Position();
        end.Line = start.Line;
        let i;
        let count = this.Count;
        if (this.CharacterCode === null) {

            if (vim.LastFindCharacterMotion === null) {
                return null;
            }

            let last: any;
            last = vim.LastFindCharacterMotion;

            if (this.OppositeDirection) {
                if (last.Direction === Direction.Left) {
                    this.Direction = Direction.Right;
                } else {
                    this.Direction = Direction.Left;
                }
            } else {
                this.Direction = last.Direction;
            }
            this.IsTill = last.IsTill;
            this.CharacterCode = last.CharacterCode;

        } else {

            // save direction for ; ,
            vim.LastFindCharacterMotion = this;

        }
        if (this.CharacterCode === null) {
            return null;
        }

        if (this.Direction === Direction.Right) {
            for (i = start.Char + 1; i < line.length; i++) {
                if (this.IsTill && i === start.Char + 1) {
                    continue;
                }
                if (this.CharacterCode === line.charCodeAt(i)) {
                    count--;
                    if (count === 0) {
                        end.Char = i;
                        break;
                    }
                }
            }
        } else {
            for (i = start.Char - 1; i >= 0; i--) {
                if (this.IsTill && i === start.Char - 1) {
                    continue;
                }
                if (this.CharacterCode === line.charCodeAt(i)) {
                    count--;
                    if (count === 0) {
                        end.Char = i;
                        break;
                    }
                }
            }
        }
        if (count > 0) {
            return null;
        }
        if (this.IsTill) {
            if (this.Direction === Direction.Right) {
                end.Char -= 1;
            } else {
                end.Char += 1;
            }
        }
        if (this.IsContainTargetChar) {
            // use dfx dtx
            end.Char += 1;
        }
        return end;
    }
}

/**
 * fx
 */
export function GotoCharacterToRight(num: number): IAction {
    let a = new GoAction();
    let m: FindCharacterMotion;
    m = new FindCharacterMotion(Direction.Right);
    m.Count = num > 0 ? num : 1;
    a.Motion = m;
    return a;
}

/**
 * Fx
 */
export function GotoCharacterToLeft(num: number): IAction {
    let a = new GoAction();
    let m: FindCharacterMotion;
    m = new FindCharacterMotion(Direction.Left);
    m.Count = num > 0 ? num : 1;
    a.Motion = m;
    return a;
}

/**
 * tx
 */
export function GoTillBeforeCharacterToRight(num: number): IAction {
    let a = new GoAction();
    let m: FindCharacterMotion;
    m = new FindCharacterMotion(Direction.Right);
    m.Count = num > 0 ? num : 1;
    m.IsTill = true;
    a.Motion = m;
    return a;
}

/**
 * Tx
 */
export function GoTillBeforeCharacterToLeft(num: number): IAction {
    let a = new GoAction();
    let m: FindCharacterMotion;
    m = new FindCharacterMotion(Direction.Left);
    m.Count = num > 0 ? num : 1;
    m.IsTill = true;
    a.Motion = m;
    return a;
}

/**
 * cfx
 */
export function AddCharacterToRightMotion(num: number, action: IAction): void {
    let m: FindCharacterMotion;
    m = new FindCharacterMotion(Direction.Right);
    m.IsContainTargetChar = true;
    m.Count = num > 0 ? num : 1;
    let a = <IRequireMotionAction>action;
    a.Motion = m;
}

/**
 * cFx
 */
export function AddCharacterToLeftMotion(num: number, action: IAction): void {
    let m: FindCharacterMotion;
    m = new FindCharacterMotion(Direction.Left);
    m.Count = num > 0 ? num : 1;
    let a = <IRequireMotionAction>action;
    a.Motion = m;
}

/**
 * ctx
 */
export function AddTillCharacterToRightMotion(num: number, action: IAction): void {
    let m: FindCharacterMotion;
    m = new FindCharacterMotion(Direction.Right);
    m.IsContainTargetChar = true;
    m.Count = num > 0 ? num : 1;
    m.IsTill = true;
    let a = <IRequireMotionAction>action;
    a.Motion = m;
}

/**
 * cTx
 */
export function AddTillCharacterToLeftMotion(num: number, action: IAction): void {
    let m: FindCharacterMotion;
    m = new FindCharacterMotion(Direction.Left);
    m.Count = num > 0 ? num : 1;
    m.IsTill = true;
    let a = <IRequireMotionAction>action;
    a.Motion = m;
}

/**
 * vfx
 */
export function AddVisualGotoCharacterToRightMotion(num: number, action: IAction): IAction {
    let a = <IRequireMotionAction>action;
    let m: FindCharacterMotion;
    m = new FindCharacterMotion(Direction.Right);
    m.IsContainTargetChar = false;
    m.Count = num > 0 ? num : 1;
    a.Motion = m;
    return a;
}

/**
 * vFx
 */
export let AddVisualGotoCharacterToLeftMotion: (num: number, action: IAction) => void = AddCharacterToLeftMotion;

/**
 * vtx
 */
export function AddVisualGoTillCharacterToRightMotion(num: number, action: IAction): IAction {
    let a = <IRequireMotionAction>action;
    let m: FindCharacterMotion;
    m = new FindCharacterMotion(Direction.Right);
    m.Count = num > 0 ? num : 1;
    m.IsContainTargetChar = false;
    m.IsTill = true;
    a.Motion = m;
    return a;
}

/**
 * vTx
 */
export let AddVisualGoTillCharacterToLeftMotion: (num: number, action: IAction) => void = AddTillCharacterToLeftMotion;

/**
 * N;
 */
export function GotoRepeatCharacter(num: number): IAction {
    let a = new GoAction();
    let m: FindCharacterMotion;
    m = new FindCharacterMotion(Direction.Right);
    m.Count = num > 0 ? num : 1;
    a.Motion = m;
    return a;
}

/**
 * c;
 */
export function AddRepeartCharacterMotion(num: number, action: IAction) {
    let m: FindCharacterMotion;
    m = new FindCharacterMotion(null);
    m.IsContainTargetChar = true;
    m.Count = num > 0 ? num : 1;
    let a = <IRequireMotionAction>action;
    a.Motion = m;
}

/**
 * vc;
 */
export function AddVisualGotoRepeartCharacterMotion(num: number, action: IAction) {
    let m: FindCharacterMotion;
    m = new FindCharacterMotion(null);
    m.IsContainTargetChar = false;
    m.Count = num > 0 ? num : 1;
    let a = <IRequireMotionAction>action;
    a.Motion = m;
}

/**
 * N,
 */
export function GotoRepeatCharacterOppositeDirection(num: number): IAction {
    let a = new GoAction();
    let m: FindCharacterMotion;
    m = new FindCharacterMotion(null);
    m.OppositeDirection = true;
    m.Count = num > 0 ? num : 1;
    a.Motion = m;
    return a;
}

/**
 * c,
 */
export function AddRepeartCharacterMotionOppositeDirection(num: number, action: IAction) {
    let m: FindCharacterMotion;
    m = new FindCharacterMotion(null);
    m.OppositeDirection = true;
    m.Count = num > 0 ? num : 1;
    let a = <IRequireMotionAction>action;
    a.Motion = m;
}

/**
 * vcN,
 */
export let AddVisualGotoRepeartCharacterMotionOppositeDirection = AddRepeartCharacterMotionOppositeDirection;
