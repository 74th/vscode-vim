import * as DeleteYankChangeAction from "../action/DeleteYankChangeAction";
import * as DeleteYankChangeHighlightedLineAction from "../action/DeleteYankChangeHighlightedLineAction";
import * as DeleteYankChangeHighlightedTextAction from "../action/DeleteYankChangeHighlightedTextAction";
import * as InsertTextAction from "../action/InsertTextAction";
import * as JoinHighlightedLinesAction from "../action/JoinHighlightedLinesAction";
import * as JoinLinesAction from "../action/JoinLinesAction";
import * as OpenNewLineAndAppendTextAction from "../action/OpenNewLineAndAppendTextAction";
import * as PutRegisterAction from "../action/PutRegisterAction";
import * as RepeatLastChangeAction from "../action/RepeatLastChangeAction";
import * as ReplaceCharacterAction from "../action/ReplaceCharacterAction";
import * as ReplaceCharacterOfSelecetdTextAction from "../action/ReplaceCharacterOfSelecetdTextAction";
import * as StartVisualLineModeAction from "../action/StartVisualLineModeAction";
import * as StartVisualModeAction from "../action/StartVisualModeAction";
import * as BrancketMotion from "../motion/BrancketMotion";
import * as ChangeWordMotion from "../motion/ChangeWordMotion";
import * as DeleteEndOfWordMotion from "../motion/DeleteEndOfWordMotion";
import * as DownMotion from "../motion/DownMotion";
import * as FindCharacterMotion from "../motion/FindCharacterMotion";
import * as FirstCharacterInLineMotion from "../motion/FirstCharacterInLineMotion";
import * as FirstCharacterMotion from "../motion/FirstCharacterMotion";
import * as LastCharacterInLineMotion from "../motion/LastCharacterInLineMotion";
import * as MoveWordMotion from "../motion/MoveWordMotion";
import * as ParagraphMotion from "../motion/ParagraphMotion";
import * as RightMotion from "../motion/RightMotion";
import * as TextObjectSelectionBrancket from "../motion/textObjectSelection/Brancket";
import * as TextObjectQuotation from "../motion/textObjectSelection/Quotation";
import * as WordMotion from "../motion/WordMotion";

class KeyBindings implements IKeyBindings {
    public AtStart: { [key: string]: IVimStyleCommand };
    public FirstNum: { [key: string]: IVimStyleCommand };
    public RequireMotion: { [key: string]: IVimStyleCommand };
    public RequireMotionNum: { [key: string]: IVimStyleCommand };
    public RequireBrancketForLeftBrancket: { [key: string]: IVimStyleCommand };
    public RequireBrancketForRightBrancket: { [key: string]: IVimStyleCommand };
    public RequireBrancketForLeftBrancketMotion: { [key: string]: IVimStyleCommand };
    public RequireBrancketForRightBrancketMotion: { [key: string]: IVimStyleCommand };
    public RequireInnerTextObject: { [key: string]: IVimStyleCommand };
    public RequireOuterTextObject: { [key: string]: IVimStyleCommand };
    public SmallG: { [key: string]: IVimStyleCommand };
    public SmallGForMotion: { [key: string]: IVimStyleCommand };
    public VisualMode: { [key: string]: IVimStyleCommand };
    public VisualLineMode: { [key: string]: IVimStyleCommand };
}

