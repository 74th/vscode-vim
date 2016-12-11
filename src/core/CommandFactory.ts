import * as Utils from "../Utils";
import {InsertTextAction} from "../action/InsertTextAction";
import {OpenNewLineAndAppendTextAction} from "../action/OpenNewLineAndAppendTextAction";
import {PutRegisterAction} from "../action/PutRegisterAction";
import {DeleteYankChangeAction} from "../action/DeleteYankChangeAction";
import {GoAction} from "../action/GoAction";
import {GoDownAction} from "../action/MoveLineAction";
import {StartVisualModeAction} from "../action/StartVisualModeAction";
import {ExpandHighlightedTextAction} from "../action/ExpandHighlightedTextAction";
import {DeleteYankChangeHighlightedTextAction} from "../action/DeleteYankChangeHighlightedTextAction";
import {StartVisualLineModeAction} from "../action/StartVisualLineModeAction";
import {ExpandHighlightedLineAction} from "../action/ExpandHighlightedLineAction";
import {DeleteYankChangeHighlightedLineAction} from "../action/DeleteYankChangeHighlightedLineAction";
import {ReplaceCharacterAction} from "../action/ReplaceCharacterAction";
import {ReplaceCharacterOfSelectedTextAction} from "../action/ReplaceCharacterOfSelecetdTextAction";
import {RepeatLastChangeAction} from "../action/RepeatLastChangeAction";
import {RightMotion} from "../motion/RightMotion";
import {DownMotion} from "../motion/DownMotion";
import {FirstCharacterInLineMotion} from "../motion/FirstCharacterInLineMotion";
import {LastCharacterInLineMotion} from "../motion/EndMotion";
import {FindCharacterMotion} from "../motion/FindCharacterMotion";
import {WordMotion} from "../motion/WordMotion";
import {MoveWordMotion} from "../motion/MoveWordMotion";
import {DeleteWordMotion} from "../motion/DeleteWordMotion";
import {ChangeWordMotion} from "../motion/ChangeWordMotion";
import {DeleteEndOfWordMotion} from "../motion/DeleteEndOfWordMotion";
import {FirstCharacterMotion} from "../motion/FirstCharacterMotion";
import {CallEditorCommandAction} from "../action/CallEditorCommandAction";
import {ParagraphMotion} from "../motion/ParagraphMotion";
import {BackToBrancketMotion, ToBrancketMotion } from "../motion/BrancketMotion";

export class CommandFactory implements ICommandFactory {

    private state: StateName;
    private action: IAction;
    private motion: IRequireCharacterMotion;
    private stackedKey: string;
    private num: number;
    private registerCharCode: number;
    private commandString: string;
    public Nmap: { [key: string]: string };
    public Nnoremap: { [key: string]: string };

    public KeyBindings: IKeyBindings;

    constructor() {
        this.Clear();
        this.Nmap = {};
        this.Nnoremap = {};
    }

