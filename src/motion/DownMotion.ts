import {AbstractMotion} from "./AbstractMotion";
import {Position} from "../VimStyle";
import * as Utils from "../Utils";

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