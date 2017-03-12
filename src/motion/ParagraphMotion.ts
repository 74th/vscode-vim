import { GoAction } from "../action/GoAction";
import * as Utils from "../Utils";
import { Position } from "../VimStyle";
import { AbstractMotion } from "./AbstractMotion";

/**
 * { }
 */
export class ParagraphMotion extends AbstractMotion {

    public IsUpDirection: boolean;

    constructor() {
        super();
        this.IsUpDirection = false;
    }

    public CalculateEnd(editor: IEditor, vim: IVimStyle, start: IPosition): IPosition {

        let tabSize = editor.GetTabSize();

        let line = start.Line;
        let lineText = editor.ReadLine(start.Line);
        let previousLineIsBlank: boolean = lineText.length === 0;
        let lastLine = editor.GetLastLineNum();
        let count = this.Count;

        while (count > 0) {

            if (this.IsUpDirection) {
                line--;
                if (line === 0) {
                    break;
                }
            } else {
                line++;
                if (line > lastLine) {
                    return editor.GetLastPosition();
                }
            }

            lineText = editor.ReadLine(line);
            if (lineText.length === 0 && !previousLineIsBlank) {
                count--;
                previousLineIsBlank = true;
            } else if (lineText.length > 0) {
                previousLineIsBlank = false;
            }

        }

        let end = new Position(line, 0);
        return editor.UpdateValidPosition(end);
    }
}

// N{
export function GotoParagraphBackword(num: number): IAction {
    let a = new GoAction();
    let m: ParagraphMotion = new ParagraphMotion();
    m.IsUpDirection = true;
    m.Count = num > 0 ? num : 1;
    a.Motion = m;
    return a;
}

// cN{
export function AddParagraphBackwordMotion(num: number, action: IAction) {
    let m: ParagraphMotion = new ParagraphMotion();
    m.IsUpDirection = true;
    m.Count = num > 0 ? num : 1;
    let a = <IRequireMotionAction>action;
    a.Motion = m;
}

// N}
export function GotoParagraphFoword(num: number): IAction {
    let a = new GoAction();
    let m: ParagraphMotion = new ParagraphMotion();
    m.IsUpDirection = false;
    m.Count = num > 0 ? num : 1;
    a.Motion = m;
    return a;
}

// cN}
export function AddParagraphFowordMotion(num: number, action: IAction) {
    let m: ParagraphMotion = new ParagraphMotion();
    m.IsUpDirection = false;
    m.Count = num > 0 ? num : 1;
    let a = <IRequireMotionAction>action;
    a.Motion = m;
}
