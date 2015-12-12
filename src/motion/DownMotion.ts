import {AbstractMotion} from "./AbstractMotion";
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
        end.Char = start.Char;
        if (this.isUpDirection) {
            end.Line = start.Line - this.GetCount();
        } else {
            end.Line = start.Line + this.GetCount();
        }
        return editor.UpdateValidPosition(end);
    }
}