function applyKeyBindingsByEachState(
    dest: { [key: string]: IVimStyleCommand }, src: { [key: string]: IVimStyleCommand }) {
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
        applyKeyBindingsByEachState(dest.FirstNum, src.AtStart);
        applyKeyBindingsByEachState(dest.FirstNum, src.FirstNum);
    }
    if (dest.RequireMotion) {
        applyKeyBindingsByEachState(dest.RequireMotion, src.RequireMotion);
    }
    if (dest.RequireMotionNum) {
        applyKeyBindingsByEachState(dest.RequireMotionNum, src.RequireMotion);
        applyKeyBindingsByEachState(dest.RequireMotionNum, src.RequireMotionNum);
    }
    if (dest.RequireBrancketForLeftBrancket) {
        applyKeyBindingsByEachState(dest.RequireBrancketForLeftBrancket, src.RequireBrancketForLeftBrancket);
    }
    if (dest.RequireBrancketForRightBrancket) {
        applyKeyBindingsByEachState(dest.RequireBrancketForRightBrancket, src.RequireBrancketForRightBrancket);
    }
    if (dest.RequireBrancketForLeftBrancketMotion) {
        applyKeyBindingsByEachState(dest.RequireBrancketForLeftBrancketMotion,
            src.RequireBrancketForLeftBrancketMotion);
    }
    if (dest.RequireBrancketForRightBrancketMotion) {
        applyKeyBindingsByEachState(dest.RequireBrancketForRightBrancketMotion,
            src.RequireBrancketForRightBrancketMotion);
    }
    if (dest.RequireInnerTextObject) {
        applyKeyBindingsByEachState(dest.RequireInnerTextObject, src.RequireInnerTextObject);
    }
    if (dest.RequireOuterTextObject) {
        applyKeyBindingsByEachState(dest.RequireOuterTextObject, src.RequireOuterTextObject);
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
    if (dest.VisualModeNum) {
        applyKeyBindingsByEachState(dest.VisualModeNum, src.VisualMode);
        applyKeyBindingsByEachState(dest.VisualModeNum, src.VisualModeNum);
    }
    if (dest.VisualLineMode) {
        applyKeyBindingsByEachState(dest.VisualLineMode, src.VisualLineMode);
    }
}