    public PushKey(orgKeyStroke: string, mode: VimMode, remap: boolean): IAction[] {
        let keyStroke = orgKeyStroke;
        let actionList: IAction[] = [];
        while (keyStroke.length > 0) {
            let keyChar = keyStroke.substring(0, 1);
            keyStroke = keyStroke.substring(1);
            this.commandString += keyChar;

            if (remap && mode === VimMode.Normal && this.Nmap[this.commandString] !== undefined) {
                keyStroke += this.Nmap[this.commandString];
                this.ClearState();
                continue;
            }

            if (remap && mode === VimMode.Normal && this.Nnoremap[this.commandString] !== undefined) {
                let newCommandString = this.Nnoremap[this.commandString];
                this.ClearState();
                actionList = actionList.concat(this.PushKey(newCommandString, mode, false));
            } else {
                let action = this.pushKey(keyChar, mode);
                if (action !== null) {
                    actionList.push(action);
                }
            }
        }
        return actionList;
    }
    public pushKey(keyChar: string, mode: VimMode): IAction {
        let command: IVimStyleCommand;
        if (mode === VimMode.Normal) {
            switch (this.state) {
                case StateName.AtStart:
                    command = this.KeyBindings.AtStart[keyChar];
                    break;
                case StateName.FirstNum:
                    command = this.KeyBindings.FirstNum[keyChar];
                    break;
                case StateName.RequireMotion:
                    command = this.KeyBindings.RequireMotion[keyChar];
                    break;
                case StateName.RequireMotionNum:
                    command = this.KeyBindings.RequireMotionNum[keyChar];
                    break;
                case StateName.RequireCharForMotion:
                    return this.pushKeyAtRequireCharForMotion(keyChar);
                case StateName.RequireCharForAction:
                    return this.pushKeyAtRequireCharForAction(keyChar);
                case StateName.RequireCharForRegister:
                    return this.pushKeyAtRequireCharForRegister(keyChar);
                case StateName.RequireBrancketForLeftBrancket:
                    command = this.KeyBindings.RequireBrancketForLeftBrancket[keyChar];
                    break;
                case StateName.RequireBrancketForLeftBrancketMotion:
                    command = this.KeyBindings.RequireBrancketForLeftBrancketMotion[keyChar];
                    break;
                case StateName.RequireBrancketForRightBrancket:
                    command = this.KeyBindings.RequireBrancketForRightBrancket[keyChar];
                    break;
                case StateName.RequireBrancketForRightBrancketMotion:
                    command = this.KeyBindings.RequireBrancketForRightBrancketMotion[keyChar];
                    break;
                case StateName.SmallG:
                    command = this.KeyBindings.SmallG[keyChar];
                    break;
                case StateName.SmallGForMotion:
                    command = this.KeyBindings.SmallGForMotion[keyChar];
                    break;
            }
        } else if (mode === VimMode.Visual) {
            switch (this.state) {
                case StateName.AtStart:
                    this.action = new ExpandHighlightedTextAction();
                    command = this.KeyBindings.VisualMode[keyChar];
                    break;
                case StateName.RequireMotionNum:
                    command = this.KeyBindings.RequireMotionNum[keyChar];
                    break;
                case StateName.RequireCharForMotion:
                    return this.pushKeyAtRequireCharForMotion(keyChar);
                case StateName.RequireCharForAction:
                    return this.pushKeyAtRequireCharForAction(keyChar);
                case StateName.RequireCharForRegister:
                    return this.pushKeyAtRequireCharForRegister(keyChar);
                case StateName.RequireBrancketForLeftBrancketMotion:
                    command = this.KeyBindings.RequireBrancketForLeftBrancketMotion[keyChar];
                    break;
                case StateName.RequireBrancketForRightBrancketMotion:
                    command = this.KeyBindings.RequireBrancketForRightBrancketMotion[keyChar];
                    break;
                case StateName.SmallGForMotion:
                    command = this.KeyBindings.SmallGForMotion[keyChar];
                    break;
            }
        } else if (mode === VimMode.VisualLine) {
            switch (this.state) {
                case StateName.AtStart:
                    this.action = new ExpandHighlightedLineAction();
                    command = this.KeyBindings.VisualLineMode[keyChar];
                    break;
                case StateName.RequireMotionNum:
                    command = this.KeyBindings.RequireMotionNum[keyChar];
                    break;
                case StateName.RequireCharForMotion:
                    return this.pushKeyAtRequireCharForMotion(keyChar);
                case StateName.RequireBrancketForLeftBrancketMotion:
                    command = this.KeyBindings.RequireBrancketForLeftBrancketMotion[keyChar];
                    break;
                case StateName.RequireBrancketForRightBrancketMotion:
                    command = this.KeyBindings.RequireBrancketForRightBrancketMotion[keyChar];
                    break;
                case StateName.SmallGForMotion:
                    command = this.KeyBindings.SmallGForMotion[keyChar];
                    break;
            }
        }
        if (command === undefined) {
            this.Clear();
            return null;
        }
        this.createVimStyleCommand(keyChar, command);
        if (command.state === StateName.Panic) {
            this.Clear();
            return null;
        }
        if (command.state === undefined) {
            return this.action;
        }
        this.stackedKey = keyChar;
        this.state = command.state;
        return null;
    }

    public Clear() {
        this.ClearState();
        this.commandString = "";
    }

    public ClearState() {
        this.state = StateName.AtStart;
        this.action = null;
        this.stackedKey = null;
        this.num = 0;
    }

    public GetCommandString(): string {
        return this.commandString;
    }

