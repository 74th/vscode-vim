import {AbstractMotion} from "./AbstractMotion";
import {Position, Range} from "../VimStyle";

export class FindCharacterMotion extends AbstractMotion {

    private targetCharCode:number;
    private direction: Direction;
    private isTill: boolean;
    
    constructor(direction: Direction) {
        super();
        this.direction = direction;
        this.isTill = false;
    }
    
    public SetChar(c: string) {
        this.targetCharCode = c.charCodeAt(0);
    }
    
    public SetTillOption() {
        this.isTill = true;
    }
    
    public CalculateSelectionRange(editor: IEditor, start: IPosition): IRange {
        var start = new Position(start.line, start.char);
        var end = this.CalculateEnd(editor, start);
        
        if(!end) {
            return null;
        }
        
        return new Range(start, end);
    }
    
    public CalculateEnd(editor: IEditor, start: IPosition): IPosition {
        var line = editor.ReadLineAtCurrentPosition();
        var end = new Position();
        end.line = start.line;
        var i;
        var count = this.GetCount();
        if (this.direction == Direction.Right) {
            for (i = start.char + 1; i < line.length; i++){
                if (this.targetCharCode == line.charCodeAt(i)) {
                    count--;
                    if (count == 0) {
                        end.char = i;
                        break;
                    }
                }
            }
        } else {
            for (i = start.char - 1; i >= 0; i--){
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
        if (this.isTill) {
            if (this.direction == Direction.Right) {
                end.char -= 1;
            } else {
                end.char += 1;
            }
        }
        return end;
    }
}