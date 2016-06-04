import {AbstractMotion} from "./AbstractMotion";
import {Position} from "../VimStyle";

export class RightMotion extends AbstractMotion {

    public IsLeftDirection: boolean;

    constructor() {
        super();
        this.IsLeftDirection = false;
    }

    public CalculateEnd(editor: IEditor, vim: IVimStyle, start: IPosition): IPosition {
        let line = editor.ReadLineAtCurrentPosition();
        let end = new Position();
        end.Line = start.Line;
        if (this.IsLeftDirection) {
            end.Char = start.Char - this.Count;
        } else {
            end.Char = start.Char + this.Count;
        }
        return editor.UpdateValidPosition(end);
    }
}