    private createVimStyleCommand(key: string, command: IVimStyleCommand) {

        switch (command.cmd) {

            // sorted and categorised by quickref.md

            // ** Left-right motions **
            // Nj
            case VimCommand.gotoRight:
                this.gotoRight();
                return;
            // Nl
            case VimCommand.gotoLeft:
                this.gotoLeft();
                return;
            // cNj
            case VimCommand.rightMotion:
                this.addRightMotion();
                return;
            // cNl
            case VimCommand.leftMotion:
                this.addLeftMotion();
                return;
            // 0
            case VimCommand.gotoFirstCharacterInLine:
                this.gotoFirstCharacterInLine();
                return;
            // c0
            case VimCommand.firstCharacterInLineMotion:
                this.addFirstCharacterInLineMotion();
                return;
            // ^
            case VimCommand.gotoFirstLineOnFirstNonBlankCharacter:
                this.gotoFirstLineOnFirstNonBlankCharacter();
                return;
            // c^
            case VimCommand.firstNonBlankCharacterInLineMotion:
                this.addFirstNonBlankCharacterInLineMotion();
                return;
            // $
            case VimCommand.gotoLastCharacterInLine:
                this.gotoLastCharacterInLine();
                return;
            // c$
            case VimCommand.lastCharacterInLineMotion:
                this.addLastCharacterInLineMotion();
                return;
            // Nf{char}
            case VimCommand.gotoCharacterToRight:
                this.gotoCharacterToRight();
                return;
            // NF{char}
            case VimCommand.gotoCharacterToLeft:
                this.gotoCharacterToLeft();
                return;
            // cNf{char}
            case VimCommand.characterToRightMotion:
                this.addCharacterToRightMotion();
                return;
            // cNF{char}
            case VimCommand.characterToLeftMotion:
                this.addCharacterToLeftMotion();
                return;
            // Nt{char}
            case VimCommand.goTillBeforeCharacterToRight:
                this.goTillBeforeCharacterToRight();
                return;
            // NT{char}
            case VimCommand.goTillBeforeCharacterToLeft:
                this.goTillBeforeCharacterToLeft();
                return;
            //  cNt{char}
            case VimCommand.tillBeforeCharToRightMotion:
                this.addTillCharacterToRightMotion();
                return;
            //  cNT{char}
            case VimCommand.tillBeforeCharToLeftMotion:
                this.addTillCharacterToLeftMotion();
                return;
            // N;
            case VimCommand.gotoRepeatCharacter:
                this.gotoRepeatCharacter();
                return;
            // cN;
            case VimCommand.repeartCharacterMotion:
                this.addRepeartCharacterMotionaddCharacter();
                return;
            // N,
            case VimCommand.gotoRepeatCharacterOppositeDirection:
                this.gotoRepeatCharacterOppositeDirection();
                return;
            // cN,
            case VimCommand.repeartCharacterMotionOppositeDirection:
                this.addRepeartCharacterMotionOppositeDirection();
                return;

            // ** Up-down motions **
            // Nk
            case VimCommand.goUp:
                this.goUp();
                return;
            // Nj
            case VimCommand.goDown:
                this.goDown();
                return;
            // cNk
            case VimCommand.upMotion:
                this.addUpMotion();
                return;
            // cNj
            case VimCommand.downMotion:
                this.addDownMotion();
                return;
            // G
            case VimCommand.gotoLastLine:
                this.gotoLastLine();
                return;
            // cG
            case VimCommand.lastLineMotion:
                this.addLastLineMotion();
                return;
            // NG
            case VimCommand.gotoLine:
                this.gotoLine();
                return;
            // cNG
            case VimCommand.lineMotion:
                this.addLineMotion();
                return;
            // gg
            case VimCommand.gotoFirstNonBlankCharacterInLine:
                this.gotoFirstNonBlankCharacterInLine();
                return;
            // cgg
            case VimCommand.firstLineMotion:
                this.addFirstLineMotion();
                return;
            // ** Text object motions **
            // Nw
            case VimCommand.gotoWordFoward:
                this.gotoWordFoword();
                return;
            // cNw
            case VimCommand.wordForwardMotion:
                this.addWordForwordMotion();
                return;
            // NW
            case VimCommand.gotoBlankSeparated:
                this.gotoBlankSeparated();
                return;
            // cNW
            case VimCommand.blankSeparatedMotion:
                this.addBlankSparatedMotion();
                return;
            // Ne
            case VimCommand.gotoForwardToEndOfWold:
                this.gotoForwardToEndOfWold();
                return;
            // cNe
            case VimCommand.endOfWordMotion:
                this.addEndOfWordMotion();
                break;
            // NE
            case VimCommand.gotoForwardToEndOfBlankSeparated:
                this.gotoForwardToEndOfBlankSeparated();
                return;
            // cNE
            case VimCommand.endOfBlankSeparatedMotion:
                this.addEndOfBlankSeparatedMotion();
                break;
            // Nb
            case VimCommand.gotoWordBackword:
                this.gotoWordBackword();
                return;
            // cNb
            case VimCommand.wordBackwardMotion:
                this.addWordBackwardMotion();
                break;
            // NB
            case VimCommand.gotoBlankSeparatedBackword:
                this.gotoBlankSeparatedBackwordWord();
                return;
            // cNB
            case VimCommand.blankSeparatedBackwordMotion:
                this.addBlankSeparatedBackwordMotion();
                break;
            // N{
            case VimCommand.gotoParagraphBackword:
                this.gotoParagraphBackword();
                return;
            // cN{
            case VimCommand.paragraphBackwordMotion:
                this.addParagraphBackwordMotion();
                return;
            // N}
            case VimCommand.gotoParagraphFoword:
                this.gotoParagraphFoword();
                return;
            // cN}
            case VimCommand.paragraphFowordMotion:
                this.addParagraphFowordMotion();
                return;
            // N[(
            case VimCommand.goBackToUnclosedLeftParenthesis:
                this.goBackToUnclosedLeftParenthesis();
                return;
            // cN[(
            case VimCommand.backToUnclosedLeftParenthesisMotion:
                this.addBackToUnclosedLeftParenthesis();
                return;
            // N[{
            case VimCommand.goBackToUnclosedLeftCurlyBracket:
                this.goBackToUnclosedLeftCurlyBracket();
                return;
            // cN[{
            case VimCommand.backToUnclosedLeftCurlyBracketMotion:
                this.addBackToUnclosedLeftCurlyBracketMotion();
                return;
            // N])
            case VimCommand.goToUnclosedRightParenthesis:
                this.goToUnclosedRightParenthesis();
                return;
            // cN])
            case VimCommand.toUnclosedRightParenthesisMotion:
                this.addToUnclosedRightParenthesis();
                return;
            // N]}
            case VimCommand.goToUnclosedRightCurlyBracket:
                this.goToUnclosedRightCurlyBracket();
                return;
            // cN]}
            case VimCommand.toUnclosedRightCurlyBracketMotion:
                this.addToUnclosedRightCurlyBracketMotion();
                return;

            // ** Pattern searches **

            // ** Marks and motions **

            // ** Various motions **

            // ** Scrolling **

            // ** Inserting text **
            // Na
            case VimCommand.appendTextAfterCursor:
                this.appendTextAfterCursor();
                return;
            // NA
            case VimCommand.appendTextAtEndOfLine:
                this.appendTextAtEndOfLine();
                return;
            // Ni
            case VimCommand.insertTextBeforeCursor:
                this.insertTextBeforeCursor();
                return;
            // NI
            case VimCommand.insertTextBeforeFirstNonBlankInLine:
                this.insertTextBeforeFirstNonBlankInLine();
                return;
            // No
            case VimCommand.openNewLineBelowCurrentLineAndAppnedText:
                this.openNewLineBelowCurrentLineAndAppendText();
                return;
            // NO
            case VimCommand.openNewLineAboveCurrentLineAndAppnedText:
                this.openNewLineAboveCurrentLineAndAppendText();
                return;

            // ** Deleting text **
            // Nx
            case VimCommand.deleteCharactersUnderCursor:
                this.deleteCharactersUnderCursor();
                return;
            // Nx
            case VimCommand.deleteCharactersBeforeCursor:
                this.deleteCharactersBeforeCursor();
                return;
            // Nd{motion}
            case VimCommand.deleteTextWithMotion:
                this.deleteTextWithMotion();
                return;
            // {visual}d
            case VimCommand.deleteHighlightedText:
                this.deleteHighligtedText();
                return;
            // {visualLine}d
            case VimCommand.deleteHighlightedLine:
                this.deleteHightlightedLineAction();
                return;
            // dd cc yy
            case VimCommand.doActionAtCurrentLine:
                this.doActionAtCurrentLine(key);
                return;
            // D
            case VimCommand.deleteTextToEndOfLine:
                this.deleteTextToEndOfLine();
                return;

            // ** Copying and moving text **
            // y{motion}
            case VimCommand.yankTextWithMotion:
                this.yankTextWithMotion();
                return;
            // {visual}y
            case VimCommand.yankHighlightedText:
                this.yancSelectionAction();
                return;
            // {visualLine}y
            case VimCommand.yankHighlightedLine:
                this.yancLineSelectionAction();
                return;
            // Nyy
            case VimCommand.yankLine:
                this.yankLine();
                return;
            // Np
            case VimCommand.putRegisterAfterCursorPosition:
                this.putRegisterAfterCursorPosition();
                return;
            // NP
            case VimCommand.putRegisterBeforeCursorPosition:
                this.putRegisterBeforeCursorPosition();
                return;

            // ** Changing text **
            // Nr{char}
            case VimCommand.replaceCharacter:
                this.replaceCharacterAction();
                return;
            // Ngr{char}
            case VimCommand.replaceCharacterWithoutAffectingLayout:
                this.replaceCharacterWithoutAffectingLayoutAction();
                return;
            // {Visual}r{char}
            case VimCommand.replaceCharacterOfSelectedText:
                this.replaceCharacterOfSelectedTextAction();
                return;
            // c{motion}
            case VimCommand.changeTextWithMotion:
                this.changeTextWithMotion();
                return;
            // C
            case VimCommand.changeTextToEndOfLine:
                this.changeTextToEndOfLine();
                return;
            // NS
            case VimCommand.changeLines:
                this.changeLines();
                return;
            // s
            case VimCommand.changeCharacters:
                this.changeCharacters();
                return;
            // {visual}c
            case VimCommand.changeHighlightedText:
                this.changeHighlightedText();
                return;
            // {visualLine}c
            case VimCommand.changeHighligtedLine:
                this.changeLineSelectionAction();
                return;

            // ** Complex changes **

            // ** Visual mode **
            // v
            case VimCommand.startVisualMode:
                this.startVisualMode();
                return;
            // V
            case VimCommand.startVisualLineMode:
                this.enterVisualLineModeAction();
                return;

            // ** Text objects (only in Visual mode or after an operator) **

            // ** Repeating commands **
            // .
            case VimCommand.repeatLastChange:
                this.repeatLastChange();
                return;

            // ** other **
            case VimCommand.stackNumber:
                this.stackNumber(key);
            case VimCommand.nothing:
                return;
            case VimCommand.editorCommand:
                this.editorCommand(command);
        }
    }

