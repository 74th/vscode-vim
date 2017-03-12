import { GoAction } from "../action/GoAction";
import * as Utils from "../Utils";
import { Position } from "../VimStyle";
import { AbstractMotion } from "./AbstractMotion";

/**
 * e ce de E cE dE
 * please see wordMotionStateModel/deleteEndOfWord.png
 */
export class DeleteEndOfWordMotion extends AbstractMotion {

    public IsWORD: boolean;
    public IsMove: boolean;

    constructor() {
        super();
    };

    public CalculateEnd(editor: IEditor, vim: IVimStyle, start: IPosition): IPosition {
        let cal = new Calculater(start, this.Count, this.IsWORD, this.IsMove, editor);
        return cal.CalculateEnd();
    }
}

enum State {
    first = 1,
    firstCharacter,
    character,
    spaceOrLinefeed,
    decreaseCount,
    finalWord,
    stop,
    deleteUntilJustBefore,
    moveToPreviousCharacter,
    reachDocumentEnd,
}

enum NextCharacter {
    character,
    sameTypeCharacter,
    differenceTypeCharacter,
    lineFeed,
    space,
}

class Calculater {
    public pos: IPosition;
    public line: string;
    public documentLines: number;
    public count: number;
    public IsWORD: boolean;
    public IsMove: boolean;

    public beforeCharacterGroup: CharGroup;

    public editor: IEditor;

    constructor(start: IPosition, count: number, isWord: boolean, isMove: boolean, editor: IEditor) {
        this.pos = start.Copy();
        this.pos.Char--;
        this.line = editor.ReadLine(start.Line);
        this.editor = editor;
        this.documentLines = editor.GetLastLineNum();
        this.count = count;
        this.beforeCharacterGroup = null;
        this.IsWORD = isWord;
        this.IsMove = isMove;
    };

    public getNextCharacter(): NextCharacter {
        this.pos.Char++;
        if (this.pos.Char > this.line.length) {
            this.pos.Line++;
            this.pos.Char = 0;
            this.line = this.editor.ReadLine(this.pos.Line);
        }
        if (this.pos.Char === this.line.length) {
            if (this.pos.Line === this.documentLines) {
                return null;
            }
            this.beforeCharacterGroup = null;
            return NextCharacter.lineFeed;
        }
        let characterGroup: CharGroup = Utils.GetCharClass(this.line.charCodeAt(this.pos.Char));
        let result: NextCharacter;
        if (characterGroup === CharGroup.Spaces) {
            this.beforeCharacterGroup = null;
            return NextCharacter.space;
        }
        if (this.beforeCharacterGroup === null) {
            this.beforeCharacterGroup = characterGroup;
            return NextCharacter.character;
        }
        if (this.IsWORD) {
            this.beforeCharacterGroup = characterGroup;
            return NextCharacter.sameTypeCharacter;
        }
        if (this.beforeCharacterGroup === characterGroup) {
            return NextCharacter.sameTypeCharacter;
        }
        this.beforeCharacterGroup = characterGroup;
        return NextCharacter.differenceTypeCharacter;
    }

    public doAtFirst(): State {
        let nextCharacterGroup: NextCharacter = this.getNextCharacter();
        if (nextCharacterGroup === null) {
            return State.reachDocumentEnd;
        }
        switch (nextCharacterGroup) {
            case NextCharacter.character:
                return State.firstCharacter;
            case NextCharacter.lineFeed:
            case NextCharacter.space:
                return State.spaceOrLinefeed;
        }
    };

    public doAtFirstCharacter(): State {
        let nextCharacterGroup: NextCharacter = this.getNextCharacter();
        if (nextCharacterGroup === null) {
            return State.reachDocumentEnd;
        }
        switch (nextCharacterGroup) {
            case NextCharacter.sameTypeCharacter:
            case NextCharacter.differenceTypeCharacter:
                return State.decreaseCount;
            case NextCharacter.lineFeed:
            case NextCharacter.space:
                return State.spaceOrLinefeed;
        }
    }

    public doAtCharacter(): State {
        let nextCharacterGroup: NextCharacter = this.getNextCharacter();
        if (nextCharacterGroup === null) {
            return State.reachDocumentEnd;
        }
        switch (nextCharacterGroup) {
            case NextCharacter.differenceTypeCharacter:
                return State.decreaseCount;
            case NextCharacter.sameTypeCharacter:
                return State.character;
            case NextCharacter.lineFeed:
            case NextCharacter.space:
                return State.spaceOrLinefeed;
        }
    }

