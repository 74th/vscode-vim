import {AbstractMotion} from "./AbstractMotion"
import {Position, Range} from "../VimStyle";

export class RightMotion extends AbstractMotion {

    private isLeftDirection: boolean;

    constructor() {
        super();
        this.isLeftDirection = false;
    }

    public SetLeftDirection() {
        this.isLeftDirection = true;
    }
    
    public CalculateSelectionRange(editor: IEditor, start: IPosition): IRange {
       var start = new Position(start.line, start.char);
       var end = this.CalculateEnd(editor, start);
       return new Range(start, end);
    }

    public CalculateEnd(editor: IEditor, start: IPosition): IPosition {
        var line = editor.ReadLineAtCurrentPosition();
        var end = new Position();
        end.line = start.line;
        if (this.isLeftDirection) {
            end.char = start.char - this.GetCount();
            if (end.char < 0) {
                end.char = 0;
            }
        } else {
            end.char = start.char + this.GetCount();
            if (line.length < end.char) {
                end.char = line.length;
            }
        }
        return end;
    }
}