    // sorted and categorised by quickref.md

    // -----
    // Left-right motions
    // -----

    // Nh
    private gotoRight() {
        let m = new RightMotion();
        m.Count = this.getNumStack();
        this.action = this.createGotoAction(m);
    }

    // Nl
    private gotoLeft() {
        let m = new RightMotion();
        m.IsLeftDirection = true;
        m.Count = this.getNumStack();
        this.action = this.createGotoAction(m);
    }

    // ch
    private addRightMotion() {
        let m = new RightMotion();
        m.Count = this.getNumStack();
        let a = <IRequireMotionAction>this.action;
        a.Motion = m;
    }

    // cl
    private addLeftMotion() {
        let m = new RightMotion();
        m.IsLeftDirection = true;
        m.Count = this.getNumStack();
        let a = <IRequireMotionAction>this.action;
        a.Motion = m;
    }

    // 0
    private gotoFirstCharacterInLine() {
        this.action = this.createGotoAction(new FirstCharacterInLineMotion());
    }

    // c0
    private addFirstCharacterInLineMotion() {
        let a = <IRequireMotionAction>this.action;
        a.Motion = new FirstCharacterInLineMotion();
    }

    // ^
    private gotoFirstNonBlankCharacterInLine() {
        let m = new FirstCharacterMotion();
        m.Target = FirstCharacterMotion.Target.Current;
        this.action = this.createGotoAction(m);
    }

    // c^
    private addFirstNonBlankCharacterInLineMotion() {
        let a = <IRequireMotionAction>this.action;
        let m = new FirstCharacterMotion();
        m.Target = FirstCharacterMotion.Target.Current;
        a.Motion = m;
    }

    // c$
    private addLastCharacterInLineMotion() {
        let a = <IRequireMotionAction>this.action;
        a.Motion = new LastCharacterInLineMotion();
    }