    public doAtSpaceOrLinefeed(): State {
        let nextCharacterGroup: NextCharacter = this.getNextCharacter();
        if (nextCharacterGroup === null) {
            return State.reachDocumentEnd;
        }
        switch (nextCharacterGroup) {
            case NextCharacter.character:
                return State.decreaseCount;
            case NextCharacter.lineFeed:
            case NextCharacter.space:
                return State.spaceOrLinefeed;
        }
    }

    public decreaseCount(): State {
        this.count--;
        if (this.count === 0) {
            return State.finalWord;
        }
        return State.character;
    }

    public doAtFinalWord(): State {
        let nextCharacterGroup: NextCharacter = this.getNextCharacter();
        if (nextCharacterGroup === null) {
            return State.reachDocumentEnd;
        }
        switch (nextCharacterGroup) {
            case NextCharacter.sameTypeCharacter:
                return State.finalWord;
            case NextCharacter.differenceTypeCharacter:
            case NextCharacter.lineFeed:
            case NextCharacter.space:
                return State.stop;
        }
    }

    public doAtStoppedPos(): State {
        if (this.IsMove) {
            return State.moveToPreviousCharacter;
        }
        return State.deleteUntilJustBefore;
    }

    public moveToPreviousCharacter() {
        if (this.pos.Char > 0) {
            this.pos.Char--;
        }
    }

    public CalculateEnd(): IPosition {
        let state: State = State.first;
        let whileContinue = true;
        while (whileContinue) {
            switch (state) {
                case State.reachDocumentEnd:
                    whileContinue = false;
                    break;
                case State.first:
                    state = this.doAtFirst();
                    break;
                case State.firstCharacter:
                    state = this.doAtFirstCharacter();
                    break;
                case State.character:
                    state = this.doAtCharacter();
                    break;
                case State.spaceOrLinefeed:
                    state = this.doAtSpaceOrLinefeed();
                    break;
                case State.decreaseCount:
                    state = this.decreaseCount();
                    break;
                case State.finalWord:
                    state = this.doAtFinalWord();
                    break;
                case State.stop:
                    state = this.doAtStoppedPos();
                    break;
                case State.deleteUntilJustBefore:
                    whileContinue = false;
                    break;
                case State.moveToPreviousCharacter:
                    this.moveToPreviousCharacter();
                    whileContinue = false;
                    break;
            }
        }
        return this.pos;
    }
}

/**
 * Ne
 */
export function GotoForwardToEndOfWold(num: number): IAction {
    let a = new GoAction();
    let m = new DeleteEndOfWordMotion();
    m.IsWORD = false;
    m.IsMove = true;
    m.Count = num > 0 ? num : 1;
    a.Motion = m;
    return a;
}

/**
 * cNe
 */
export function AddEndOfWordMotion(num: number, action: IAction) {
    let m = new DeleteEndOfWordMotion();
    m.IsWORD = false;
    m.IsMove = false;
    m.Count = num > 0 ? num : 1;
    let a = <IRequireMotionAction>action;
    a.Motion = m;
}

/**
 * vNe
 */
export function AddMoveToForwardToEndOfWoldMotion(num: number, action: IAction) {
    let a = <IRequireMotionAction>action;
    let m = new DeleteEndOfWordMotion();
    m.IsWORD = false;
    m.IsMove = true;
    m.Count = num > 0 ? num : 1;
    a.Motion = m;
}

/**
 * NE
 */
export function GotoForwardToEndOfBlankSeparated(num: number): IAction {
    let a = new GoAction();
    let m = new DeleteEndOfWordMotion();
    m.IsWORD = true;
    m.IsMove = true;
    m.Count = num > 0 ? num : 1;
    a.Motion = m;
    return a;
}

/**
 * cWE
 */
export function AddEndOfBlankSeparatedMotion(num: number, action: IAction) {
    let m = new DeleteEndOfWordMotion();
    m.IsWORD = true;
    m.IsMove = false;
    m.Count = num > 0 ? num : 1;
    let a = <IRequireMotionAction>action;
    a.Motion = m;
}

/**
 * vNE
 */
export function AddMoveToForwardToEndOfBlankSeparatedMotion(num: number, action: IAction) {
    let a = <IRequireMotionAction>action;
    let m = new DeleteEndOfWordMotion();
    m.IsWORD = true;
    m.IsMove = true;
    m.Count = num > 0 ? num : 1;
    a.Motion = m;
}
