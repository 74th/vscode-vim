import {AbstractMotion} from "./AbstractMotion";
import * as Utils from "../Utils";
import {Position} from "../VimStyle";

export enum LineHeadTarget {
    Current,
    First,
    Last,
    Number
}

export class LineHeadMotion extends AbstractMotion {

    public TargetLine: LineHeadTarget;
    public IsSkipSpaces: boolean;

    constructor() {
        super();
        this.TargetLine = LineHeadTarget.Number;
        this.IsSkipSpaces = false;
    }

    public CalculateEnd(editor: IEditor, start: IPosition): IPosition {

        let lineDocument: string;
        let lineNumber: number;
        switch (this.TargetLine) {
            case LineHeadTarget.Current:
                lineDocument = editor.ReadLineAtCurrentPosition();
                lineNumber = start.Line;
                break;
            case LineHeadTarget.First:
                lineNumber = 0;
                lineDocument = editor.ReadLine(lineNumber);
                break;
            case LineHeadTarget.Last:
                lineNumber = editor.GetLastLineNum();
                lineDocument = editor.ReadLine(lineNumber);
                break;
            case LineHeadTarget.Number:
                lineNumber = this.GetCount();
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