    // $
    private gotoLastCharacterInLine() {
        this.action = this.createGotoAction(new LastCharacterInLineMotion());
    }

    // fx
    private gotoCharacterToRight() {
        let a = new GoAction();
        let m: FindCharacterMotion;
        m = new FindCharacterMotion(Direction.Right);
        m.Count = this.getNumStack();
        a.Motion = m;
        this.action = a;
        this.motion = m;
    }

    // Fx
    private gotoCharacterToLeft() {
        let a = new GoAction();
        let m: FindCharacterMotion;
        m = new FindCharacterMotion(Direction.Left);
        m.Count = this.getNumStack();
        a.Motion = m;
        this.action = a;
        this.motion = m;
    }

    // tx
    private goTillBeforeCharacterToRight() {
        let a = new GoAction();
        let m: FindCharacterMotion;
        m = new FindCharacterMotion(Direction.Right);
        m.Count = this.getNumStack();
        m.IsTill = true;
        a.Motion = m;
        this.action = a;
        this.motion = m;
    }

    // Tx
    private goTillBeforeCharacterToLeft() {
        let a = new GoAction();
        let m: FindCharacterMotion;
        m = new FindCharacterMotion(Direction.Left);
        m.Count = this.getNumStack();
        m.IsTill = true;
        a.Motion = m;
        this.action = a;
        this.motion = m;
    }

    // cfx
    private addCharacterToRightMotion() {
        let m: FindCharacterMotion;
        m = new FindCharacterMotion(Direction.Right);
        m.IsContainTargetChar = true;
        m.Count = this.getNumStack();
        let a = <IRequireMotionAction>this.action;
        a.Motion = m;
        this.motion = m;
    }


    // cFx
    private addCharacterToLeftMotion() {
        let m: FindCharacterMotion;
        m = new FindCharacterMotion(Direction.Left);
        m.Count = this.getNumStack();
        let a = <IRequireMotionAction>this.action;
        a.Motion = m;
        this.motion = m;
    }

    // ctx
    private addTillCharacterToRightMotion() {
        let m: FindCharacterMotion;
        m = new FindCharacterMotion(Direction.Right);
        m.IsContainTargetChar = true;
        m.Count = this.getNumStack();
        m.IsTill = true;
        let a = <IRequireMotionAction>this.action;
        a.Motion = m;
        this.motion = m;
    }

    // cTx
    private addTillCharacterToLeftMotion() {
        let m: FindCharacterMotion;
        m = new FindCharacterMotion(Direction.Left);
        m.Count = this.getNumStack();
        m.IsTill = true;
        let a = <IRequireMotionAction>this.action;
        a.Motion = m;
        this.motion = m;
    }

    // N;
    private gotoRepeatCharacter() {
        let a = new GoAction();
        let m: FindCharacterMotion;
        m = new FindCharacterMotion(Direction.Right);
        m.Count = this.getNumStack();
        a.Motion = m;
        this.action = a;
        this.motion = m;
    }

    // c;
    private addRepeartCharacterMotionaddCharacter() {
        let m: FindCharacterMotion;
        m = new FindCharacterMotion(null);
        m.IsContainTargetChar = true;
        m.Count = this.getNumStack();
        let a = <IRequireMotionAction>this.action;
        a.Motion = m;
        this.motion = m;
    }

    // N,
    private gotoRepeatCharacterOppositeDirection() {
        let a = new GoAction();
        let m: FindCharacterMotion;
        m = new FindCharacterMotion(null);
        m.OppositeDirection = true;
        m.Count = this.getNumStack();
        a.Motion = m;
        this.action = a;
        this.motion = m;
    }

    // c,
    private addRepeartCharacterMotionOppositeDirection() {
        let m: FindCharacterMotion;
        m = new FindCharacterMotion(null);
        m.OppositeDirection = true;
        m.IsContainTargetChar = true;
        m.Count = this.getNumStack();
        let a = <IRequireMotionAction>this.action;
        a.Motion = m;
        this.motion = m;
    }
    // -----
    // Up-down motions
    // -----

    // j
    private goDown() {
        let m = new DownMotion();
        m.Count = this.getNumStack();
        let a = new GoDownAction();
        a.Motion = m;
        this.action = a;
    }

    // k
    private goUp() {
        let m = new DownMotion();
        m.IsUpDirection = true;
        m.Count = this.getNumStack();
        let a = new GoDownAction();
        a.Motion = m;
        this.action = a;
    }

    // cj
    private addDownMotion() {
        let m = new DownMotion();
        m.Count = this.getNumStack();
        let a = <IRequireMotionAction>this.action;
        a.Motion = m;
        a.IsLine = true;
    }

    // ck
    private addUpMotion() {
        let m = new DownMotion();
        m.IsUpDirection = true;
        m.Count = this.getNumStack();
        let a = <IRequireMotionAction>this.action;
        a.Motion = m;
        a.IsLine = true;
    }

    // G
    private gotoLastLine() {
        let a = new GoAction();
        let m = new FirstCharacterMotion();
        m.Target = FirstCharacterMotion.Target.Last;
        a.Motion = m;
        this.action = a;
    }

    // cG
    private addLastLineMotion() {
        let m = new FirstCharacterMotion();
        m.Target = FirstCharacterMotion.Target.Last;
        let a = <IRequireMotionAction>this.action;
        a.Motion = m;
        a.IsLine = true;
    }

