import {AbstractMotion} from "./AbstractMotion";
import {Position} from "../VimStyle";

export class EndMotion extends AbstractMotion {

    public CalculateEnd(editor: IEditor, start: IPosition): IPosition {
        var end = new Position();
        end.Line = start.Line;
        end.Char = Number.MAX_VALUE;
        return editor.UpdateValidPosition(end);
    }
}