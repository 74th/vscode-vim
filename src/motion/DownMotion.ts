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
            if (end.line < 0) {
                end.line = 0;
            }
        } else {
            end.line = start.line + this.GetCount();
            var c = editor.GetLastLineNum();
            if (end.line > c) {
                end.line = c;
            }
        }
        var line = editor.ReadLine(end.line);
        if (end.char > line.length) {
            end.char = line.length;
        }
        return end;
    }
}