import { GoAction } from "../action/GoAction";
import * as Utils from "../Utils";
import { Position } from "../VimStyle";
import { AbstractMotion } from "./AbstractMotion";

/**
 * b B e E
 * cb cB ce cE
 * this class will be replaced
 */
export class WordMotion extends AbstractMotion {

    public Direction: Direction;
    // public IsCW: boolean;
    public IsSkipBlankLine: boolean;
    public IsStopLineEnd: boolean;
    public IsWordEnd: boolean;
    public Command: string;
    public IsWORD: boolean;
    public IsForRange: boolean;

    constructor(direction: Direction) {
        super();
        this.Direction = direction;
        // this.IsCW = false;
        this.IsSkipBlankLine = false;
        this.IsStopLineEnd = false;
        this.IsWordEnd = false;
        this.IsWORD = false;
        this.IsForRange = false;
    };

    public CalculateEnd(editor: IEditor, vim: IVimStyle, start: IPosition): IPosition {

        let count = this.Count;

        let previousCharClass: CharGroup = null;
        let charClass: CharGroup = null;
        let nextCharClass: CharGroup = null;

        let previousPosition: Position = null;
        let position: Position = null;
        let nextPosition: Position = editor.GetCurrentPosition().Copy();

        // this count use for skip to stop current position
        let beforeCountLoop: number;

        let line = editor.ReadLine(nextPosition.Line);
        let lineLength = line.length;
        let documentLength = editor.GetLastLineNum() + 1;

        if (this.Direction === Direction.Right) {
            if (nextPosition.Char === 0) {
                charClass = CharGroup.Spaces;
                nextCharClass = CharGroup.Spaces;
                nextPosition.Char = -1;
                if (this.Command !== "dw" && line.length > 0) {
                    let charCode = line.charCodeAt(nextPosition.Char);
                    charClass = Utils.GetCharClass(charCode);
                    if (charClass !== CharGroup.Spaces) {
                        count += 1;
                    }
                }
                beforeCountLoop = -1;
            } else if (nextPosition.Char === 1) {
                nextCharClass = CharGroup.Spaces;
                beforeCountLoop = -2;
            } else {
                nextPosition.Char--;
                beforeCountLoop = -3;
            }
        } else {
            if (lineLength - 2 === nextPosition.Char) {
                charClass = CharGroup.Spaces;
                nextCharClass = CharGroup.Spaces;
                beforeCountLoop = -1;
            } else if (lineLength - 1 === nextPosition.Char) {
                nextCharClass = CharGroup.Spaces;
                beforeCountLoop = -2;
            } else {
                nextPosition.Char++;
                beforeCountLoop = -3;
            }
        }
        if (this.IsForRange && nextCharClass !== CharGroup.Spaces) {
            count--;
        }

        let isReachLast = false;
        let charCode: number;
        let lineEnd: boolean;
        let skipCountDown: boolean;
        while (count > -1) {

            skipCountDown = false;
            lineEnd = false;
            previousPosition = position;
            previousCharClass = charClass;
            position = nextPosition;
            charClass = nextCharClass;
            nextPosition = new Position(position.Line, position.Char);

            // get next charactor

            if (this.Direction === Direction.Left) {

                nextPosition.Char--;
                if (nextPosition.Char === -1) {
                    nextCharClass = CharGroup.Spaces;
                } else if (nextPosition.Char < -1) {
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
                        nextPosition.Char = lineLength - 1;
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
                    lineEnd = true;
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

            beforeCountLoop++;
            if (beforeCountLoop < 0) {
                continue;
            } else if (beforeCountLoop === 0 &&
                this.IsWordEnd &&
                this.Command !== "cw") {
                if (charClass !== CharGroup.Spaces && nextCharClass !== CharGroup.Spaces) {
                    if (this.IsWORD || charClass === nextCharClass) {
                        // e start at a charactor at not end of word
                        count--;
                        skipCountDown = true;
                    }
                }
            }

            // handle
            let newWord = false;
            if (!skipCountDown) {
                if (charClass !== CharGroup.Spaces) {
                    if (this.IsWORD) {
                        if (previousCharClass === CharGroup.Spaces) {
                            newWord = true;
                            count--;
                        }
                    } else {
                        if (previousCharClass !== charClass) {
                            newWord = true;
                            count--;
                        }
                    }
                } else if (!newWord && !this.IsSkipBlankLine) {
                    if (this.Direction === Direction.Right) {
                        if (previousPosition !== null &&
                            previousPosition.Char === -1) {
                            count--;
                        }
                    } else {
                        if (position.Char === -1 && previousPosition.Char === -1) {
                            count--;
                        }
                    }
                }
            }

            if (count === 0) {
                if (this.IsWordEnd) {
                    if (this.IsWORD) {
                        // E B cW
                        if (nextCharClass === CharGroup.Spaces) {
                            break;
                        }
                        if (lineEnd) {
                            break;
                        }
                    } else {
                        // e b cw
                        if (charClass !== nextCharClass) {
                            break;
                        }
                    }
                } else if (this.IsForRange) {
                    if (this.Direction === Direction.Right) {
                        // dw yw
                        if (position.Char === -1) {
                            break;
                        }
                    }

                } else {
                    // W gE dW yW
                    // e ge dw yw
                    break;
                }
            }
        }

        if (isReachLast) {
            // reach last position
            if (this.Direction === Direction.Left) {
                // top position
                return new Position(0, 0);
            } else {
                // last position
                if (this.IsForRange) {
                    position.Char += 1;
                }
                return position;
            }
        }
        if (this.IsForRange && position.Char === -1) {
            // Stop end of line
            line = editor.ReadLine(position.Line - 1);
            return new Position(position.Line - 1, line.length);
        }
        if (this.Command === "cw") {
            if (line.length - 1 > position.Char) {
                position.Char++;
            }
        }

        return position;
    }
}

// Nb
export function GotoWordBackword(num: number): IAction {
    let a = new GoAction();
    let m: WordMotion;
    m = new WordMotion(Direction.Left);
    m.IsWordEnd = true;
    m.IsWORD = false;
    m.IsSkipBlankLine = false;
    m.Count = num > 0 ? num : 1;
    a.Motion = m;
    return a;
}

// cNb
export function AddWordBackwardMotion(num: number, action: IAction) {
    let m: WordMotion;
    m = new WordMotion(Direction.Left);
    m.IsWordEnd = true;
    m.IsWORD = false;
    m.IsSkipBlankLine = false;
    // m.IsForRange = true;
    m.Count = num > 0 ? num : 1;
    let a = <IRequireMotionAction>action;
    a.Motion = m;
}

// NB
export function GotoBlankSeparatedBackwordWord(num: number): IAction {
    let a = new GoAction();
    let m: WordMotion;
    m = new WordMotion(Direction.Left);
    m.IsWordEnd = true;
    m.IsWORD = true;
    m.IsSkipBlankLine = false;
    m.Count = num > 0 ? num : 1;
    a.Motion = m;
    return a;
}

// cNB
export function AddBlankSeparatedBackwordMotion(num: number, action: IAction) {
    let m: WordMotion;
    m = new WordMotion(Direction.Left);
    m.IsWordEnd = true;
    m.IsWORD = true;
    m.IsSkipBlankLine = false;
    // m.IsForRange = true;
    m.Count = num > 0 ? num : 1;
    let a = <IRequireMotionAction>action;
    a.Motion = m;
}
