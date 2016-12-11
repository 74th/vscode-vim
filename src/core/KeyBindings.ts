class KeyBindings implements IKeyBindings {
    AtStart: { [key: string]: IVimStyleCommand };
    FirstNum: { [key: string]: IVimStyleCommand };
    RequireMotion: { [key: string]: IVimStyleCommand };
    RequireMotionNum: { [key: string]: IVimStyleCommand };
    RequireBrancketForLeftBrancket: { [key: string]: IVimStyleCommand };
    RequireBrancketForRightBrancket: { [key: string]: IVimStyleCommand };
    RequireBrancketForLeftBrancketMotion: { [key: string]: IVimStyleCommand };
    RequireBrancketForRightBrancketMotion: { [key: string]: IVimStyleCommand };
    SmallG: { [key: string]: IVimStyleCommand };
    SmallGForMotion: { [key: string]: IVimStyleCommand };
    VisualMode: { [key: string]: IVimStyleCommand };
    VisualLineMode: { [key: string]: IVimStyleCommand };
}

function applyKeyBindingsByEachState(dest: { [key: string]: IVimStyleCommand }, src: { [key: string]: IVimStyleCommand }) {
    let key: string;
    for (key in src) {
        dest[key] = src[key];
    }
}
export function ApplyKeyBindings(dest: IKeyBindings, src: IKeyBindings) {
    if (dest.AtStart) {
        applyKeyBindingsByEachState(dest.AtStart, src.AtStart);
    }
    if (dest.FirstNum) {
        applyKeyBindingsByEachState(dest.FirstNum, src.FirstNum);
    }
    if (dest.RequireMotion) {
        applyKeyBindingsByEachState(dest.RequireMotion, src.RequireMotion);
    }
    if (dest.RequireMotionNum) {
        applyKeyBindingsByEachState(dest.RequireMotionNum, src.RequireMotionNum);
    }
    if (dest.RequireBrancketForLeftBrancket) {
        applyKeyBindingsByEachState(dest.RequireBrancketForLeftBrancket, src.RequireBrancketForLeftBrancket);
    }
    if (dest.RequireBrancketForRightBrancket) {
        applyKeyBindingsByEachState(dest.RequireBrancketForRightBrancket, src.RequireBrancketForRightBrancket);
    }
    if (dest.RequireBrancketForLeftBrancketMotion) {
        applyKeyBindingsByEachState(dest.RequireBrancketForLeftBrancketMotion, src.RequireBrancketForLeftBrancketMotion);
    }
    if (dest.RequireBrancketForRightBrancketMotion) {
        applyKeyBindingsByEachState(dest.RequireBrancketForRightBrancketMotion, src.RequireBrancketForRightBrancketMotion);
    }
    if (dest.SmallG) {
        applyKeyBindingsByEachState(dest.SmallG, src.SmallG);
    }
    if (dest.SmallGForMotion) {
        applyKeyBindingsByEachState(dest.SmallGForMotion, src.SmallGForMotion);
    }
    if (dest.VisualMode) {
        applyKeyBindingsByEachState(dest.VisualMode, src.VisualMode);
    }
    if (dest.VisualLineMode) {
        applyKeyBindingsByEachState(dest.VisualLineMode, src.VisualLineMode);
    }
}

