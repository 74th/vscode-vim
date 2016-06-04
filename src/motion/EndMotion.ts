import {AbstractMotion} from "./AbstractMotion";
import {Position} from "../VimStyle";

export class LastCharacterInLineMotion extends AbstractMotion {

    public CalculateEnd(editor: IEditor, vim: IVimStyle, start: IPosition): IPosition {
        let end = new Position();
        end.Line = start.Line;
        end.Char = Number.MAX_VALUE;
        return editor.UpdateValidPosition(end);
    }
}