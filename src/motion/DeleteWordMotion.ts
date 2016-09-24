import {AbstractMotion} from "./AbstractMotion";
import * as Utils from "../Utils";
import {Position} from "../VimStyle";

// please see wordMotionStateModel/deleteWord.png
export class DeleteWordMotion extends AbstractMotion {

    public IsWORD: boolean;

    constructor() {
        super();
    };

    public CalculateEnd(editor: IEditor, vim: IVimStyle, start: IPosition): IPosition {
        let cal = new Calculater(start, this.Count, this.IsWORD, editor);
        return cal.CalculateEnd();
    }
}

enum State {
    first = 1,
    firstWhenCountGreaterThan1,
    character,
    space,
    linefeed,
    decreaseCount,
    decreaseCountAtLinefeed,
    characterWhenCountEq1,
    firstWhenCountEq1,
    spaceWhenCountEq1,
    deleteUntilLinefeed,
    deleteUntilJustBefore,
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

    beforeCharacterGroup: CharGroup;

    editor: IEditor;

    constructor(start: IPosition, count: number, isWord: boolean, editor: IEditor) {
        this.pos = start.Copy();
        this.pos.Char--;
        this.line = editor.ReadLine(start.Line);
        this.editor = editor;
        this.documentLines = editor.GetLastLineNum();
        this.count = count;
        this.beforeCharacterGroup = null;
        this.IsWORD = isWord;
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
        if (this.count === 1) {
            return State.firstWhenCountEq1;
        }
        return State.firstWhenCountGreaterThan1;
    };

    doAtFirstWhenCountGreaterThan1(): State {
        let nextCharacterGroup: NextCharacter = this.getNextCharacter();
        if (nextCharacterGroup === null) {
            return State.reachDocumentEnd;
        }
        switch (nextCharacterGroup) {
            case NextCharacter.character:
                return State.character;
            case NextCharacter.lineFeed:
                return State.linefeed;
            case NextCharacter.space:
                return State.space;
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
                return State.linefeed;
            case NextCharacter.space:
                return State.space;
        }
    }

    doAtLinefeed(): State {
        let nextCharacterGroup: NextCharacter = this.getNextCharacter();
        if (nextCharacterGroup === null) {
            return State.reachDocumentEnd;
        }
        switch (nextCharacterGroup) {
            case NextCharacter.character:
                return State.decreaseCountAtLinefeed;
            case NextCharacter.lineFeed:
                return State.linefeed;
            case NextCharacter.space:
                return State.space;
        }
    }

    doAtSpace(): State {
        let nextCharacterGroup: NextCharacter = this.getNextCharacter();
        if (nextCharacterGroup === null) {
            return State.reachDocumentEnd;
        }
        switch (nextCharacterGroup) {
            case NextCharacter.character:
                return State.decreaseCount;
            case NextCharacter.lineFeed:
                return State.linefeed;
            case NextCharacter.space:
                return State.space;
        }
    }

    decreaseCount(): State {
        this.count--;
        if (this.count === 1) {
            return State.characterWhenCountEq1;
        }
        return State.character;
    }

    decreaseCountAtLinefeed(): State {
        this.count--;
        if (this.count === 1) {
            return State.firstWhenCountEq1;
        }
        return State.linefeed;
    }

    doAtFirstWhenCountEq1(): State {
        let nextCharacterGroup: NextCharacter = this.getNextCharacter();
        if (nextCharacterGroup === null) {
            return State.reachDocumentEnd;
        }
        switch (nextCharacterGroup) {
            case NextCharacter.character:
                return State.characterWhenCountEq1;
            case NextCharacter.lineFeed:
                return State.deleteUntilLinefeed;
            case NextCharacter.space:
                return State.spaceWhenCountEq1;
        }
    }

    doAtCharacterWhenCountEq1(): State {
        let nextCharacterGroup: NextCharacter = this.getNextCharacter();
        if (nextCharacterGroup === null) {
            return State.reachDocumentEnd;
        }
        switch (nextCharacterGroup) {
            case NextCharacter.differenceTypeCharacter:
            case NextCharacter.lineFeed:
                return State.deleteUntilJustBefore;
            case NextCharacter.sameTypeCharacter:
                return State.characterWhenCountEq1;
            case NextCharacter.space:
                return State.spaceWhenCountEq1;
        }
    }

    doAtSpaceWhenCountEq1(): State {
        let nextCharacterGroup: NextCharacter = this.getNextCharacter();
        if (nextCharacterGroup === null) {
            return State.reachDocumentEnd;
        }
        switch (nextCharacterGroup) {
            case NextCharacter.character:
            case NextCharacter.lineFeed:
                return State.deleteUntilJustBefore;
            case NextCharacter.space:
                return State.spaceWhenCountEq1;
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
                case State.firstWhenCountGreaterThan1:
                    state = this.doAtFirstWhenCountGreaterThan1();
                    break;
                case State.character:
                    state = this.doAtCharacter();
                    break;
                case State.linefeed:
                    state = this.doAtLinefeed();
                    break;
                case State.space:
                    state = this.doAtSpace();
                    break;
                case State.decreaseCount:
                    state = this.decreaseCount();
                    break;
                case State.decreaseCountAtLinefeed:
                    state = this.decreaseCountAtLinefeed();
                    break;
                case State.firstWhenCountEq1:
                    state = this.doAtFirstWhenCountEq1();
                    break;
                case State.characterWhenCountEq1:
                    state = this.doAtCharacterWhenCountEq1();
                    break;
                case State.spaceWhenCountEq1:
                    state = this.doAtSpaceWhenCountEq1();
                    break;
                case State.deleteUntilJustBefore:
                case State.deleteUntilLinefeed:
                    whileContinue = false;
                    break;
            }
        }
        return this.pos;
    }
}
