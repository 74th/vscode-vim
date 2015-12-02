import {AbstractMotion} from "./AbstractMotion"
import {Position, Range} from "../VimStyle";

export class DownMotion extends AbstractMotion {
    
    private isUpDirection: boolean;
    
    constructor() {
        super();
        this.isUpDirection = false;
    }
    
    public SetUpDirection() {
        this.isUpDirection = true;
    }
    
    public CalculateSelectionRange(editor: IEditor, start: IPosition): IRange {
        var newStart = new Position(start.line, 0);
        
        var endLineNum = this.CalculateEndLineNum(editor, start, false);

        if(endLineNum === -1) {
            return null;
        }
        
        var line = editor.ReadLine(endLineNum);
        
        var end = new Position(endLineNum, line.length);
        
        return new Range(newStart, end);
    }

    public CalculateEnd(editor: IEditor, start: IPosition): IPosition {
        var end = new Position();
        end.char = start.char;
        
        end.line = this.CalculateEndLineNum(editor, start, true);
        
        var line = editor.ReadLine(end.line);
        
        if (end.char > line.length) {
            end.char = line.length;
        }
        
        return end;
    }
    
    private CalculateEndLineNum(editor: IEditor, start: IPosition, allowOutOfBounds: boolean): number {
        var endLineNum: number;
       
        if(this.isUpDirection) {
            endLineNum = start.line - this.GetCount();
        } else {
            endLineNum = start.line + this.GetCount();
        }
        
        var isOutOfBounds: boolean;
        var lastLineNum = editor.GetLastLineNum();
        
        if(endLineNum < 0) {
            endLineNum = 0;
            isOutOfBounds = true;
        } else if(endLineNum > lastLineNum) {
            endLineNum = lastLineNum;
            isOutOfBounds = true;
        }
        
        if(allowOutOfBounds || !isOutOfBounds) {
            return endLineNum;
        }
        
        return -1;
    }
}