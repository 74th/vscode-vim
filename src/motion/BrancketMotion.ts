import { GoAction } from "../action/GoAction";
import * as Utils from "../Utils";
import { Position } from "../VimStyle";
import { AbstractMotion } from "./AbstractMotion";

/**
 * [{ [( ]} ])
 */
export class BackToBrancketMotion extends AbstractMotion {

    public LeftBrancket: string;
    public RightBrancket: string;
    public TargetBrancket: string;

    constructor() {
        super();
    }

    public CalculateEnd(editor: IEditor, vim: IVimStyle, start: IPosition): IPosition {

        let p: IPosition = start.Copy();
        let line: string = editor.ReadLineAtCurrentPosition();
        let lastLine: number = editor.GetLastLineNum();
        let lastBrancket: IPosition = null;
        while (this.Count > 0) {

            // read 1 char
            p.Char--;
            if (p.Char < 0) {
                p.Line--;
                if (p.Line < 0) {
                    p = new Position(0, 0);
                    break;
                }
                line = editor.ReadLine(p.Line);
                if (line.length === 0) {
                    // skip blank line
                    continue;
                }
                p.Char = line.length - 1;
            }

            let c: string = line[p.Char];

            if (c === this.LeftBrancket) {
                lastBrancket = p.Copy();
                this.Count--;
            }
            if (c === this.RightBrancket) {
                this.Count++;
            }

            if (this.Count === 0 && c === this.TargetBrancket) {
                break;
            }
        }

        if (lastBrancket == null) {
            return start.Copy();
        }
        return lastBrancket;
    }
}

export class ToBrancketMotion extends AbstractMotion {

    public LeftBrancket: string;
    public RightBrancket: string;
    public TargetBrancket: string;

    constructor() {
        super();
    }

    public CalculateEnd(editor: IEditor, vim: IVimStyle, start: IPosition): IPosition {

        let p: IPosition = start.Copy();
        let line: string = editor.ReadLineAtCurrentPosition();
        let lastLine: number = editor.GetLastLineNum();
        let lastBrancket: IPosition = null;
        while (this.Count > 0) {

            // read 1 char
            p.Char++;
            if (p.Char >= line.length) {
                p.Line++;
                if (p.Line > lastLine) {
                    break;
                }
                line = editor.ReadLine(p.Line);
                if (line.length === 0) {
                    // skip blank line
                    continue;
                }
                p.Char = 0;
            }

            let c: string = line[p.Char];

            if (c === this.LeftBrancket) {
                this.Count++;
            }
            if (c === this.RightBrancket) {
                lastBrancket = p.Copy();
                this.Count--;
            }

            if (this.Count === 0 && c === this.TargetBrancket) {
                break;
            }

        }
        if (lastBrancket == null) {
            return start.Copy();
        }
        return lastBrancket;
    }
}

// N[(
export function GoBackToUnclosedLeftParenthesis(num: number): IAction {
    let a = new GoAction();
    let m = new BackToBrancketMotion();
    m.LeftBrancket = "(";
    m.RightBrancket = ")";
    m.TargetBrancket = "(";
    m.Count = num > 0 ? num : 1;
    a.Motion = m;
    return a;
}

// cN[(
export function AddBackToUnclosedLeftParenthesisMotion(num: number, action: IAction) {
    let m = new BackToBrancketMotion();
    m.LeftBrancket = "(";
    m.RightBrancket = ")";
    m.TargetBrancket = "(";
    m.Count = num > 0 ? num : 1;
    let a = <IRequireMotionAction>action;
    a.Motion = m;
}

// N[{
export function GoBackToUnclosedLeftCurlyBracket(num: number): IAction {
    let a = new GoAction();
    let m = new BackToBrancketMotion();
    m.LeftBrancket = "{";
    m.RightBrancket = "}";
    m.TargetBrancket = "{";
    m.Count = num > 0 ? num : 1;
    a.Motion = m;
    return a;
}

// cN[{
export function AddBackToUnclosedLeftCurlyBracketMotion(num: number, action: IAction) {
    let m = new BackToBrancketMotion();
    m.LeftBrancket = "{";
    m.RightBrancket = "}";
    m.TargetBrancket = "{";
    m.Count = num > 0 ? num : 1;
    let a = <IRequireMotionAction>this.action;
    a.Motion = m;
}

// N])
export function GoToUnclosedRightParenthesis(num: number): IAction {
    let a = new GoAction();
    let m = new ToBrancketMotion();
    m.LeftBrancket = "(";
    m.RightBrancket = ")";
    m.TargetBrancket = ")";
    m.Count = num > 0 ? num : 1;
    a.Motion = m;
    return a;
}

// cN])
export function AddToUnclosedRightParenthesisMotion(num: number, action: IAction) {
    let m = new ToBrancketMotion();
    m.LeftBrancket = "(";
    m.RightBrancket = ")";
    m.TargetBrancket = ")";
    m.Count = num > 0 ? num : 1;
    let a = <IRequireMotionAction>action;
    a.Motion = m;
}

// N]}
export function GoToUnclosedRightCurlyBracket(num: number): IAction {
    let a = new GoAction();
    let m = new ToBrancketMotion();
    m.LeftBrancket = "{";
    m.RightBrancket = "}";
    m.TargetBrancket = "}";
    m.Count = num > 0 ? num : 1;
    a.Motion = m;
    return a;
}

// cN]}
export function AddToUnclosedRightCurlyBracketMotion(num: number, action: IAction) {
    let m = new ToBrancketMotion();
    m.LeftBrancket = "{";
    m.RightBrancket = "}";
    m.TargetBrancket = "}";
    m.Count = num > 0 ? num : 1;
    let a = <IRequireMotionAction>action;
    a.Motion = m;
}
