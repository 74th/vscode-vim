import {AbstractMotion} from "./AbstractMotion";
import * as Utils from "../Utils";
import {Position} from "../VimStyle";

// please see wordMotionStateModel/deleteEndOfWord.png
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
    reachDocumentEnd
}

enum NextCharacter {
    character,
    sameTypeCharacter,
    differenceTypeCharacter,
    lineFeed,
    space
}

class Calculater {
    pos: IPosition;
    line: string;
    documentLines: number;
    count: number;
    IsWORD: boolean;
    IsMove: boolean;

    beforeCharacterGroup: CharGroup;

    editor: IEditor;

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

    getNextCharacter(): NextCharacter {
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

    doAtFirst(): State {
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

    doAtFirstCharacter(): State {
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

    doAtCharacter(): State {
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

    doAtSpaceOrLinefeed(): State {
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

    decreaseCount(): State {
        this.count--;
        if (this.count === 0) {
            return State.finalWord;
        }
        return State.character;
    }

    doAtFinalWord(): State {
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

    doAtStoppedPos(): State {
        if (this.IsMove) {
            return State.moveToPreviousCharacter;
        }
        return State.deleteUntilJustBefore;
    }

    moveToPreviousCharacter() {
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
