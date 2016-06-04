import {AbstractMotion} from "./AbstractMotion";
import * as Utils from "../Utils";
import {Position} from "../VimStyle";

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