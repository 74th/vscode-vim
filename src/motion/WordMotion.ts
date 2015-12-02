import {AbstractMotion} from "./AbstractMotion";
import * as Utils from "../Utils";
import {Position, Range} from "../VimStyle";

export class WordMotion extends AbstractMotion {
    
    private direction: Direction;
    
    constructor(direction:Direction) {
        super();
        this.direction = direction;  
    };
    
    public CalculateSelectionRange(editor: IEditor, start: IPosition): IRange {
        var start = new Position(start.line, start.char);
        var endPos = this.CalculateEnd(editor, start);
        
        //Filter out new line characters from selection
        if(this.direction === Direction.Right) {
            if(endPos.char === 0) {
                var prevLine = editor.ReadLine(endPos.line - 1);
                endPos = new Position(endPos.line - 1, prevLine.length);
            }
        } else {
            if(start.char === 0) {
                var prevLine = editor.ReadLine(start.line - 1);
                start = new Position(start.line - 1, prevLine.length);
            }
        }
        
        return new Range(start, endPos);
    }
    
    public CalculateEnd(editor: IEditor, start: IPosition): IPosition {
        
        var count = this.GetCount();
        var currPosition = start;
        var prevPosition: IPosition;
       
        while (count > 0) {
            var prevPosition = currPosition;
            var currPosition = this.calculateNextWordPosition(editor, currPosition);
            
            if(currPosition.IsEqual(prevPosition)) {
                break;
            }
            
            count--;
        }
        
        return currPosition;
    }

    private calculateNextWordPosition(editor: IEditor, start: IPosition): IPosition {
        
        var lineNum = start.line;
        var charNum = start.char;
        
        var line = editor.ReadLine(lineNum);
        var lineLength = line.length;
        var documentLength = editor.GetLastLineNum() + 1;
        
        var charClass: CharGroup;
        var beforeCharClass = Utils.GetCharClass(line.charCodeAt(charNum));
        
        var charCode: number;
        var isEnd: boolean;
        var isNewLine: boolean;
        
        while(true) {
            isNewLine = false;
            // get next character
            if (this.direction == Direction.Left) {
                charNum--;
                
                if (charNum < 0) {
                    // Hit beginning of line
                    isNewLine = true;
                    lineNum--;
                    
                    if (lineNum < 0) {
                        // First line
                        isEnd = true;
                        break;
                    } else {
                        // Previous line
                        line = editor.ReadLine(lineNum);
                        lineLength = line.length;
                        charNum = lineLength - 1;
                    }
                }
            } else {
                charNum++;
                
                if (lineLength <= charNum) {
                    // Hit end of line
                    isNewLine = true;
                    charNum = 0;
                    lineNum++;
                    
                    if (lineNum == documentLength) {
                        // End of document
                        isEnd = true;
                        break;
                    } else {
                        // next line
                        line = editor.ReadLine(lineNum);
                        lineLength = line.length;
                        charNum = 0;
                    }
                }
            }
            
            // char code
            charCode = line.charCodeAt(charNum);
            charClass = Utils.GetCharClass(charCode);
            
            if (charClass != beforeCharClass || isNewLine) {
                // new char class
                beforeCharClass = charClass;
                if (charClass != CharGroup.Spaces) {
                    break;
                }
            }
        }
        
        if (isEnd) {
            if (this.direction === Direction.Left) {
                return new Position(0, 0);
            } 
            
            return editor.GetLastPosition();
        }
        
        
        if (this.direction === Direction.Left) {
            // check front of a word
            var i = charNum - 1;
            
            while (i > 0) {
                if (charClass != Utils.GetCharClass(line.charCodeAt(i))) {
                    return new Position(lineNum, i + 1);
                }
                
                i--;
            }
            
            return new Position(lineNum, 0);
        }
        
        return new Position(lineNum, charNum);
    }
}