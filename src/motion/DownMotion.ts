import {AbstractMotion} from "./AbstractMotion"
import {Position} from "../VimStyle";

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
        var end = new Position();
        end.char = start.char;
        if (this.isUpDirection) {
            end.line = start.line - this.GetCount();
        } else {
            end.line = start.line + this.GetCount();
        }
        return editor.UpdateValidPosition(end);
    }
}