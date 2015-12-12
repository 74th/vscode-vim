import {AbstractMotion} from "./AbstractMotion";
import {Position} from "../VimStyle";

export class HomeMotion extends AbstractMotion {

    public CalculateEnd(editor: IEditor, start: IPosition): IPosition {
        var end = new Position();
        end.line = start.line;
        end.char = 0;
        return editor.UpdateValidPosition(end);
    }
}