const DefaultKeyBindings: IKeyBindings = {
    AtStart: {
        "a": {
            CreateAction: InsertTextAction.AppendTextAfterCursor,
        },
        "A": {
            CreateAction: InsertTextAction.AppendTextAtEndOfLine,
        },
        "b": {
            CreateAction: WordMotion.GotoWordBackword,
        },
        "B": {
            CreateAction: WordMotion.GotoBlankSeparatedBackwordWord,
        },
        "c": {
            CreateAction: DeleteYankChangeAction.ChangeTextWithMotion,
            state: StateName.RequireMotion,
        },
        "C": {
            CreateAction: DeleteYankChangeAction.ChangeTextToEndOfLine,
        },
        "d": {
            CreateAction: DeleteYankChangeAction.DeleteTextWithMotion,
            state: StateName.RequireMotion,
        },
        "D": {
            CreateAction: DeleteYankChangeAction.DeleteTextToEndOfLine,
        },
        "e": {
            CreateAction: DeleteEndOfWordMotion.GotoForwardToEndOfWold,
        },
        "E": {
            CreateAction: DeleteEndOfWordMotion.GotoForwardToEndOfBlankSeparated,
        },
        "f": {
            CreateAction: FindCharacterMotion.GotoCharacterToRight,
            state: StateName.RequireCharForMotion,
        },
        "F": {
            CreateAction: FindCharacterMotion.GotoCharacterToLeft,
            state: StateName.RequireCharForMotion,
        },
        "g": {
            cmd: VimCommand.nothing,
            state: StateName.SmallG,
        },
        "G": {
            CreateAction: FirstCharacterMotion.GotoLastLine,
        },
        "h": {
            CreateAction: RightMotion.GotoLeft,
        },
        // H no function
        "i": {
            CreateAction: InsertTextAction.InsertTextBeforeCursor,
        },
        "I": {
            CreateAction: InsertTextAction.InsertTextBeforeFirstNonBlankInLine,
        },
        "j": {
            CreateAction: DownMotion.GoDown,
        },
        "J": {
            CreateAction: JoinLinesAction.JoinLines,
        },
        "k": {
            CreateAction: DownMotion.GoUp,
        },
        // K no function
        "l": {
            CreateAction: RightMotion.GotoRight,
        },
        // L no function
        "o": {
            CreateAction: OpenNewLineAndAppendTextAction.OpenNewLineBelowCurrentLineAndAppendText,
        },
        "O": {
            CreateAction: OpenNewLineAndAppendTextAction.OpenNewLineAboveCurrentLineAndAppendText,
        },
        "p": {
            CreateAction: PutRegisterAction.PutRegisterAfterCursorPosition,
        },
        "P": {
            CreateAction: PutRegisterAction.PutRegisterBeforeCursorPosition,
        },
        // q low priority
        // Q never support
        "r": {
            CreateAction: ReplaceCharacterAction.ReplaceCharacter,
            state: StateName.RequireCharForAction,
        },
        // R low priority
        "s": {
            CreateAction: DeleteYankChangeAction.ChangeCharacters,
        },
        "S": {
            CreateAction: DeleteYankChangeAction.ChangeLines,
        },
        "t": {
            CreateAction: FindCharacterMotion.GoTillBeforeCharacterToRight,
            state: StateName.RequireCharForMotion,
        },
        "T": {
            CreateAction: FindCharacterMotion.GoTillBeforeCharacterToLeft,
            state: StateName.RequireCharForMotion,
        },
        // u low priority
        // U low priority
        "v": {
            CreateAction: StartVisualModeAction.StartVisualMode,
        },
        "V": {
            CreateAction: StartVisualLineModeAction.StartVisualLineMode,
        },
        "w": {
            CreateAction: MoveWordMotion.GotoWordFoword,
        },
        "W": {
            CreateAction: MoveWordMotion.GotoBlankSeparated,
        },
        "x": {
            CreateAction: DeleteYankChangeAction.DeleteCharactersUnderCursor,
        },
        "X": {
            CreateAction: DeleteYankChangeAction.DeleteCharactersBeforeCursor,
        },
        "y": {
            CreateAction: DeleteYankChangeAction.YankTextWithMotion,
            state: StateName.RequireMotion,
        },
        "Y": {
            CreateAction: DeleteYankChangeAction.YankLine,
        },
        // z never suppoer
        // Z no function
        "0": {
            CreateAction: FirstCharacterInLineMotion.GotoFirstCharacterInLine,
        },
        "1": {
            cmd: VimCommand.stackNumber,
            state: StateName.FirstNum,
        },
        "2": {
            cmd: VimCommand.stackNumber,
            state: StateName.FirstNum,
        },
        "3": {
            cmd: VimCommand.stackNumber,
            state: StateName.FirstNum,
        },
        "4": {
            cmd: VimCommand.stackNumber,
            state: StateName.FirstNum,
        },
        "5": {
            cmd: VimCommand.stackNumber,
            state: StateName.FirstNum,
        },
        "6": {
            cmd: VimCommand.stackNumber,
            state: StateName.FirstNum,
        },
        "7": {
            cmd: VimCommand.stackNumber,
            state: StateName.FirstNum,
        },
        "8": {
            cmd: VimCommand.stackNumber,
            state: StateName.FirstNum,
        },
        "9": {
            cmd: VimCommand.stackNumber,
            state: StateName.FirstNum,
        },
        "$": {
            CreateAction: LastCharacterInLineMotion.GotoLastCharacterInLine,
        },
        ".": {
            CreateAction: RepeatLastChangeAction.RepeatLastChange,
        },
        ",": {
            CreateAction: FindCharacterMotion.GotoRepeatCharacterOppositeDirection,
        },
        ";": {
            CreateAction: FindCharacterMotion.GotoRepeatCharacter,
        },
        "^": {
            CreateAction: FirstCharacterMotion.GotoFirstNonBlankCharacterInLine,
        },
        "[": {
            cmd: VimCommand.nothing,
            state: StateName.RequireBrancketForLeftBrancket,
        },
        "]": {
            cmd: VimCommand.nothing,
            state: StateName.RequireBrancketForRightBrancket,
        },
        "{": {
            CreateAction: ParagraphMotion.GotoParagraphBackword,
        },
        "}": {
            CreateAction: ParagraphMotion.GotoParagraphFoword,
        },
        "<Up>": {
            CreateAction: DownMotion.GoUp,
        },
        "<Down>": {
            CreateAction: DownMotion.GoDown,
        },
        "<Left>": {
            CreateAction: RightMotion.GotoLeft,
        },
        "<Right>": {
            CreateAction: RightMotion.GotoRight,
        },
    },

    // Nx
    FirstNum: {
        0: {
            cmd: VimCommand.stackNumber,
            state: StateName.FirstNum,
        },
    },

    // cm
    RequireMotion: {
        "a": {
            state: StateName.RequireOuterTextObject,
        },
        // dA
        "b": {
            AddMotion: WordMotion.AddWordBackwardMotion,
        },
        "B": {
            AddMotion: WordMotion.AddBlankSeparatedBackwordMotion,
        },
        "c": {
            CreateAction: DeleteYankChangeAction.ChangeCurrentLine,
        },
        // C no command
        "d": {
            CreateAction: DeleteYankChangeAction.DeleteCurrentLine,
        },
        // D no command
        "e": {
            AddMotion: DeleteEndOfWordMotion.AddEndOfWordMotion,
        },
        "E": {
            AddMotion: DeleteEndOfWordMotion.AddEndOfBlankSeparatedMotion,
        },
        "f": {
            AddMotion: FindCharacterMotion.AddCharacterToRightMotion,
            state: StateName.RequireCharForMotion,
        },
        "F": {
            AddMotion: FindCharacterMotion.AddCharacterToLeftMotion,
            state: StateName.RequireCharForMotion,
        },
        "g": {
            cmd: VimCommand.nothing,
            state: StateName.SmallGForMotion,
        },
        "G": {
            AddMotion: FirstCharacterMotion.AddLastLineMotion,
        },
        "h": {
            AddMotion: RightMotion.AddLeftMotion,
        },
        // H no function
        "i": {
            state: StateName.RequireInnerTextObject,
        },
        // I
        "j": {
            AddMotion: DownMotion.AddDownMotion,
        },
        // J
        "k": {
            AddMotion: DownMotion.AddUpMotion,
        },
        // K no function
        "l": {
            AddMotion: RightMotion.AddRightMotion,
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
            state: StateName.RequireCharForMotion,
        },
        "T": {
            AddMotion: FindCharacterMotion.AddTillCharacterToLeftMotion,
            state: StateName.RequireCharForMotion,
        },
        // u low priority
        // U low priority
        // v low priority
        // V low priority
        "w": {
            AddMotion: ChangeWordMotion.AddWordForwordMotion,
        },
        "W": {
            AddMotion: ChangeWordMotion.AddBlankSparatedMotion,
        },
        // x no function
        // X no function
        "y": {
            CreateAction: DeleteYankChangeAction.YankCurrentLine,
        },
        // Y no command
        // z never suppoer
        // Z no function
        "0": {
            AddMotion: FirstCharacterInLineMotion.AddFirstCharacterInLineMotion,
        },
        "1": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum,
        },
        "2": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum,
        },
        "3": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum,
        },
        "4": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum,
        },
        "5": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum,
        },
        "6": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum,
        },
        "7": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum,
        },
        "8": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum,
        },
        "9": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum,
        },
        "$": {
            AddMotion: LastCharacterInLineMotion.AddLastCharacterInLineMotion,
        },
        ",": {
            AddMotion: FindCharacterMotion.AddRepeartCharacterMotionOppositeDirection,
        },
        ";": {
            AddMotion: FindCharacterMotion.AddRepeartCharacterMotion,
        },
        "^": {
            AddMotion: FirstCharacterMotion.AddFirstNonBlankCharacterInLineMotion,
        },
        "{": {
            AddMotion: ParagraphMotion.AddParagraphBackwordMotion,
        },
        "}": {
            AddMotion: ParagraphMotion.AddParagraphFowordMotion,
        },
        "[": {
            cmd: VimCommand.nothing,
            state: StateName.RequireBrancketForLeftBrancketMotion,
        },
        "]": {
            cmd: VimCommand.nothing,
            state: StateName.RequireBrancketForRightBrancketMotion,
        },
        "<Up>": {
            AddMotion: DownMotion.AddUpMotion,
        },
        "<Down>": {
            AddMotion: DownMotion.AddDownMotion,
        },
        "<Left>": {
            AddMotion: RightMotion.AddLeftMotion,
        },
        "<Right>": {
            AddMotion: RightMotion.AddRightMotion,
        },
    },

    // cNm
    RequireMotionNum: {
        0: {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum,
        },
    },

    RequireBrancketForLeftBrancket: {
        // [(
        "(": {
            CreateAction: BrancketMotion.GoBackToUnclosedLeftParenthesis,
        },
        // [{
        "{": {
            CreateAction: BrancketMotion.GoBackToUnclosedLeftCurlyBracket,
        },
    },

    RequireBrancketForLeftBrancketMotion: {
        // c[(
        "(": {
            AddMotion: BrancketMotion.AddBackToUnclosedLeftParenthesisMotion,
        },
        // c[{
        "{": {
            AddMotion: BrancketMotion.AddBackToUnclosedLeftCurlyBracketMotion,
        },
    },

    RequireBrancketForRightBrancket: {
        // ])
        ")": {
            CreateAction: BrancketMotion.GoToUnclosedRightParenthesis,
        },
        // ]}
        "}": {
            CreateAction: BrancketMotion.GoToUnclosedRightCurlyBracket,
        },
    },

    RequireBrancketForRightBrancketMotion: {
        // c])
        ")": {
            AddMotion: BrancketMotion.AddToUnclosedRightParenthesisMotion,
        },
        // c]}
        "}": {
            AddMotion: BrancketMotion.AddToUnclosedRightCurlyBracketMotion,
        },
    },

    RequireInnerTextObject: {
        "(": {
            AddMotion: TextObjectSelectionBrancket.AddInnerUnclosedParenthesisSelection,
        },
        ")": {
            AddMotion: TextObjectSelectionBrancket.AddInnerUnclosedParenthesisSelection,
        },
        "<": {
            AddMotion: TextObjectSelectionBrancket.AddInnerLessThanSignSelection,
        },
        ">": {
            AddMotion: TextObjectSelectionBrancket.AddInnerLessThanSignSelection,
        },
        "[": {
            AddMotion: TextObjectSelectionBrancket.AddInnerSquareBlancketSelection,
        },
        "]": {
            AddMotion: TextObjectSelectionBrancket.AddInnerSquareBlancketSelection,
        },
        "{": {
            AddMotion: TextObjectSelectionBrancket.AddInnerCurlyBrancketSelection,
        },
        "}": {
            AddMotion: TextObjectSelectionBrancket.AddInnerCurlyBrancketSelection,
        },
        "'": {
            AddMotion:
            TextObjectQuotation.AddInnerApostropheSelection,
        },
        "\"": {
            AddMotion:
            TextObjectQuotation.AddInnerQuotationSelection,
        },
        "`": {
            AddMotion:
            TextObjectQuotation.AddInnerGraveAccentSelection,
        },
    },

    RequireOuterTextObject: {
        "(": {
            AddMotion: TextObjectSelectionBrancket.AddOuterUnclosedParenthesisSelection,
        },
        ")": {
            AddMotion: TextObjectSelectionBrancket.AddOuterUnclosedParenthesisSelection,
        },
        "<": {
            AddMotion: TextObjectSelectionBrancket.AddOuterLessThanSignSelection,
        },
        ">": {
            AddMotion: TextObjectSelectionBrancket.AddOuterLessThanSignSelection,
        },
        "[": {
            AddMotion: TextObjectSelectionBrancket.AddOuterSquareBlancketSelection,
        },
        "]": {
            AddMotion: TextObjectSelectionBrancket.AddOuterSquareBlancketSelection,
        },
        "{": {
            AddMotion: TextObjectSelectionBrancket.AddOuterCurlyBrancketSelection,
        },
        "}": {
            AddMotion: TextObjectSelectionBrancket.AddOuterCurlyBrancketSelection,
        },
        "'": {
            AddMotion:
            TextObjectQuotation.AddOuterApostropheSelection,
        },
        "\"": {
            AddMotion:
            TextObjectQuotation.AddOuterQuotationSelection,
        },
        "`": {
            AddMotion:
            TextObjectQuotation.AddOuterGraveAccentSelection,
        },
    },

    // g
    SmallG: {
        g: {
            CreateAction: FirstCharacterMotion.GotoFirstLineOnFirstNonBlankCharacter,
        },
        r: {
            CreateAction: ReplaceCharacterAction.ReplaceCharacterWithoutAffectingLayout,
            state: StateName.RequireCharForAction,
        },
    },

    // cg
    SmallGForMotion: {
        g: {
            AddMotion: FirstCharacterMotion.AddLastLineMotion,
        },
    },

    // v
    VisualMode: {
        // v..a
        // v..A
        "b": {
            AddMotion: WordMotion.AddWordBackwardMotion,
        },
        "B": {
            AddMotion: WordMotion.AddBlankSeparatedBackwordMotion,
        },
        "c": {
            CreateAction: DeleteYankChangeHighlightedTextAction.ChangeHighlightedText,
        },
        // C no command
        "d": {
            CreateAction: DeleteYankChangeHighlightedTextAction.DeleteHighlightedText,
        },
        // D no command
        "e": {
            AddMotion: DeleteEndOfWordMotion.AddMoveToForwardToEndOfWoldMotion,
        },
        "E": {
            AddMotion: DeleteEndOfWordMotion.AddMoveToForwardToEndOfBlankSeparatedMotion,
        },
        "f": {
            AddMotion: FindCharacterMotion.AddVisualGotoCharacterToRightMotion,
            state: StateName.RequireCharForMotion,
        },
        "F": {
            AddMotion: FindCharacterMotion.AddVisualGotoCharacterToLeftMotion,
            state: StateName.RequireCharForMotion,
        },
        "g": {
            cmd: VimCommand.nothing,
            state: StateName.SmallGForMotion,
        },
        "G": {
            AddMotion: FirstCharacterMotion.AddLastLineMotion,
        },
        "h": {
            AddMotion: RightMotion.AddLeftMotion,
        },
        // H no function
        // v..i
        // v..I
        "j": {
            AddMotion: DownMotion.AddDownMotion,
        },
        "J": {
            CreateAction: JoinHighlightedLinesAction.JoinHighlightedText,
        },
        "k": {
            AddMotion: DownMotion.AddUpMotion,
        },
        // K no function
        "l": {
            AddMotion: RightMotion.AddRightMotion,
        },
        // l no function
        // o never support
        // O no function
        // p never support
        // P no function
        // q no function
        // Q no function
        "r": {
            CreateAction: ReplaceCharacterOfSelecetdTextAction.ReplaceCharacterOfSelectedText,
            state: StateName.RequireCharForAction,
        },
        // R low priority
        "s": {
            CreateAction: DeleteYankChangeHighlightedTextAction.ChangeHighlightedText,
        },
        // S ?
        "t": {
            AddMotion: FindCharacterMotion.AddVisualGoTillCharacterToRightMotion,
            state: StateName.RequireCharForMotion,
        },
        "T": {
            AddMotion: FindCharacterMotion.AddVisualGoTillCharacterToLeftMotion,
            state: StateName.RequireCharForMotion,
        },
        // u low priority
        // U low priority
        // v low priority
        // V low priority
        "w": {
            AddMotion: MoveWordMotion.AddToWordFowordMotion,
        },
        "W": {
            AddMotion: MoveWordMotion.AddToBlankSeparatedMotion,
        },
        "x": {
            CreateAction: DeleteYankChangeHighlightedTextAction.DeleteHighlightedText,
        },
        // X no function
        "y": {
            CreateAction: DeleteYankChangeHighlightedTextAction.YankHighlightedText,
        },
        "0": {
            AddMotion: FirstCharacterInLineMotion.AddFirstCharacterInLineMotion,
        },
        "1": {
            cmd: VimCommand.stackNumber,
            state: StateName.VisualModeNum,
        },
        "2": {
            cmd: VimCommand.stackNumber,
            state: StateName.VisualModeNum,
        },
        "3": {
            cmd: VimCommand.stackNumber,
            state: StateName.VisualModeNum,
        },
        "4": {
            cmd: VimCommand.stackNumber,
            state: StateName.VisualModeNum,
        },
        "5": {
            cmd: VimCommand.stackNumber,
            state: StateName.VisualModeNum,
        },
        "6": {
            cmd: VimCommand.stackNumber,
            state: StateName.VisualModeNum,
        },
        "7": {
            cmd: VimCommand.stackNumber,
            state: StateName.VisualModeNum,
        },
        "8": {
            cmd: VimCommand.stackNumber,
            state: StateName.VisualModeNum,
        },
        "9": {
            cmd: VimCommand.stackNumber,
            state: StateName.VisualModeNum,
        },
        "$": {
            AddMotion: LastCharacterInLineMotion.AddLastCharacterInLineMotion,
        },
        ",": {
            AddMotion: FindCharacterMotion.AddVisualGotoRepeartCharacterMotionOppositeDirection,
        },
        ";": {
            AddMotion: FindCharacterMotion.AddVisualGotoRepeartCharacterMotion,
        },
        "{": {
            AddMotion: ParagraphMotion.AddParagraphBackwordMotion,
        },
        "}": {
            AddMotion: ParagraphMotion.AddParagraphFowordMotion,
        },
        "[": {
            cmd: VimCommand.nothing,
            state: StateName.RequireBrancketForLeftBrancketMotion,
        },
        "]": {
            cmd: VimCommand.nothing,
            state: StateName.RequireBrancketForRightBrancketMotion,
        },
        "<Up>": {
            AddMotion: DownMotion.AddUpMotion,
        },
        "<Down>": {
            AddMotion: DownMotion.AddDownMotion,
        },
        "<Left>": {
            AddMotion: RightMotion.AddLeftMotion,
        },
        "<Right>": {
            AddMotion: RightMotion.AddRightMotion,
        },
    },

    // vN
    VisualModeNum: {
        0: {
            cmd: VimCommand.stackNumber,
            state: StateName.VisualModeNum,
        },
    },

    // V
    VisualLineMode: {
        // V..a
        // V..A
        "b": {
            AddMotion: WordMotion.AddWordBackwardMotion,
        },
        "B": {
            AddMotion: WordMotion.AddBlankSeparatedBackwordMotion,
        },
        "c": {
            CreateAction: DeleteYankChangeHighlightedLineAction.ChangeHighligtedLine,
        },
        "C": {
            CreateAction: DeleteYankChangeHighlightedLineAction.ChangeHighligtedLine,
        },
        "d": {
            CreateAction: DeleteYankChangeHighlightedLineAction.DeleteHighlightedLine,
        },
        "D": {
            CreateAction: DeleteYankChangeHighlightedLineAction.DeleteHighlightedLine,
        },
        // V..e
        // V..E
        "f": {
            AddMotion: FindCharacterMotion.AddCharacterToRightMotion,
            state: StateName.RequireCharForMotion,
        },
        "F": {
            AddMotion: FindCharacterMotion.AddCharacterToLeftMotion,
            state: StateName.RequireCharForMotion,
        },
        "g": {
            cmd: VimCommand.nothing,
            state: StateName.SmallGForMotion,
        },
        "G": {
            AddMotion: FirstCharacterMotion.AddLastLineMotion,
        },
        // V..h
        // V..H no function
        // V..i
        // V..I
        "j": {
            AddMotion: DownMotion.AddDownMotion,
        },
        "J": {
            CreateAction: JoinHighlightedLinesAction.JoinHighlightedLines,
        },
        // V..J?
        "k": {
            AddMotion: DownMotion.AddUpMotion,
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
            state: StateName.RequireCharForMotion,
        },
        "T": {
            AddMotion: FindCharacterMotion.AddTillCharacterToLeftMotion,
            state: StateName.RequireCharForMotion,
        },
        // u low priority
        // U low priority
        // V..v low priority
        // V..V back to normal mode
        // V..w
        // v..W
        "x": {
            CreateAction: DeleteYankChangeHighlightedLineAction.DeleteHighlightedLine,
        },
        "X": {
            CreateAction: DeleteYankChangeHighlightedLineAction.DeleteHighlightedLine,
        },
        "y": {
            CreateAction: DeleteYankChangeHighlightedLineAction.YankHighlightedLine,
        },
        "Y": {
            CreateAction: DeleteYankChangeHighlightedLineAction.YankHighlightedLine,
        },
        "0": {
            AddMotion: FirstCharacterInLineMotion.AddFirstCharacterInLineMotion,
        },
        "1": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum,
        },
        "2": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum,
        },
        "3": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum,
        },
        "4": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum,
        },
        "5": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum,
        },
        "6": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum,
        },
        "7": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum,
        },
        "8": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum,
        },
        "9": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum,
        },
        "$": {
            AddMotion: LastCharacterInLineMotion.AddLastCharacterInLineMotion,
        },
        ",": {
            AddMotion: FindCharacterMotion.AddRepeartCharacterMotionOppositeDirection,
        },
        ";": {
            AddMotion: FindCharacterMotion.AddRepeartCharacterMotion,
        },
        "{": {
            AddMotion: ParagraphMotion.AddParagraphBackwordMotion,
        },
        "}": {
            AddMotion: ParagraphMotion.AddParagraphFowordMotion,
        },
        "[": {
            cmd: VimCommand.nothing,
            state: StateName.RequireBrancketForLeftBrancket,
        },
        "]": {
            cmd: VimCommand.nothing,
            state: StateName.RequireBrancketForRightBrancket,
        },
        "<Up>": {
            AddMotion: DownMotion.AddUpMotion,
        },
        "<Down>": {
            AddMotion: DownMotion.AddDownMotion,
        },
        "<Left>": {
            AddMotion: RightMotion.AddLeftMotion,
        },
        "<Right>": {
            AddMotion: RightMotion.AddRightMotion,
        },
    },
};