const DefaultKeyBindings: IKeyBindings = {
    AtStart: {
        "a": {
            cmd: VimCommand.appendTextAfterCursor
        },
        "A": {
            cmd: VimCommand.appendTextAtEndOfLine
        },
        "b": {
            cmd: VimCommand.gotoWordBackword
        },
        "B": {
            cmd: VimCommand.gotoBlankSeparatedBackword
        },
        "c": {
            cmd: VimCommand.changeTextWithMotion,
            state: StateName.RequireMotion
        },
        "C": {
            cmd: VimCommand.changeTextToEndOfLine
        },
        "d": {
            cmd: VimCommand.deleteTextWithMotion,
            state: StateName.RequireMotion
        },
        "D": {
            cmd: VimCommand.deleteTextToEndOfLine
        },
        "e": {
            cmd: VimCommand.gotoForwardToEndOfWold
        },
        "E": {
            cmd: VimCommand.gotoForwardToEndOfBlankSeparated
        },
        "f": {
            cmd: VimCommand.gotoCharacterToRight,
            state: StateName.RequireCharForMotion
        },
        "F": {
            cmd: VimCommand.gotoCharacterToLeft,
            state: StateName.RequireCharForMotion
        },
        "g": {
            cmd: VimCommand.nothing,
            state: StateName.SmallG
        },
        "G": {
            cmd: VimCommand.gotoLastLine,
        },
        "h": {
            cmd: VimCommand.gotoLeft
        },
        // H no function
        "i": {
            cmd: VimCommand.insertTextBeforeCursor
        },
        "I": {
            cmd: VimCommand.insertTextBeforeFirstNonBlankInLine
        },
        "j": {
            cmd: VimCommand.goDown
        },
        // J
        "k": {
            cmd: VimCommand.goUp
        },
        // K no function
        "l": {
            cmd: VimCommand.gotoRight
        },
        // L no function
        "o": {
            cmd: VimCommand.openNewLineBelowCurrentLineAndAppnedText
        },
        "O": {
            cmd: VimCommand.openNewLineAboveCurrentLineAndAppnedText
        },
        "p": {
            cmd: VimCommand.putRegisterAfterCursorPosition
        },
        "P": {
            cmd: VimCommand.putRegisterBeforeCursorPosition
        },
        // q low priority
        // Q never support
        "r": {
            cmd: VimCommand.replaceCharacter,
            state: StateName.RequireCharForAction
        },
        // R low priority
        "s": {
            cmd: VimCommand.changeCharacters
        },
        "S": {
            cmd: VimCommand.changeLines
        },
        "t": {
            cmd: VimCommand.goTillBeforeCharacterToRight,
            state: StateName.RequireCharForMotion
        },
        "T": {
            cmd: VimCommand.goTillBeforeCharacterToLeft,
            state: StateName.RequireCharForMotion
        },
        // u low priority
        // U low priority
        "v": {
            cmd: VimCommand.startVisualMode
        },
        "V": {
            cmd: VimCommand.startVisualLineMode
        },
        "w": {
            cmd: VimCommand.gotoWordFoward
        },
        "W": {
            cmd: VimCommand.gotoBlankSeparated
        },
        "x": {
            cmd: VimCommand.deleteCharactersUnderCursor
        },
        "X": {
            cmd: VimCommand.deleteCharactersBeforeCursor
        },
        "y": {
            cmd: VimCommand.yankTextWithMotion,
            state: StateName.RequireMotion
        },
        "Y": {
            cmd: VimCommand.yankLine
        },
        // z never suppoer
        // Z no function
        "0": {
            cmd: VimCommand.gotoFirstCharacterInLine
        },
        "1": {
            cmd: VimCommand.stackNumber,
            state: StateName.FirstNum
        },
        "2": {
            cmd: VimCommand.stackNumber,
            state: StateName.FirstNum
        },
        "3": {
            cmd: VimCommand.stackNumber,
            state: StateName.FirstNum
        },
        "4": {
            cmd: VimCommand.stackNumber,
            state: StateName.FirstNum
        },
        "5": {
            cmd: VimCommand.stackNumber,
            state: StateName.FirstNum
        },
        "6": {
            cmd: VimCommand.stackNumber,
            state: StateName.FirstNum
        },
        "7": {
            cmd: VimCommand.stackNumber,
            state: StateName.FirstNum
        },
        "8": {
            cmd: VimCommand.stackNumber,
            state: StateName.FirstNum
        },
        "9": {
            cmd: VimCommand.stackNumber,
            state: StateName.FirstNum
        },
        "$": {
            cmd: VimCommand.gotoLastCharacterInLine
        },
        ".": {
            cmd: VimCommand.repeatLastChange
        },
        ",": {
            cmd: VimCommand.gotoRepeatCharacterOppositeDirection
        },
        ";": {
            cmd: VimCommand.gotoRepeatCharacter
        },
        "^": {
            cmd: VimCommand.gotoFirstNonBlankCharacterInLine
        },
        "[": {
            cmd: VimCommand.nothing,
            state: StateName.RequireBrancketForLeftBrancket
        },
        "]": {
            cmd: VimCommand.nothing,
            state: StateName.RequireBrancketForRightBrancket
        },
        "{": {
            cmd: VimCommand.gotoParagraphBackword
        },
        "}": {
            cmd: VimCommand.gotoParagraphFoword
        }
    },

    // Nx
    FirstNum: {
        // Na low priority
        // NA low priority
        "b": {
            cmd: VimCommand.gotoWordBackword
        },
        "B": {
            cmd: VimCommand.gotoBlankSeparatedBackword
        },
        // B
        // Nc low priority
        // NC low priority
        "d": {
            cmd: VimCommand.deleteTextWithMotion,
            state: StateName.RequireMotion
        },
        // ND low priority
        "e": {
            cmd: VimCommand.gotoForwardToEndOfWold
        },
        "E": {
            cmd: VimCommand.gotoForwardToEndOfBlankSeparated
        },
        "f": {
            cmd: VimCommand.gotoCharacterToRight,
            state: StateName.RequireCharForMotion
        },
        "F": {
            cmd: VimCommand.gotoCharacterToLeft,
            state: StateName.RequireCharForMotion
        },
        "g": {
            cmd: VimCommand.nothing,
            state: StateName.SmallG
        },
        "G": {
            cmd: VimCommand.gotoLine
        },
        "h": {
            cmd: VimCommand.gotoLeft
        },
        // NH no function
        // Ni low priority
        // NI low priority
        "j": {
            cmd: VimCommand.goDown
        },
        // NJ
        "k": {
            cmd: VimCommand.goUp
        },
        // K no function
        "l": {
            cmd: VimCommand.gotoRight
        },
        // L no function
        // No low priority
        // NO low priority
        // Np low priority
        // NP low priotity
        // Nq low priority
        // NQ never support
        "r": {
            cmd: VimCommand.replaceCharacter,
            state: StateName.RequireCharForAction
        },
        // NR low priority
        // Ns low priority
        // NS low priority
        "t": {
            cmd: VimCommand.goTillBeforeCharacterToRight,
            state: StateName.RequireCharForMotion
        },
        "T": {
            cmd: VimCommand.goTillBeforeCharacterToLeft,
            state: StateName.RequireCharForMotion
        },
        // u low priority
        // U low priority
        // Nv?
        // NV?
        "w": {
            cmd: VimCommand.gotoWordFoward
        },
        "W": {
            cmd: VimCommand.gotoBlankSeparated
        },
        "x": {
            cmd: VimCommand.deleteCharactersUnderCursor
        },
        "X": {
            cmd: VimCommand.deleteCharactersBeforeCursor
        },
        "y": {
            cmd: VimCommand.yankTextWithMotion,
            state: StateName.RequireMotion
        },
        "Y": {
            cmd: VimCommand.yankLine
        },
        // Nz never support
        // NZ no function
        "0": {
            cmd: VimCommand.stackNumber,
            state: StateName.FirstNum
        },
        "1": {
            cmd: VimCommand.stackNumber,
            state: StateName.FirstNum
        },
        "2": {
            cmd: VimCommand.stackNumber,
            state: StateName.FirstNum
        },
        "3": {
            cmd: VimCommand.stackNumber,
            state: StateName.FirstNum
        },
        "4": {
            cmd: VimCommand.stackNumber,
            state: StateName.FirstNum
        },
        "5": {
            cmd: VimCommand.stackNumber,
            state: StateName.FirstNum
        },
        "6": {
            cmd: VimCommand.stackNumber,
            state: StateName.FirstNum
        },
        "7": {
            cmd: VimCommand.stackNumber,
            state: StateName.FirstNum
        },
        "8": {
            cmd: VimCommand.stackNumber,
            state: StateName.FirstNum
        },
        "9": {
            cmd: VimCommand.stackNumber,
            state: StateName.FirstNum
        },
        // $ ?
        ",": {
            cmd: VimCommand.gotoRepeatCharacterOppositeDirection
        },
        ";": {
            cmd: VimCommand.gotoRepeatCharacter
        },
        "{": {
            cmd: VimCommand.gotoParagraphBackword
        },
        "}": {
            cmd: VimCommand.gotoParagraphFoword
        },
        "[": {
            cmd: VimCommand.nothing,
            state: StateName.RequireBrancketForLeftBrancket
        },
        "]": {
            cmd: VimCommand.nothing,
            state: StateName.RequireBrancketForRightBrancket
        },
    },

    // cm
    RequireMotion: {
        // da
        // dA
        "b": {
            cmd: VimCommand.wordBackwardMotion
        },
        "B": {
            cmd: VimCommand.blankSeparatedBackwordMotion
        },
        "c": {
            cmd: VimCommand.doActionAtCurrentLine
        },
        // C no command
        "d": {
            cmd: VimCommand.doActionAtCurrentLine
        },
        // D no command
        "e": {
            cmd: VimCommand.endOfWordMotion
        },
        "E": {
            cmd: VimCommand.endOfBlankSeparatedMotion
        },
        "f": {
            cmd: VimCommand.characterToRightMotion,
            state: StateName.RequireCharForMotion
        },
        "F": {
            cmd: VimCommand.characterToLeftMotion,
            state: StateName.RequireCharForMotion
        },
        "g": {
            cmd: VimCommand.nothing,
            state: StateName.SmallGForMotion
        },
        "G": {
            cmd: VimCommand.lastLineMotion,
        },
        "h": {
            cmd: VimCommand.leftMotion
        },
        // H no function
        // i
        // I
        "j": {
            cmd: VimCommand.downMotion
        },
        // J
        "k": {
            cmd: VimCommand.upMotion
        },
        // K no function
        "l": {
            cmd: VimCommand.rightMotion
        },
        // L no function
        // o never support
        // O no function
        // p never support
        // P no function
        // q no function
        // Q no function
        // r no function
        // R low priority
        // s ?
        // S ?
        "t": {
            cmd: VimCommand.tillBeforeCharToRightMotion,
            state: StateName.RequireCharForMotion
        },
        "T": {
            cmd: VimCommand.tillBeforeCharToLeftMotion,
            state: StateName.RequireCharForMotion
        },
        // u low priority
        // U low priority
        // v low priority
        // V low priority
        "w": {
            cmd: VimCommand.wordForwardMotion
        },
        "W": {
            cmd: VimCommand.blankSeparatedMotion
        },
        // x no function
        // X no function
        "y": {
            cmd: VimCommand.doActionAtCurrentLine
        },
        "Y": {
            cmd: VimCommand.yankLine
        },
        // z never suppoer
        // Z no function
        "0": {
            cmd: VimCommand.firstCharacterInLineMotion
        },
        "1": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "2": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "3": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "4": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "5": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "6": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "7": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "8": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "9": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "$": {
            cmd: VimCommand.lastCharacterInLineMotion
        },
        ",": {
            cmd: VimCommand.repeartCharacterMotionOppositeDirection
        },
        ";": {
            cmd: VimCommand.repeartCharacterMotion
        },
        "^": {
            cmd: VimCommand.firstNonBlankCharacterInLineMotion
        },
        "{": {
            cmd: VimCommand.paragraphBackwordMotion
        },
        "}": {
            cmd: VimCommand.paragraphFowordMotion
        },
        "[": {
            cmd: VimCommand.nothing,
            state: StateName.RequireBrancketForLeftBrancketMotion
        },
        "]": {
            cmd: VimCommand.nothing,
            state: StateName.RequireBrancketForRightBrancketMotion
        },
    },

    // cNm
    RequireMotionNum: {
        // da
        // dA
        "b": {
            cmd: VimCommand.wordBackwardMotion
        },
        "B": {
            cmd: VimCommand.blankSeparatedBackwordMotion
        },
        "c": {
            cmd: VimCommand.doActionAtCurrentLine
        },
        // C no command
        "d": {
            cmd: VimCommand.doActionAtCurrentLine
        },
        // D no command
        // e
        // E
        "f": {
            cmd: VimCommand.characterToRightMotion,
            state: StateName.RequireCharForMotion
        },
        "F": {
            cmd: VimCommand.characterToLeftMotion,
            state: StateName.RequireCharForMotion
        },
        // g
        "G": {
            cmd: VimCommand.lineMotion
        },
        "h": {
            cmd: VimCommand.leftMotion
        },
        // H no function
        // i
        // I
        "j": {
            cmd: VimCommand.downMotion
        },
        // J
        "k": {
            cmd: VimCommand.upMotion
        },
        // K no function
        "l": {
            cmd: VimCommand.rightMotion
        },
        // L no function
        // o never support
        // O no function
        // p never support
        // P no function
        // q no function
        // Q no function
        // r no function
        // R low priority
        // s ?
        // S ?
        "t": {
            cmd: VimCommand.characterToRightMotion,
            state: StateName.RequireCharForMotion
        },
        "T": {
            cmd: VimCommand.tillBeforeCharToLeftMotion,
            state: StateName.RequireCharForMotion
        },
        // u low priority
        // U low priority
        // v low priority
        // V low priority
        "w": {
            cmd: VimCommand.wordForwardMotion
        },
        // W
        // x no function
        // X no function
        "y": {
            cmd: VimCommand.doActionAtCurrentLine
        },
        // Y ?
        // z never suppoer
        // Z no function
        "0": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "1": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "2": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "3": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "4": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "5": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "6": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "7": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "8": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "9": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        ",": {
            cmd: VimCommand.repeartCharacterMotionOppositeDirection
        },
        ";": {
            cmd: VimCommand.repeartCharacterMotion
        },
        "{": {
            cmd: VimCommand.paragraphBackwordMotion
        },
        "}": {
            cmd: VimCommand.paragraphFowordMotion
        },
        "[": {
            cmd: VimCommand.nothing,
            state: StateName.RequireBrancketForLeftBrancketMotion
        },
        "]": {
            cmd: VimCommand.nothing,
            state: StateName.RequireBrancketForRightBrancketMotion
        },
        // $?
    },

    RequireBrancketForLeftBrancket: {
        // [(
        "(": {
            cmd: VimCommand.goBackToUnclosedLeftParenthesis
        },
        // [{
        "{": {
            cmd: VimCommand.goBackToUnclosedLeftCurlyBracket
        },
    },

    RequireBrancketForLeftBrancketMotion: {
        // c[(
        "(": {
            cmd: VimCommand.backToUnclosedLeftParenthesisMotion
        },
        // c[{
        "{": {
            cmd: VimCommand.backToUnclosedLeftCurlyBracketMotion
        },
    },

    RequireBrancketForRightBrancket: {
        // ])
        ")": {
            cmd: VimCommand.goToUnclosedRightParenthesis
        },
        // ]}
        "}": {
            cmd: VimCommand.goToUnclosedRightCurlyBracket
        },
    },

    RequireBrancketForRightBrancketMotion: {
        // c])
        ")": {
            cmd: VimCommand.toUnclosedRightParenthesisMotion
        },
        // c]}
        "}": {
            cmd: VimCommand.toUnclosedRightCurlyBracketMotion
        },
    },

    // g
    SmallG: {
        "g": {
            cmd: VimCommand.gotoFirstLineOnFirstNonBlankCharacter
        },
        "r": {
            cmd: VimCommand.replaceCharacterWithoutAffectingLayout,
            state: StateName.RequireCharForAction
        }
    },

    // cg
    SmallGForMotion: {
        "g": {
            cmd: VimCommand.firstLineMotion
        }
    },

    // v
    VisualMode: {
        // v..a
        // v..A
        "b": {
            cmd: VimCommand.wordBackwardMotion
        },
        "B": {
            cmd: VimCommand.blankSeparatedBackwordMotion
        },
        "c": {
            cmd: VimCommand.changeHighlightedText
        },
        // C no command
        "d": {
            cmd: VimCommand.deleteHighlightedText
        },
        // D no command
        // v..e
        // V..E
        "f": {
            cmd: VimCommand.characterToRightMotion,
            state: StateName.RequireCharForMotion
        },
        "F": {
            cmd: VimCommand.characterToLeftMotion,
            state: StateName.RequireCharForMotion
        },
        "g": {
            cmd: VimCommand.nothing,
            state: StateName.SmallGForMotion
        },
        "G": {
            cmd: VimCommand.lastLineMotion,
        },
        "h": {
            cmd: VimCommand.leftMotion
        },
        // H no function
        // v..i
        // v..I
        "j": {
            cmd: VimCommand.downMotion
        },
        // J?
        "k": {
            cmd: VimCommand.upMotion
        },
        // K no function
        "l": {
            cmd: VimCommand.rightMotion
        },
        // l no function
        // o never support
        // O no function
        // p never support
        // P no function
        // q no function
        // Q no function
        "r": {
            cmd: VimCommand.replaceCharacterOfSelectedText,
            state: StateName.RequireCharForAction
        },
        // R low priority
        // s ?
        // S ?
        "t": {
            cmd: VimCommand.tillBeforeCharToRightMotion,
            state: StateName.RequireCharForMotion
        },
        "T": {
            cmd: VimCommand.tillBeforeCharToLeftMotion,
            state: StateName.RequireCharForMotion
        },
        // u low priority
        // U low priority
        // v low priority
        // V low priority
        "w": {
            cmd: VimCommand.wordForwardMotion
        },
        // W
        // x no function
        // X no function
        "y": {
            cmd: VimCommand.yankHighlightedText
        },
        "0": {
            cmd: VimCommand.firstCharacterInLineMotion
        },
        "1": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "2": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "3": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "4": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "5": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "6": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "7": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "8": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "9": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "$": {
            cmd: VimCommand.lastCharacterInLineMotion
        },
        ",": {
            cmd: VimCommand.repeartCharacterMotionOppositeDirection
        },
        ";": {
            cmd: VimCommand.repeartCharacterMotion
        },
        "{": {
            cmd: VimCommand.gotoParagraphBackword
        },
        "}": {
            cmd: VimCommand.gotoParagraphFoword
        },
        "[": {
            cmd: VimCommand.nothing,
            state: StateName.RequireBrancketForLeftBrancket
        },
        "]": {
            cmd: VimCommand.nothing,
            state: StateName.RequireBrancketForRightBrancket
        },
    },

    // V
    VisualLineMode: {
        // V..a
        // V..A
        "b": {
            cmd: VimCommand.wordBackwardMotion
        },
        "B": {
            cmd: VimCommand.blankSeparatedBackwordMotion
        },
        "c": {
            cmd: VimCommand.changeHighligtedLine
        },
        // V..C no command
        "d": {
            cmd: VimCommand.deleteHighlightedLine
        },
        // V..D no command
        // V..e
        // V..E
        // V..f
        // V..F
        "g": {
            cmd: VimCommand.nothing,
            state: StateName.SmallGForMotion
        },
        "G": {
            cmd: VimCommand.lastLineMotion,
        },
        // V..h
        // V..H no function
        // V..i
        // V..I
        "j": {
            cmd: VimCommand.downMotion
        },
        // V..J?
        "k": {
            cmd: VimCommand.upMotion
        },
        // V..K no function
        // V..l
        // V..L no function
        // V..o never support
        // V..O no function
        // V..p never support
        // V..P no function
        // V..q no function
        // V..Q no function
        // V..r no function
        // V..R low priority
        // V..s ?
        // V..S ?
        // V..t ?
        // V..T ?
        // u low priority
        // U low priority
        // V..v low priority
        // V..V back to normal mode
        // V..w
        // v..W
        // x no function
        // X no function
        "y": {
            cmd: VimCommand.yankHighlightedLine
        },
        "0": {
            cmd: VimCommand.firstCharacterInLineMotion
        },
        "1": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "2": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "3": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "4": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "5": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "6": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "7": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "8": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "9": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        // V..$
        "{": {
            cmd: VimCommand.gotoParagraphBackword
        },
        "}": {
            cmd: VimCommand.gotoParagraphFoword
        },
        "[": {
            cmd: VimCommand.nothing,
            state: StateName.RequireBrancketForLeftBrancket
        },
        "]": {
            cmd: VimCommand.nothing,
            state: StateName.RequireBrancketForRightBrancket
        },
    },
};