    // NG
    private gotoLine() {
        let a = new GoAction();
        let m = new FirstCharacterMotion();
        m.Count = this.getNumStack() - 1;
        a.Motion = m;
        this.action = a;
    }

    // cNG
    private addLineMotion() {
        let m = new FirstCharacterMotion();
        m.Count = this.getNumStack() - 1;
        let a = <IRequireMotionAction>this.action;
        a.Motion = m;
        a.IsLine = true;
    }

    // gg
    private gotoFirstLineOnFirstNonBlankCharacter() {
        let a = new GoAction();
        let m = new FirstCharacterMotion();
        m.Target = FirstCharacterMotion.Target.First;
        a.Motion = m;
        this.action = a;
    }

    // cgg
    private addFirstLineMotion() {
        let m = new FirstCharacterMotion();
        m.Target = FirstCharacterMotion.Target.First;
        let a = <IRequireMotionAction>this.action;
        a.Motion = m;
        a.IsLine = true;
    }

    // -----
    // Text object motions
    // -----

    // Nw
    private gotoWordFoword() {
        let m = new MoveWordMotion();
        m.Count = this.getNumStack();
        this.action = this.createGotoAction(m);
    }

    // cNw
    private addWordForwordMotion() {
        let a = <IRequireMotionAction>this.action;
        if (a.IsChange) {
            let cm = new ChangeWordMotion();
            cm.IsWORD = false;
            cm.Count = this.getNumStack();
            a.Motion = cm;
        } else {
            let dm = new DeleteWordMotion();
            dm.Count = this.getNumStack();
            dm.IsWORD = false;
            a.Motion = dm;
        }
    }

    // NW
    private gotoBlankSeparated() {
        let m = new MoveWordMotion();
        m.IsWORD = true;
        m.Count = this.getNumStack();
        this.action = this.createGotoAction(m);
    }

    // cNW
    private addBlankSparatedMotion() {
        let a = <IRequireMotionAction>this.action;
        if (a.IsChange) {
            let cm = new ChangeWordMotion();
            cm.IsWORD = true;
            cm.Count = this.getNumStack();
            a.Motion = cm;
        } else {
            let dm = new DeleteWordMotion();
            dm.Count = this.getNumStack();
            dm.IsWORD = true;
            a.Motion = dm;
        }
    }

    // Ne
    private gotoForwardToEndOfWold() {
        let m = new DeleteEndOfWordMotion();
        m.IsWORD = false;
        m.IsMove = true;
        m.Count = this.getNumStack();
        this.action = this.createGotoAction(m);
    }

    // cNe
    private addEndOfWordMotion() {
        let m = new DeleteEndOfWordMotion();
        m.IsWORD = false;
        m.IsMove = false;
        m.Count = this.getNumStack();
        let a = <IRequireMotionAction>this.action;
        a.Motion = m;
    }

    // NE
    private gotoForwardToEndOfBlankSeparated() {
        let m = new DeleteEndOfWordMotion();
        m.IsWORD = true;
        m.IsMove = true;
        m.Count = this.getNumStack();
        this.action = this.createGotoAction(m);
    }

    // cWE
    private addEndOfBlankSeparatedMotion() {
        let m = new DeleteEndOfWordMotion();
        m.IsWORD = true;
        m.IsMove = false;
        m.Count = this.getNumStack();
        let a = <IRequireMotionAction>this.action;
        a.Motion = m;
    }

    // Nb
    private gotoWordBackword() {
        let m: WordMotion;
        m = new WordMotion(Direction.Left);
        m.IsWordEnd = true;
        m.IsWORD = false;
        m.IsSkipBlankLine = false;
        m.Count = this.getNumStack();
        this.action = this.createGotoAction(m);
    }

    // cNb
    private addWordBackwardMotion() {
        let m: WordMotion;
        m = new WordMotion(Direction.Left);
        m.IsWordEnd = true;
        m.IsWORD = false;
        m.IsSkipBlankLine = false;
        // m.IsForRange = true;
        m.Count = this.getNumStack();
        let a = <IRequireMotionAction>this.action;
        a.Motion = m;
    }

    // NB
    private gotoBlankSeparatedBackwordWord() {
        let m: WordMotion;
        m = new WordMotion(Direction.Left);
        m.IsWordEnd = true;
        m.IsWORD = true;
        m.IsSkipBlankLine = false;
        m.Count = this.getNumStack();
        this.action = this.createGotoAction(m);
    }

    // cNB
    private addBlankSeparatedBackwordMotion() {
        let m: WordMotion;
        m = new WordMotion(Direction.Left);
        m.IsWordEnd = true;
        m.IsWORD = true;
        m.IsSkipBlankLine = false;
        // m.IsForRange = true;
        m.Count = this.getNumStack();
        let a = <IRequireMotionAction>this.action;
        a.Motion = m;
    }

    // N{
    private gotoParagraphBackword() {
        let m: ParagraphMotion = new ParagraphMotion();
        m.IsUpDirection = true;
        m.Count = this.getNumStack();
        this.action = this.createGotoAction(m);
    }

    // cN{
    private addParagraphBackwordMotion() {
        let m: ParagraphMotion = new ParagraphMotion();
        m.IsUpDirection = true;
        m.Count = this.getNumStack();
        let a = <IRequireMotionAction>this.action;
        a.Motion = m;
    }

