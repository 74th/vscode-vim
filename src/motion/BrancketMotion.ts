import {AbstractMotion} from "./AbstractMotion";
import {Position} from "../VimStyle";
import * as Utils from "../Utils";

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
                this.Count--;
            }
            if (c === this.RightBrancket) {
                this.Count++;
            }

            if (this.Count === 0 && c === this.TargetBrancket) {
                break;
            }
        }

        return p;
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
        while (this.Count > 0) {

            // read 1 char
            p.Char++;
            if (p.Char >= line.length) {
                p.Line++;
                if (p.Line > lastLine) {
                    p = editor.GetLastPosition();
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
                this.Count--;
            }

            if (this.Count === 0 && c === this.TargetBrancket) {
                break;
            }

        }
        return p;
    }
}