// move a cursur by jkl; keys
const ErgonomicKeyBindings: IKeyBindings = {
    AtStart: {
        "j": DefaultKeyBindings.AtStart["h"],
        "k": DefaultKeyBindings.AtStart["j"],
        "l": DefaultKeyBindings.AtStart["k"],
        ";": DefaultKeyBindings.AtStart["l"]
    },
    RequireMotion: {
        "j": DefaultKeyBindings.RequireMotion["h"],
        "k": DefaultKeyBindings.RequireMotion["j"],
        "l": DefaultKeyBindings.RequireMotion["k"],
        ";": DefaultKeyBindings.RequireMotion["l"]
    },
    VisualMode: {
        "j": DefaultKeyBindings.VisualMode["h"],
        "k": DefaultKeyBindings.VisualMode["j"],
        "l": DefaultKeyBindings.VisualMode["k"],
        ";": DefaultKeyBindings.VisualMode["l"]
    },
    VisualLineMode: {
        "j": DefaultKeyBindings.VisualMode["h"],
        "k": DefaultKeyBindings.VisualMode["j"],
        "l": DefaultKeyBindings.VisualMode["k"],
        ";": DefaultKeyBindings.VisualMode["l"]
    },
};

export function LoadKeyBindings(opts: IVimStyleOptions): IKeyBindings {
    let bindings: IKeyBindings = {
        AtStart: {},
        FirstNum: {},
        RequireMotion: {},
        RequireMotionNum: {},
        RequireBrancketForLeftBrancket: {},
        RequireBrancketForLeftBrancketMotion: {},
        RequireBrancketForRightBrancket: {},
        RequireBrancketForRightBrancketMotion: {},
        SmallG: {},
        SmallGForMotion: {},
        VisualMode: {},
        VisualLineMode: {}
    };
    let key: string;
    ApplyKeyBindings(bindings, DefaultKeyBindings);
    if (opts.useErgonomicKeyForMotion) {
        ApplyKeyBindings(bindings, ErgonomicKeyBindings);
    }
    if (opts.editorKeyBindings) {
        ApplyKeyBindings(bindings, opts.editorKeyBindings);
    }
    return bindings;
}