    // N}
    private gotoParagraphFoword() {
        let m: ParagraphMotion = new ParagraphMotion();
        m.IsUpDirection = false;
        m.Count = this.getNumStack();
        this.action = this.createGotoAction(m);
    }

    // cN}
    private addParagraphFowordMotion() {
        let m: ParagraphMotion = new ParagraphMotion();
        m.IsUpDirection = false;
        m.Count = this.getNumStack();
        let a = <IRequireMotionAction>this.action;
        a.Motion = m;
    }

    // N[(
    private goBackToUnclosedLeftParenthesis() {
        let m = new BackToBrancketMotion();
        m.LeftBrancket = "(";
        m.RightBrancket = ")";
        m.TargetBrancket = "(";
        m.Count = this.getNumStack();
        this.action = this.createGotoAction(m);
    }

    // cN[(
    private addBackToUnclosedLeftParenthesis() {
        let m = new BackToBrancketMotion();
        m.LeftBrancket = "(";
        m.RightBrancket = ")";
        m.TargetBrancket = "(";
        m.Count = this.getNumStack();
        let a = <IRequireMotionAction>this.action;
        a.Motion = m;
    }

    // N[{
    private goBackToUnclosedLeftCurlyBracket() {
        let m = new BackToBrancketMotion();
        m.LeftBrancket = "{";
        m.RightBrancket = "}";
        m.TargetBrancket = "{";
        m.Count = this.getNumStack();
        this.action = this.createGotoAction(m);
    }

    // cN[{
    private addBackToUnclosedLeftCurlyBracketMotion() {
        let m = new BackToBrancketMotion();
        m.LeftBrancket = "{";
        m.RightBrancket = "}";
        m.TargetBrancket = "{";
        m.Count = this.getNumStack();
        let a = <IRequireMotionAction>this.action;
        a.Motion = m;
    }

    // N])
    private goToUnclosedRightParenthesis() {
        let m = new ToBrancketMotion();
        m.LeftBrancket = "(";
        m.RightBrancket = ")";
        m.TargetBrancket = ")";
        m.Count = this.getNumStack();
        this.action = this.createGotoAction(m);
    }

    // cN])
    private addToUnclosedRightParenthesis() {
        let m = new ToBrancketMotion();
        m.LeftBrancket = "(";
        m.RightBrancket = ")";
        m.TargetBrancket = ")";
        m.Count = this.getNumStack();
        let a = <IRequireMotionAction>this.action;
        a.Motion = m;
    }

    // N]}
    private goToUnclosedRightCurlyBracket() {
        let m = new ToBrancketMotion();
        m.LeftBrancket = "{";
        m.RightBrancket = "}";
        m.TargetBrancket = "}";
        m.Count = this.getNumStack();
        this.action = this.createGotoAction(m);
    }

    // cN]}
    private addToUnclosedRightCurlyBracketMotion() {
        let m = new ToBrancketMotion();
        m.LeftBrancket = "{";
        m.RightBrancket = "}";
        m.TargetBrancket = "}";
        m.Count = this.getNumStack();
        let a = <IRequireMotionAction>this.action;
        a.Motion = m;
    }

    // -----
    // Pattern searches
    // -----

    // -----
    // Marks and motions
    // -----

    // -----
    // Various motions
    // -----

    // -----
    // Scrolling
    // -----

    // -----
    // Inserting text
    // -----

    // a
    private appendTextAfterCursor() {
        let m = new RightMotion();
        m.Count = 1;
        this.action = new InsertTextAction(m);
    }

    // A
    private appendTextAtEndOfLine() {
        let m = new LastCharacterInLineMotion();
        this.action = new InsertTextAction(m);
    }

    // i
    private insertTextBeforeCursor() {
        this.action = new InsertTextAction();
    }

    // I
    private insertTextBeforeFirstNonBlankInLine() {
        let m = new FirstCharacterMotion();
        m.Target = FirstCharacterMotion.Target.Current;
        this.action = new InsertTextAction(m);
    }

    // o
    private openNewLineBelowCurrentLineAndAppendText() {
        let a = new OpenNewLineAndAppendTextAction();
        this.action = a;
    }

    // O
    private openNewLineAboveCurrentLineAndAppendText() {
        let a = new OpenNewLineAndAppendTextAction();
        a.IsAbove = true;
        this.action = a;
    }

    // -----
    // Deleting text
    // -----

    // Nx
    private deleteCharactersUnderCursor() {
        let m = new RightMotion();
        m.Count = this.getNumStack();
        let a = new DeleteYankChangeAction();
        a.IsLarge = false;
        a.Motion = m;
        this.action = a;
    }

    // NX
    private deleteCharactersBeforeCursor() {
        let m = new RightMotion();
        m.IsLeftDirection = true;
        m.Count = this.getNumStack();
        let a = new DeleteYankChangeAction();
        a.IsLarge = false;
        a.Motion = m;
        this.action = a;
    }

    // dm
    private deleteTextWithMotion() {
        this.action = new DeleteYankChangeAction();
    }

    // {visual}d
    private deleteHighligtedText() {
        this.action = new DeleteYankChangeHighlightedTextAction();
    }

    // {visualLine}d
    private deleteHightlightedLineAction() {
        this.action = new DeleteYankChangeHighlightedLineAction();
    }

