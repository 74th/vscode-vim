import { AbstractMotion } from "./AbstractMotion";
import { GoDownAction } from "../action/MoveLineAction";
import { Position } from "../VimStyle";
import * as Utils from "../Utils";

/**
 * j k
 * cj ck
 */
export class DownMotion extends AbstractMotion {

    public IsUpDirection: boolean;

    constructor() {
        super();
        this.IsUpDirection = false;
    }

    public CalculateEnd(editor: IEditor, vim: IVimStyle, start: IPosition): IPosition {

        let tabSize = editor.GetTabSize();

        let end = new Position();
        if (this.IsUpDirection) {
            end.Line = start.Line - this.Count;
        } else {
            end.Line = start.Line + this.Count;
        }

        let startText = editor.ReadLine(start.Line);
        let visualChar = Utils.CalcVisialPosition(start.Char, startText, tabSize);

        let endText = editor.ReadLine(end.Line);
        end.Char = Utils.CalcSystemPosition(visualChar, endText, tabSize);

        return editor.UpdateValidPosition(end);
    }
}
/**
 * j
 */
export function GoDown(num: number): IAction {
    let m = new DownMotion();
    let a = new GoDownAction();
    if (num === 0) {
        m.Count = 1;
    } else {
        m.Count = num;
    }
    a.Motion = m;
    return a;
}

/**
 * k
 */
export function GoUp(num: number): IAction {
    let m = new DownMotion();
    m.IsUpDirection = true;
    if (num === 0) {
        m.Count = 1;
    } else {
        m.Count = num;
    }
    let a = new GoDownAction();
    a.Motion = m;
    return a;
}

/**
 * cj
 */
export function AddDownMotion(num: number, action: IAction) {
    let m = new DownMotion();
    let a = <IRequireMotionAction>action;
    if (num === 0) {
        m.Count = 1;
    } else {
        m.Count = num;
    }
    a.Motion = m;
    a.IsLine = true;
}

/**
 * ck
 */
export function AddUpMotion(num: number, action: IAction) {
    let m = new DownMotion();
    m.IsUpDirection = true;
    if (num === 0) {
        m.Count = 1;
    } else {
        m.Count = num;
    }
    let a = <IRequireMotionAction>action;
    a.Motion = m;
    a.IsLine = true;
}