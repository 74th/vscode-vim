import {AbstractMotion} from "./AbstractMotion";
import * as Utils from "../Utils";
import {Position} from "../VimStyle";

export class WordMotion extends AbstractMotion {

    private direction: Direction;
    private isSkipBlankLine: boolean;
    private isWordEnd: boolean;
    private isWORD: boolean;

    constructor(direction: Direction) {
        super();
        this.direction = direction;
        this.isSkipBlankLine = false;
        this.isWordEnd = false;
        this.isWORD = false;
    };

    public SetSkipBlankLineOption() {
        this.isSkipBlankLine = true;
    }

    public SetWordEndOption() {
        this.isWordEnd = true;
    }

    public SetWORDOption() {
        this.isWORD = true;
    }

    public CalculateEnd(editor: IEditor, start: IPosition): IPosition {

        let count = this.GetCount();

        let previousCharClass: CharGroup = null;
        let charClass: CharGroup = null;
        let nextCharClass: CharGroup = null;

        let previousPosition: Position = null;
        let position: Position = null;
        let nextPosition: Position = editor.GetCurrentPosition();

        let line = editor.ReadLine(nextPosition.Line);
        let lineLength = line.length;
        let documentLength = editor.GetLastLineNum() + 1;
        previousCharClass = Utils.GetCharClass(line.charCodeAt(nextPosition.Char));

        let isReachLast = false;
        let charCode: number;
        while (count > 0) {

            previousPosition = position;
            previousCharClass = charClass;
            position = nextPosition;
            charClass = nextCharClass;
            nextPosition = new Position(position.Line, position.Char);

            // get next charactor

            if (this.direction === Direction.Left) {

                nextPosition.Char--;
                if (nextPosition.Char < 0) {
                    // First of line
                    nextPosition.Line--;
                    if (nextPosition.Line < 0) {
                        // Fist of document
                        isReachLast = true;
                        break;
                    } else {
                        // before line
                        line = editor.ReadLine(nextPosition.Line);
                        lineLength = line.length;
                        nextPosition.Char = lineLength;
                        nextCharClass = CharGroup.Spaces;
                    }
                } else {
                    // char code
                    let nextCharCode = line.charCodeAt(nextPosition.Char);
                    nextCharClass = Utils.GetCharClass(nextCharCode);
                }

            } else {

                nextPosition.Char++;
                if (lineLength <= nextPosition.Char) {
                    // End of line
                    nextPosition.Line++;
                    if (nextPosition.Line === documentLength) {
                        // End of document
                        isReachLast = true;
                        break;
                    } else {
                        // next line
                        line = editor.ReadLine(nextPosition.Line);
                        lineLength = line.length;
                        nextPosition.Char = -1;
                        nextCharClass = CharGroup.Spaces;
                    }
                } else {
                    // char code
                    let nextCharCode = line.charCodeAt(nextPosition.Char);
                    nextCharClass = Utils.GetCharClass(nextCharCode);
                }
            }

            if (charClass === null) {
                continue;
            }

            // handle
            if (charClass === CharGroup.Spaces) {
                if (this.direction === Direction.Left) {
                    if (position.Char === 0 && previousPosition.Char === 0) {
                        // blankline

                        if (!this.isSkipBlankLine) {
                            count--;
                        }
                    }
                } else {
                    if (position.Char === -1 && nextPosition.Char === -1) {
                        // blankline

                        if (!this.isSkipBlankLine) {
                            count--;
                        }
                    }
                }
                continue;
            }
            if (this.isWORD) {
                if (nextCharClass === CharGroup.Spaces) {
                    // end of word
                    if (this.isWordEnd) {
                        count--;
                    }
                } else if (previousCharClass === CharGroup.Spaces) {
                    // first of word
                    if (!this.isWordEnd) {
                        count--;
                    }
                }
            } else {
                if (nextCharClass !== charClass) {
                    // end of word
                    if (this.isWordEnd) {
                        count--;
                    }
                }
                if (previousCharClass !== null &&
                    previousCharClass !== charClass) {
                    // end of word
                    if (!this.isWordEnd) {
                        count--;
                    }
                }
            }
        }

        if (isReachLast) {
            // reach last position
            if (this.direction === Direction.Left) {
                // top position
                return new Position(0, 0);
            } else {
                // last position
                return position;
            }
        }

        return position;
    }
}