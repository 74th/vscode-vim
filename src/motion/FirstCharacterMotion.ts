import { GoAction } from "../action/GoAction";
import * as Utils from "../Utils";
import { Position } from "../VimStyle";
import { AbstractMotion } from "./AbstractMotion";

/**
 * ^ G gg
 * c^ cG cgg
 */
export class FirstCharacterMotion extends AbstractMotion {

    public Target: Target;
    public IsSkipSpaces: boolean;

    constructor() {
        super();
        this.Target = Target.Number;
        this.IsSkipSpaces = false;
    }

    public CalculateEnd(editor: IEditor, vim: IVimStyle, start: IPosition): IPosition {

        let lineDocument: string;
        let lineNumber: number;
        switch (this.Target) {
            case Target.Current:
                lineDocument = editor.ReadLineAtCurrentPosition();
                lineNumber = start.Line;
                break;
            case Target.First:
                lineNumber = 0;
                lineDocument = editor.ReadLine(lineNumber);
                break;
            case Target.Last:
                lineNumber = editor.GetLastLineNum();
                lineDocument = editor.ReadLine(lineNumber);
                break;
            case Target.Number:
                lineNumber = this.Count - 1;
                let lastLineNum = editor.GetLastLineNum();
                if (lineNumber > lastLineNum) {
                    lineNumber = lastLineNum;
                }
                lineDocument = editor.ReadLine(lineNumber);
                break;
        }

        let l = lineDocument.length;
        let charNumber: number;
        for (charNumber = 0; charNumber < l; charNumber++) {
            let c = Utils.GetCharClass(lineDocument.charCodeAt(charNumber));
            if (c !== CharGroup.Spaces) {
                break;
            }
        }
        let p = new Position();
        p.Line = lineNumber;
        p.Char = charNumber;
        return p;
    }
}

export enum Target {
    Current,
    First,
    Last,
    Number,
}

/**
 * ^
 */
export function GotoFirstNonBlankCharacterInLine(num: number): IAction {
    let a = new GoAction();
    let m = new FirstCharacterMotion();
    a.Motion = m;
    m.Target = Target.Current;
    return a;
}

/**
 * c^
 */
export function AddFirstNonBlankCharacterInLineMotion(num: number, action: IAction): void {
    let a = <IRequireMotionAction>action;
    let m = new FirstCharacterMotion();
    m.Target = Target.Current;
    a.Motion = m;
}

/**
 * G
 */
export function GotoLastLine(num: number): IAction {
    let a = new GoAction();
    let m = new FirstCharacterMotion();
    if (num === 0) {
        m.Target = Target.Last;
    } else {
        m.Target = Target.Number;
        m.Count = num;
    }
    a.Motion = m;
    return a;
}

/**
 * cG
 */
export function AddLastLineMotion(num: number, action: IAction): void {
    let m = new FirstCharacterMotion();
    if (num === 0) {
        m.Target = Target.Last;
    } else {
        m.Target = Target.Number;
        m.Count = num;
    }
    let a = <IRequireMotionAction>action;
    a.Motion = m;
    a.IsLine = true;
}

/**
 * gg
 */
export function GotoFirstLineOnFirstNonBlankCharacter(num: number): IAction {
    let a = new GoAction();
    let m = new FirstCharacterMotion();
    if (num === 0) {
        m.Target = Target.First;
    } else {
        m.Target = Target.Number;
        m.Count = num;
    }
    a.Motion = m;
    this.action = a;
    return a;
}

/**
 * cgg
 */
export function AddFirstLineMotion(num: number, action: IAction) {
    let m = new FirstCharacterMotion();
    if (num === 0) {
        m.Target = Target.First;
    } else {
        m.Target = Target.Number;
        m.Count = num;
    }
    let a = <IRequireMotionAction>action;
    a.Motion = m;
    a.IsLine = true;
}
