import {AbstractMotion} from "./AbstractMotion";
import {Position} from "../VimStyle";
import * as Utils from "../Utils";

export class DownMotion extends AbstractMotion {

    private isUpDirection: boolean;

    constructor() {
        super();
        this.isUpDirection = false;
    }

    public SetUpDirection() {
        this.isUpDirection = true;
    }

    public CalculateEnd(editor: IEditor, start: IPosition): IPosition {

        let tabSize = editor.GetTabSize();

        let end = new Position();
        if (this.isUpDirection) {
            end.Line = start.Line - this.GetCount();
        } else {
            end.Line = start.Line + this.GetCount();
        }

        let startText = editor.ReadLine(start.Line);
        let visualChar = Utils.CalcVisialPosition(start.Char, startText, tabSize);

        let endText = editor.ReadLine(end.Line);
        end.Char = Utils.CalcSystemPosition(visualChar, endText, tabSize);

        return editor.UpdateValidPosition(end);
    }
}