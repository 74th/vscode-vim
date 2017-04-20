import { GoDownAction } from "../action/MoveLineAction";
import * as Utils from "../Utils";
import { Position } from "../VimStyle";
import { AbstractMotion } from "./AbstractMotion";

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
            if (end.Line < 0) {
                end.Line = 0;
            }
        } else {
            let lastLine = editor.GetLastLineNum();
            end.Line = start.Line + this.Count;
            if (end.Line > lastLine) {
                end.Line = lastLine;
            }
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
    m.Count = num > 0 ? num : 1;
    a.Motion = m;
    return a;
}

/**
 * k
 */
export function GoUp(num: number): IAction {
    let m = new DownMotion();
    m.IsUpDirection = true;
    m.Count = num > 0 ? num : 1;
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
    m.Count = num > 0 ? num : 1;
    a.Motion = m;
    a.IsLine = true;
}

/**
 * ck
 */
export function AddUpMotion(num: number, action: IAction) {
    let m = new DownMotion();
    m.IsUpDirection = true;
    m.Count = num > 0 ? num : 1;
    let a = <IRequireMotionAction>action;
    a.Motion = m;
    a.IsLine = true;
}
