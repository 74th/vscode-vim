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
        end.line = start.line;
        if (this.isLeftDirection) {
            end.char = start.char - this.GetCount();
        } else {
            end.char = start.char + this.GetCount();
        }
        return editor.UpdateValidPosition(end);
    }
}