// move a cursur by jkl; keys
const ErgonomicKeyBindings: IKeyBindings = {
    AtStart: {
        "j": DefaultKeyBindings.AtStart.h,
        "k": DefaultKeyBindings.AtStart.j,
        "l": DefaultKeyBindings.AtStart.k,
        ";": DefaultKeyBindings.AtStart.l,
    },
    RequireMotion: {
        "j": DefaultKeyBindings.RequireMotion.h,
        "k": DefaultKeyBindings.RequireMotion.j,
        "l": DefaultKeyBindings.RequireMotion.k,
        ";": DefaultKeyBindings.RequireMotion.l,
    },
    VisualMode: {
        "j": DefaultKeyBindings.VisualMode.h,
        "k": DefaultKeyBindings.VisualMode.j,
        "l": DefaultKeyBindings.VisualMode.k,
        ";": DefaultKeyBindings.VisualMode.l,
    },
    VisualModeNum: {
        "j": DefaultKeyBindings.VisualMode.h,
        "k": DefaultKeyBindings.VisualMode.j,
        "l": DefaultKeyBindings.VisualMode.k,
        ";": DefaultKeyBindings.VisualMode.l,
    },
    VisualLineMode: {
        "j": DefaultKeyBindings.VisualMode.h,
        "k": DefaultKeyBindings.VisualMode.j,
        "l": DefaultKeyBindings.VisualMode.k,
        ";": DefaultKeyBindings.VisualMode.l,
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
        RequireInnerTextObject: {},
        RequireOuterTextObject: {},
        SmallG: {},
        SmallGForMotion: {},
        VisualMode: {},
        VisualModeNum: {},
        VisualLineMode: {},
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
