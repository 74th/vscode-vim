import { AbstractMotion } from "./AbstractMotion";
import { GoAction } from "../action/GoAction";
import * as Utils from "../Utils";
import { Position } from "../VimStyle";

export class FirstCharacterMotion extends AbstractMotion {

    public Target: FirstCharacterMotion.Target;
    public IsSkipSpaces: boolean;

    constructor() {
        super();
        this.Target = FirstCharacterMotion.Target.Number;
        this.IsSkipSpaces = false;
    }

    public CalculateEnd(editor: IEditor, vim: IVimStyle, start: IPosition): IPosition {

        let lineDocument: string;
        let lineNumber: number;
        switch (this.Target) {
            case FirstCharacterMotion.Target.Current:
                lineDocument = editor.ReadLineAtCurrentPosition();
                lineNumber = start.Line;
                break;
            case FirstCharacterMotion.Target.First:
                lineNumber = 0;
                lineDocument = editor.ReadLine(lineNumber);
                break;
            case FirstCharacterMotion.Target.Last:
                lineNumber = editor.GetLastLineNum();
                lineDocument = editor.ReadLine(lineNumber);
                break;
            case FirstCharacterMotion.Target.Number:
                lineNumber = this.Count;
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

export namespace FirstCharacterMotion {

    export enum Target {
        Current,
        First,
        Last,
        Number
    }
}

// ^
export function GotoFirstNonBlankCharacterInLine(num: number): IAction {
    let a = new GoAction();
    let m = new FirstCharacterMotion();
    a.Motion = m;
    m.Target = FirstCharacterMotion.Target.Current;
    return a;
}

// c^
export function AddFirstNonBlankCharacterInLineMotion(action: IAction, num: number): IAction {
    let a = <IRequireMotionAction>action;
    let m = new FirstCharacterMotion();
    m.Target = FirstCharacterMotion.Target.Current;
    a.Motion = m;
    return a;
}

// G
export function GotoLastLine(num: number): IAction {
    let a = new GoAction();
    let m = new FirstCharacterMotion();
    m.Target = FirstCharacterMotion.Target.Last;
    a.Motion = m;
    return a;
}

// cG
export function AddLastLineMotion(action: IAction, num: number): IAction {
    let m = new FirstCharacterMotion();
    m.Target = FirstCharacterMotion.Target.Last;
    let a = <IRequireMotionAction>action;
    a.Motion = m;
    a.IsLine = true;
    return a;
}

// NG
export function GotoLine(num: number): IAction {
    let a = new GoAction();
    let m = new FirstCharacterMotion();
    m.Count = this.getNumStack() - 1;
    a.Motion = m;
    return a;
}

// cNG
export function AddLineMotion(action: IAction, num: number): IAction {
    let m = new FirstCharacterMotion();
    m.Count = this.getNumStack() - 1;
    let a = <IRequireMotionAction>action;
    a.Motion = m;
    a.IsLine = true;
    return a;
}

// gg
export function GotoFirstLineOnFirstNonBlankCharacter(num: number): IAction {
    let a = new GoAction();
    let m = new FirstCharacterMotion();
    m.Target = FirstCharacterMotion.Target.First;
    a.Motion = m;
    this.action = a;
    return a;
}

// cgg
export function AddFirstLineMotion(action: IAction, num: number): IAction {
    let m = new FirstCharacterMotion();
    m.Target = FirstCharacterMotion.Target.First;
    let a = <IRequireMotionAction>action;
    a.Motion = m;
    a.IsLine = true;
    return a;
}