    // dd, yy, cc
    private doActionAtCurrentLine(key: String) {
        if (this.stackedKey !== key) {
            this.Clear();
            return;
        }
        let a = <IRequireMotionAction>this.action;
        a.IsLine = true;
        let count = 0;
        if (this.num !== 0) {
            count = this.num - 1;
        }
        let m = new DownMotion();
        m.Count = count;
        a.Motion = m;
    }

    // D
    private deleteTextToEndOfLine() {
        let m = new LastCharacterInLineMotion();
        m.Count = 1;
        let a = new DeleteYankChangeAction();
        a.IsLarge = false;
        a.Motion = m;
        this.action = a;
    }

    // -----
    // Copying and moving text
    // -----

    // ym
    private yankTextWithMotion() {
        let a = new DeleteYankChangeAction();
        a.IsOnlyYanc = true;
        this.action = a;
    }

    // {visual}y
    private yancSelectionAction() {
        let a = new DeleteYankChangeHighlightedTextAction();
        a.SetOnlyYancOption();
        this.action = a;
    }

    // {visualLine}y
    private yancLineSelectionAction() {
        let a = new DeleteYankChangeHighlightedLineAction();
        a.SetOnlyYancOption();
        this.action = a;
    }

    // Y
    private yankLine() {
        let m = new LastCharacterInLineMotion();
        m.Count = 1;
        let a = new DeleteYankChangeAction();
        a.IsLarge = false;
        a.IsLine = true;
        a.Motion = m;
        a.IsOnlyYanc = true;
        this.action = a;
    }

    // p
    private putRegisterAfterCursorPosition() {
        let a = new PutRegisterAction();
        a.Count = this.getNumStack();
        this.action = a;
    }

    // P
    private putRegisterBeforeCursorPosition() {
        let a = new PutRegisterAction();
        a.IsPrev = true;
        a.Count = this.getNumStack();
        this.action = a;
    }

    // -----
    // Changing text
    // -----

    // Nr{char}
    private replaceCharacterAction() {
        const a = new ReplaceCharacterAction();
        a.Count = this.getNumStack();
        a.IsAffectingLayout = true;
        this.action = a;
    }

    // Ngr{char}
    private replaceCharacterWithoutAffectingLayoutAction() {
        const a = new ReplaceCharacterAction();
        a.Count = this.getNumStack();
        a.IsAffectingLayout = false;
        this.action = a;
    }

    // {Visual}c{char}
    private replaceCharacterOfSelectedTextAction() {
        const a = new ReplaceCharacterOfSelectedTextAction();
        this.action = a;
    }

    // c{motion}
    private changeTextWithMotion() {
        let a = new DeleteYankChangeAction();
        a.IsChange = true;
        this.action = a;
    }

    // S
    private changeLines() {
        let m = new DownMotion();
        m.Count = this.getNumStack() - 1;
        let a = new DeleteYankChangeAction();
        a.IsLine = true;
        a.Motion = m;
        a.IsChange = true;
        this.action = a;
    }

    // C
    private changeTextToEndOfLine() {
        let m = new LastCharacterInLineMotion();
        m.Count = 1;
        let a = new DeleteYankChangeAction();
        a.IsLarge = false;
        a.Motion = m;
        a.IsChange = true;
        this.action = a;
    }

    // s
    private changeCharacters() {
        let m = new RightMotion();
        m.Count = 1;
        let a = new DeleteYankChangeAction();
        a.IsLarge = false;
        a.Motion = m;
        a.IsChange = true;
        this.action = a;
    }

    // {visual}c
    private changeHighlightedText() {
        let a = new DeleteYankChangeHighlightedTextAction();
        a.SetChangeOption();
        this.action = a;
    }

    // {visualLine}c
    private changeLineSelectionAction() {
        let a = new DeleteYankChangeHighlightedLineAction();
        a.SetChangeOption();
        this.action = a;
    }

    // -----
    // Complex changes
    // -----

    // -----
    // Visual mode
    // -----

    // v
    private startVisualMode() {
        this.action = new StartVisualModeAction();
    }

    // V
    private enterVisualLineModeAction() {
        this.action = new StartVisualLineModeAction();
    }

    // -----
    // Text objects (only in Visual mode or after an operator)
    // -----

    // -----
    // Repeating commands
    // -----

    // .
    private repeatLastChange() {
        this.action = new RepeatLastChangeAction();
    }

    // -----
    // other
    // -----

    private pushKeyAtRequireCharForMotion(key: string): IAction {
        const m = this.motion as IRequireCharacterMotion;
        m.CharacterCode = key.charCodeAt(0);
        return this.action;
    }

    private pushKeyAtRequireCharForAction(key: string): IAction {
        const a = this.action as IRequireCharAction;
        a.CharacterCode = key.charCodeAt(0);
        return this.action;
    }

    private pushKeyAtRequireCharForRegister(key: string): IAction {
        // TODO
        this.registerCharCode = key.charCodeAt(0);
        this.state = StateName.AtStart;
        return null;
    }


    private getNumStack() {
        return this.num === 0 ? 1 : this.num;
    }

    private stackNumber(key: string) {
        let n: number = parseInt(key, 10);
        this.num = this.num * 10 + n;
        if (this.num > 10000) {
            this.Clear();
        }
    }

    private createGotoAction(motion: IMotion) {
        let a = new GoAction();
        a.Motion = motion;
        return a;
    }

    private editorCommand(command: IVimStyleCommand) {
        let a = new CallEditorCommandAction();
        a.Argument = command.argument;
        a.Callback = command.callback;
        this.action = a;
    }

}
