import {AbstractMotion} from "./AbstractMotion";
import * as Utils from "../Utils";
import {Position} from "../VimStyle";

// please see wordMotionStateModel/moveWord.png
export class MoveWordMotion extends AbstractMotion {

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
    character,
    space,
    linefeed,
    decreaseCount,
    decreaseCountAtLinefeed,
    moveTo,
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
    };

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
                return State.decreaseCount;
            case NextCharacter.lineFeed:
                return State.decreaseCountAtLinefeed;
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
        if (this.count === 0) {
            return State.moveTo;
        }
        return State.character;
    }

    decreaseCountAtLinefeed(): State {
        this.count--;
        if (this.count === 0) {
            return State.moveTo;
        }
        return State.linefeed;
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
                case State.moveTo:
                    whileContinue = false;
                    break;
            }
        }
        return this.pos;
    }
}