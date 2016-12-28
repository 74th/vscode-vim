import * as RightMotion from "../motion/RightMotion";
import * as FirstCharacterInLineMotion from "../motion/FirstCharacterInLineMotion";
import * as FirstCharacterMotion from "../motion/FirstCharacterMotion";
import * as LastCharacterInLineMotion from "../motion/LastCharacterInLineMotion";
import * as FindCharacterMotion from "../motion/FindCharacterMotion";
import * as DownMotion from "../motion/DownMotion";
import * as MoveWordMotion from "../motion/MoveWordMotion";
import * as ChangeWordMotion from "../motion/ChangeWordMotion";

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
            CreateAction: FindCharacterMotion.GotoCharacterToRight,
            state: StateName.RequireCharForMotion
        },
        "F": {
            CreateAction: FindCharacterMotion.GotoCharacterToLeft,
            state: StateName.RequireCharForMotion
        },
        "g": {
            cmd: VimCommand.nothing,
            state: StateName.SmallG
        },
        "G": {
            CreateAction: FirstCharacterMotion.GotoLastLine
        },
        "h": {
            CreateAction: RightMotion.GotoLeft
        },
        // H no function
        "i": {
            cmd: VimCommand.insertTextBeforeCursor
        },
        "I": {
            cmd: VimCommand.insertTextBeforeFirstNonBlankInLine
        },
        "j": {
            CreateAction: DownMotion.GoDown
        },
        // J
        "k": {
            CreateAction: DownMotion.GoUp
        },
        // K no function
        "l": {
            CreateAction: RightMotion.GotoRight
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
            CreateAction: FindCharacterMotion.GoTillBeforeCharacterToRight,
            state: StateName.RequireCharForMotion
        },
        "T": {
            CreateAction: FindCharacterMotion.GoTillBeforeCharacterToLeft,
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
            CreateAction: MoveWordMotion.GotoWordFoword
        },
        "W": {
            CreateAction: MoveWordMotion.GotoBlankSeparated
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
            CreateAction: FirstCharacterInLineMotion.GotoFirstCharacterInLine
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
            CreateAction: LastCharacterInLineMotion.GotoLastCharacterInLine
        },
        ".": {
            cmd: VimCommand.repeatLastChange
        },
        ",": {
            CreateAction: FindCharacterMotion.GotoRepeatCharacterOppositeDirection,
        },
        ";": {
            CreateAction: FindCharacterMotion.GotoRepeatCharacter
        },
        "^": {
            CreateAction: FirstCharacterMotion.GotoFirstNonBlankCharacterInLine
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
            CreateAction: FindCharacterMotion.GotoCharacterToRight,
            state: StateName.RequireCharForMotion
        },
        "F": {
            CreateAction: FindCharacterMotion.GotoCharacterToLeft,
            state: StateName.RequireCharForMotion
        },
        "g": {
            cmd: VimCommand.nothing,
            state: StateName.SmallG
        },
        "G": {
            CreateAction: FirstCharacterMotion.GotoLine
        },
        "h": {
            CreateAction: RightMotion.GotoLeft
        },
        // NH no function
        // Ni low priority
        // NI low priority
        "j": {
            CreateAction: DownMotion.GoDown
        },
        // NJ
        "k": {
            CreateAction: DownMotion.GoUp
        },
        // K no function
        "l": {
            CreateAction: RightMotion.GotoRight
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
            CreateAction: FindCharacterMotion.GoTillBeforeCharacterToRight,
            state: StateName.RequireCharForMotion
        },
        "T": {
            CreateAction: FindCharacterMotion.GoTillBeforeCharacterToLeft,
            state: StateName.RequireCharForMotion
        },
        // u low priority
        // U low priority
        // Nv?
        // NV?
        "w": {
            CreateAction: MoveWordMotion.GotoWordFoword
        },
        "W": {
            CreateAction: MoveWordMotion.GotoBlankSeparated
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
            CreateAction: FindCharacterMotion.GotoRepeatCharacterOppositeDirection
        },
        ";": {
            CreateAction: FindCharacterMotion.GotoRepeatCharacter
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
            AddMotion: FindCharacterMotion.AddCharacterToRightMotion,
            state: StateName.RequireCharForMotion
        },
        "F": {
            AddMotion: FindCharacterMotion.AddCharacterToLeftMotion,
            state: StateName.RequireCharForMotion
        },
        "g": {
            cmd: VimCommand.nothing,
            state: StateName.SmallGForMotion
        },
        "G": {
            AddMotion: FirstCharacterMotion.AddLastLineMotion
        },
        "h": {
            AddMotion: RightMotion.AddLeftMotion
        },
        // H no function
        // i
        // I
        "j": {
            AddMotion: DownMotion.AddDownMotion
        },
        // J
        "k": {
            AddMotion: DownMotion.AddUpMotion
        },
        // K no function
        "l": {
            AddMotion: RightMotion.AddRightMotion
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
            AddMotion: FindCharacterMotion.AddTillCharacterToRightMotion,
            state: StateName.RequireCharForMotion
        },
        "T": {
            AddMotion: FindCharacterMotion.AddTillCharacterToLeftMotion,
            state: StateName.RequireCharForMotion
        },
        // u low priority
        // U low priority
        // v low priority
        // V low priority
        "w": {
            AddMotion: ChangeWordMotion.AddWordForwordMotion
        },
        "W": {
            AddMotion: ChangeWordMotion.AddBlankSparatedMotion
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
            AddMotion: FirstCharacterInLineMotion.AddFirstCharacterInLineMotion
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
            AddMotion: LastCharacterInLineMotion.AddLastCharacterInLineMotion
        },
        ",": {
            AddMotion: FindCharacterMotion.AddRepeartCharacterMotionOppositeDirection
        },
        ";": {
            AddMotion: FindCharacterMotion.AddRepeartCharacterMotion
        },
        "^": {
            AddMotion: FirstCharacterMotion.AddFirstNonBlankCharacterInLineMotion
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
            AddMotion: FindCharacterMotion.AddCharacterToRightMotion,
            state: StateName.RequireCharForMotion
        },
        "F": {
            AddMotion: FindCharacterMotion.AddCharacterToLeftMotion,
            state: StateName.RequireCharForMotion
        },
        // g
        "G": {
            AddMotion: FirstCharacterMotion.AddLineMotion
        },
        "h": {
            AddMotion: RightMotion.AddLeftMotion
        },
        // H no function
        // i
        // I
        "j": {
            AddMotion: DownMotion.AddDownMotion
        },
        // J
        "k": {
            AddMotion: DownMotion.AddUpMotion
        },
        // K no function
        "l": {
            AddMotion: RightMotion.AddRightMotion
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
            AddMotion: FindCharacterMotion.AddCharacterToRightMotion,
            state: StateName.RequireCharForMotion
        },
        "T": {
            AddMotion: FindCharacterMotion.AddTillCharacterToLeftMotion,
            state: StateName.RequireCharForMotion
        },
        // u low priority
        // U low priority
        // v low priority
        // V low priority
        "w": {
            AddMotion: ChangeWordMotion.AddWordForwordMotion
        },
        "W": {
            AddMotion: ChangeWordMotion.AddBlankSparatedMotion
        },
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
        "$": {
            AddMotion: LastCharacterInLineMotion.AddLastCharacterInLineMotion
        },
        ",": {
            AddMotion: FindCharacterMotion.AddRepeartCharacterMotionOppositeDirection
        },
        ";": {
            AddMotion: FindCharacterMotion.AddRepeartCharacterMotion
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
            CreateAction: FirstCharacterMotion.GotoFirstLineOnFirstNonBlankCharacter
        },
        "r": {
            cmd: VimCommand.replaceCharacterWithoutAffectingLayout,
            state: StateName.RequireCharForAction
        }
    },

    // cg
    SmallGForMotion: {
        "g": {
            AddMotion: FirstCharacterMotion.AddLineMotion
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
            AddMotion: FindCharacterMotion.AddCharacterToRightMotion,
            state: StateName.RequireCharForMotion
        },
        "F": {
            AddMotion: FindCharacterMotion.AddCharacterToLeftMotion,
            state: StateName.RequireCharForMotion
        },
        "g": {
            cmd: VimCommand.nothing,
            state: StateName.SmallGForMotion
        },
        "G": {
            AddMotion: FirstCharacterMotion.AddLastLineMotion
        },
        "h": {
            AddMotion: RightMotion.AddLeftMotion
        },
        // H no function
        // v..i
        // v..I
        "j": {
            AddMotion: DownMotion.AddDownMotion
        },
        // J?
        "k": {
            AddMotion: DownMotion.AddUpMotion
        },
        // K no function
        "l": {
            AddMotion: RightMotion.AddRightMotion
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
            AddMotion: FindCharacterMotion.AddTillCharacterToRightMotion,
            state: StateName.RequireCharForMotion
        },
        "T": {
            AddMotion: FindCharacterMotion.AddTillCharacterToLeftMotion,
            state: StateName.RequireCharForMotion
        },
        // u low priority
        // U low priority
        // v low priority
        // V low priority
        "w": {
            AddMotion: ChangeWordMotion.AddWordForwordMotion
        },
        "W": {
            AddMotion: ChangeWordMotion.AddBlankSparatedMotion
        },
        // x no function
        // X no function
        "y": {
            cmd: VimCommand.yankHighlightedText
        },
        "0": {
            AddMotion: FirstCharacterInLineMotion.AddFirstCharacterInLineMotion
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
            AddMotion: LastCharacterInLineMotion.AddLastCharacterInLineMotion
        },
        ",": {
            AddMotion: FindCharacterMotion.AddRepeartCharacterMotionOppositeDirection,
        },
        ";": {
            AddMotion: FindCharacterMotion.AddRepeartCharacterMotion
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
        "f": {
            AddMotion: FindCharacterMotion.AddCharacterToRightMotion,
            state: StateName.RequireCharForMotion
        },
        "F": {
            AddMotion: FindCharacterMotion.AddCharacterToLeftMotion,
            state: StateName.RequireCharForMotion
        },
        "g": {
            cmd: VimCommand.nothing,
            state: StateName.SmallGForMotion
        },
        "G": {
            AddMotion: FirstCharacterMotion.AddLastLineMotion
        },
        // V..h
        // V..H no function
        // V..i
        // V..I
        "j": {
            AddMotion: DownMotion.AddDownMotion
        },
        // V..J?
        "k": {
            AddMotion: DownMotion.AddUpMotion
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
        "t": {
            AddMotion: FindCharacterMotion.AddCharacterToRightMotion,
            state: StateName.RequireCharForMotion
        },
        "T": {
            AddMotion: FindCharacterMotion.AddTillCharacterToLeftMotion,
            state: StateName.RequireCharForMotion
        },
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
            AddMotion: FirstCharacterInLineMotion.AddFirstCharacterInLineMotion
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
            AddMotion: LastCharacterInLineMotion.AddLastCharacterInLineMotion
        },
        ",": {
            AddMotion: FindCharacterMotion.AddRepeartCharacterMotionOppositeDirection
        },
        ";": {
            AddMotion: FindCharacterMotion.AddRepeartCharacterMotion
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
