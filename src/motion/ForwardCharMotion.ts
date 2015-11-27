import {AbstractMotion} from "./AbstractMotion";
import * as Enums from "../VimStyleEnums";
import {Position} from "../VimStyle";

export class ForwardCharMotion extends AbstractMotion {

    private targetCharCode:number;
    private direction: Enums.Direction;
    private sideOfCharactor: Enums.Direction;
    
    constructor(direction: Enums.Direction, sideOfCharactor: Enums.Direction) {
        super();
        this.direction = direction;
        this.sideOfCharactor = sideOfCharactor;
    }
    
    public SetChar(c: string) {
        this.targetCharCode = c.charCodeAt(0);
    }
    
    public CalculateEnd(editor: IEditor, start: IPosition): IPosition {
        var line = editor.ReadLineAtCurrentPosition();
        var end = new Position();
        end.line = start.line;
        var i;
        var count = this.GetCount();
        if (this.direction == Enums.Direction.Right) {
            for (i = start.char; i < line.length; i++){
                if (this.targetCharCode == line.charCodeAt(i)) {
                    count--;
                    if (count == 0) {
                        end.char = i;
                        break;
                    }
                }
            }
        } else {
            for (i = start.char; i >= 0; i--){
                if (this.targetCharCode == line.charCodeAt(i)) {
                    count--;
                    if (count == 0) {
                        end.char = i;
                        break;
                    }    
                }
            }
        }
        if (count > 0) {
            return null;
        }
        if (this.sideOfCharactor == Enums.Direction.Right) {
            end.char += 1;
        }
        return end;
    }
}