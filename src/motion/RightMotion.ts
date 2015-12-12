import {AbstractMotion} from "./AbstractMotion";
import {Position} from "../VimStyle";

export class RightMotion extends AbstractMotion {

    private isLeftDirection: boolean;

    constructor() {
        super();
        this.isLeftDirection = false;
    }

    public SetLeftDirection() {
        this.isLeftDirection = true;
    }

    public CalculateEnd(editor: IEditor, start: IPosition): IPosition {
        var line = editor.ReadLineAtCurrentPosition();
        var end = new Position();
        end.Line = start.Line;
        if (this.isLeftDirection) {
            end.Char = start.Char - this.GetCount();
        } else {
            end.Char = start.Char + this.GetCount();
        }
        return editor.UpdateValidPosition(end);
    }
}