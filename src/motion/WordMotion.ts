import {AbstractMotion} from "./AbstractMotion";
import * as Utils from "../Utils";
import {Position} from "../VimStyle";

export class WordMotion extends AbstractMotion {

    private direction: Direction;
    private isStopFinalLn: boolean;

    constructor(direction: Direction) {
        super();
        this.direction = direction;
        this.isStopFinalLn = false;
    };

    public SetStopFinalLnOption() {
        this.isStopFinalLn = true;
    }

    public CalculateEnd(editor: IEditor, start: IPosition): IPosition {

        var count = this.GetCount();
        var beforeCharClass: CharGroup;
        var charClass: CharGroup;
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
            if (this.direction == Direction.Left) {
                charNum--;
                if (charNum < 0) {
                    // First of line
                    if (this.isStopFinalLn && count == 1) {
                        // last word searching
                        charNum = 0;
                        break;
                    }
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
                        beforeCharClass = CharGroup.Spaces;
                    }
                }
            } else {
                charNum++;
                if (lineLength <= charNum) {
                    // End of line
                    if (this.isStopFinalLn && count == 1) {
                        // last word searching
                        charNum = lineLength;
                        break;
                    }
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
                        beforeCharClass = CharGroup.Spaces;
                    }
                }
            }
            
            // char code
            charCode = line.charCodeAt(charNum);
            charClass = Utils.GetCharClass(charCode);

            if (charClass != beforeCharClass) {
                // new char class
                beforeCharClass = charClass;
                if (charClass != CharGroup.Spaces) {
                    // count new char class withot spaces
                    count--;
                }
            }
        }

        var end = new Position();
        if (isReachLast) {
            // reach last position
            if (this.direction == Direction.Left) {
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
        if (this.direction == Direction.Left) {
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