import {AbstractMotion} from "./AbstractMotion";
import * as Enums from "../VimStyleEnums";
import * as Utils from "../Utils";
import {Position} from "../VimStyle";

export class ForwardWordMotion extends AbstractMotion {
    
    private isBack: boolean;
    
    constructor() {
        super();
        this.isBack = false;  
    };
    
    public SetBack() {
        this.isBack = true;
    };

    public CalculateEnd(editor: IEditor, start: IPosition): IPosition {
        
        var count = this.GetCount();
        var beforeCharClass: Enums.CharGroup;
        var charClass: Enums.CharGroup;
        var p = editor.GetCurrentPosition();
        var lineNum = p.line;
        var charNum = p.char;
        var line = editor.ReadLine(lineNum);
        var lineLength = line.length;
        var documentLength = editor.GetLastLineNum() + 1;
        beforeCharClass = Utils.GetCharClass(line.charCodeAt(charNum));
        
        var isReachLast = false;
        var charCode: number;
        while (count > 0) {
            
            // get next charactor
            if (this.isBack) {
                charNum--;
                if (charNum < 0) {
                    // First of line
                    lineNum--;
                    if (lineNum < 0) {
                        // Fist of document
                        isReachLast = true;
                        break;
                    } else {
                        // before line
                        line = editor.ReadLine(lineNum);
                        lineLength = line.length;
                        charNum = lineLength - 1;
                    }
                }
            } else {
                charNum++;
                if (lineLength <= charNum) {
                    // End of line
                    charNum = 0;
                    lineNum++;
                    if (lineNum == documentLength) {
                        // End of document
                        isReachLast = true;
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
            
            if (charClass != beforeCharClass) {
                // new char class
                beforeCharClass = charClass;
                if (charClass != Enums.CharGroup.Spaces) {
                    // count new char class withot spaces
                    count--;
                }
            }
        }
        
        var end = new Position();
        if (isReachLast) {
            // reach last position
            if (this.isBack) {
                // top position
                end.char = 0;
                end.line = 0;
            } else {
                // last position
                end = editor.GetLastPosition();
            }
            return end;
        }
        
        end.line = lineNum;
        if (this.isBack) {
            // check front of a word
            var i = charNum - 1;
            while (i > 0) {
                if (charClass != Utils.GetCharClass(line.charCodeAt(i))) {
                    end.char = i + 1;
                    return end;
                }
                i--;
            }
            // home of line
            end.char = 0;
            return end;
        }
        
        // foward
        end.char = charNum;
        return end;
    }
}