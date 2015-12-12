import {AbstractMotion} from "./AbstractMotion";
import * as Utils from "../Utils";
import {Position} from "../VimStyle";

enum Target {
    Current,
    First,
    Last,
    Number
}

export class LineHeadMotion extends AbstractMotion {

    private targetLine: Target;

    constructor() {
        super();
        this.targetLine = Target.Number;
    }

    public SetFirstLineOption() {
        this.targetLine = Target.First;
    }

    public SetLastLineOption() {
        this.targetLine = Target.Last;
    }
    public SetCurrentLineOption() {
        this.targetLine = Target.Current;
    }

    public CalculateEnd(editor: IEditor, start: IPosition): IPosition {

        var lineDocument: string;
        var lineNumber: number;
        switch (this.targetLine) {
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
                lineNumber = this.GetCount();
                let lastLineNum = editor.GetLastLineNum();
                if (lineNumber > lastLineNum) {
                    lineNumber = lastLineNum;
                }
                lineDocument = editor.ReadLine(lineNumber);
                break;
        }

        var l = lineDocument.length;
        var charNumber: number;
        for (charNumber = 0; charNumber < l; charNumber++) {
            var c = Utils.GetCharClass(lineDocument.charCodeAt(charNumber));
            if (c != CharGroup.Spaces) {
                break;
            }
        }
        var p = new Position();
        p.Line = lineNumber;
        p.Char = charNumber;
        return p;
    }
}