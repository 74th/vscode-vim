import {AbstractMotion} from "./AbstractMotion";
import {Position} from "../VimStyle";

export class HomeMotion extends AbstractMotion {

    public CalculateEnd(editor: IEditor, start: IPosition): IPosition {
        var end = new Position();
        end.Line = start.Line;
        end.Char = 0;
        return editor.UpdateValidPosition(end);
    }
}