import {AbstractMotion} from "./AbstractMotion";
import {Position} from "../VimStyle";
import * as Utils from "../Utils";

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
                if (line === lastLine) {
                    break;
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