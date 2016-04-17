import * as Utils from "../Utils";
import {InsertTextAction} from "../action/InsertTextAction";
import {OpenNewLineAndAppendTextAction} from "../action/OpenNewLineAndAppendTextAction";
import {PutRegisterAction} from "../action/PutRegisterAction";
import {DeleteYankChangeAction} from "../action/DeleteYankChangeAction";
import {GoAction} from "../action/GoAction";
import {GoDownAction} from "../action/MoveLineAction";
import {StartVisualModeAction} from "../action/StartVisualModeAction";
import {ExpandHighlightedTextAction} from "../action/ExpandSelectionAction";
import {DeleteYankChangeHighlightedTextAction} from "../action/DeleteYankChangeHighlightedTextAction";
import {StartVisualLineModeAction} from "../action/StartVisualLineModeAction";
import {ExpandHighlightedLineSelectionAction} from "../action/ExpandLineSelectionAction";
import {DeleteYankChangeHighlightedLineAction} from "../action/DeleteYankChangeHighlightedLineAction";
import {RepeatLastChangeAction} from "../action/RepeatLastChangeAction";
import {RightMotion} from "../motion/RightMotion";
import {DownMotion} from "../motion/DownMotion";
import {FirstCharacterInLineMotion} from "../motion/HomeMotion";
import {LastCharacterInLineMotion} from "../motion/EndMotion";
import {CharacterMotion} from "../motion/FindCharacterMotion";
import {WordMotion} from "../motion/WordMotion";
import {FirstCharacterMotion} from "../motion/FirstCharacterMotion";

export class CommandFactory implements ICommandFactory {

    private state: StateName;
    private action: IAction;
    private motion: CharacterMotion;
    private keyBindings: IKeyBindings;
    private stackedKey: string;
    private num: number;
    private commandString: string;

    constructor() {
        this.Clear();
    }

    public PushKey(keyChar: string, mode: VimMode): IAction {
        let command: IVimStyleCommand;
        if (mode === VimMode.Normal) {
            switch (this.state) {
                case StateName.AtStart:
                    command = this.keyBindings.AtStart[keyChar];
                    break;
                case StateName.FirstNum:
                    command = this.keyBindings.FirstNum[keyChar];
                    break;
                case StateName.RequireMotion:
                    command = this.keyBindings.RequireMotion[keyChar];
                    break;
                case StateName.RequireMotionNum:
                    command = this.keyBindings.RequireMotionNum[keyChar];
                    break;
                case StateName.RequireCharForMotion:
                    return this.pushKeyAtRequireCharForMotion(keyChar);
                case StateName.SmallG:
                    command = this.keyBindings.SmallG[keyChar];
                    break;
                case StateName.SmallGForMotion:
                    command = this.keyBindings.SmallGForMotion[keyChar];
                    break;
            }
        } else if (mode === VimMode.Visual) {
            switch (this.state) {
                case StateName.AtStart:
                    this.action = new ExpandHighlightedTextAction();
                    command = this.keyBindings.VisualMode[keyChar];
                    break;
                case StateName.RequireMotionNum:
                    command = this.keyBindings.RequireMotionNum[keyChar];
                    break;
                case StateName.RequireCharForMotion:
                    return this.pushKeyAtRequireCharForMotion(keyChar);
                case StateName.SmallGForMotion:
                    command = this.keyBindings.SmallGForMotion[keyChar];
                    break;
            }
        } else if (mode === VimMode.VisualLine) {
            switch (this.state) {
                case StateName.AtStart:
                    this.action = new ExpandHighlightedLineSelectionAction();
                    command = this.keyBindings.VisualLineMode[keyChar];
                    break;
                case StateName.RequireMotionNum:
                    command = this.keyBindings.RequireMotionNum[keyChar];
                    break;
                case StateName.RequireCharForMotion:
                    return this.pushKeyAtRequireCharForMotion(keyChar);
                case StateName.SmallGForMotion:
                    command = this.keyBindings.SmallGForMotion[keyChar];
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
        this.commandString += keyChar;
        this.state = command.state;
        return null;
    }

    public Clear() {
        this.state = StateName.AtStart;
        this.action = null;
        this.stackedKey = null;
        this.num = 0;
        this.commandString = "";
    }

    public GetCommandString(): string {
        return this.commandString;
    }

    public SetKeyBindings(keyBindings: IKeyBindings) {
        this.keyBindings = keyBindings;
    }

    private createVimStyleCommand(key: string, command: IVimStyleCommand) {

        switch (command.cmd) {

            // sorted and categorised by quickref.md

            // ** Left-right motions **
            // Nj Nl
            case VimCommand.gotoRight:
                this.gotoRight(command.isReverse);
                return;
            // cNj cNl
            case VimCommand.rightMotion:
                this.addRightMotion(command.isReverse);
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
            // Nf{char} NF{char}
            case VimCommand.gotoCharacterToRight:
                this.gotoCharacterToRight(command.isReverse);
                return;
            // cNf{char} cNF{char}
            case VimCommand.characterToRightMotion:
                this.addCharacterToRightMotion(command.isReverse);
                return;
            // Nt{char} NT{char}
            case VimCommand.goTillBeforeCharacterToRight:
                this.goTillBeforeCharacterToRight(command.isReverse);
                return;
            //  cNt{char} cNT{char}
            case VimCommand.tillBeforeCharToRightMotion:
                this.addTillCharacterMotion(command.isReverse);
                return;

            // ** Up-down motions **
            // Nk Nj
            case VimCommand.goDown:
                this.gotoDown(command.isReverse);
                return;
            // cNk cNj
            case VimCommand.downMotion:
                this.addDownMotion(command.isReverse);
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
            // G
            case VimCommand.gotoLastLine:
                this.gotoLastLine();
                return;
            // cG
            case VimCommand.lastLineMotion:
                this.addLastLineMotion();
                return;

            // ** Text object motions **
            // w
            case VimCommand.gotoWordFoward:
                this.gotoWordFoward(false, false, false, false);
                return;
            // cw
            case VimCommand.wordForwardMotion:
                this.addWordMotion(false, false, true, false);
                return;
            // W
            case VimCommand.gotoBlankSeparated:
                this.gotoWordFoward(false, false, true, false);
                return;
            // cW
            case VimCommand.blankSeparatedMotion:
                this.addWordMotion(false, true, false, false);
                return;
            // e
            case VimCommand.gotoForwardToEndOfWold:
                this.gotoWordFoward(false, true, false, true);
                return;
            // ce
            case VimCommand.motion_endOfWord:
                this.addWordMotion(false, true, false, true);
                break;
            // E
            case VimCommand.gotoForwardToEndOfBlankSeparated:
                this.gotoWordFoward(false, true, true, true);
                return;
            // cE
            case VimCommand.endOfBlankSeparatedMotion:
                this.addWordMotion(false, true, true, true);
                break;
            // b
            case VimCommand.gotoWordBackword:
                this.gotoWordFoward(true, true, false, false);
                return;
            // cb
            case VimCommand.wordBackwardMotion:
                this.addWordMotion(true, true, false, false);
                break;
            // B
            case VimCommand.gotoBlankSepalated:
                this.gotoWordFoward(true, true, true, false);
                return;
            // cB
            case VimCommand.blankSeparatedBackwordMotion:
                this.addWordMotion(true, true, true, false);
                break;

            // ** Pattern searches **

            // ** Marks and motions **

            // ** Various motions **

            // ** Scrolling **

            // ** Inserting text **
            // Ni
            case VimCommand.appendTextAfterCursor:
                this.appendTextAfterCursor();
                return;
            // NI
            case VimCommand.appendTextAtEndOfLine:
                this.appendTextAtEndOfLine();
                return;
            // Na
            case VimCommand.insertTextBeforeCursor:
                this.insertTextBeforeCursor();
                return;
            // NA
            case VimCommand.insertTextBeforeFirstNonBlankInLine:
                this.insertTextBeforeFirstNonBlankInLine();
                return;
            // No NO
            case VimCommand.openNewLineBelowCurrentLineAndAppnedText:
                this.openNewLineBelowCurrentLineAndAppendText(command.isReverse);
                return;

            // ** Deleting text **
            // Nx
            case VimCommand.deleteCharactersUnderCursor:
                this.deleteCharactersUnderCursor(command.isReverse);
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
            case VimCommand.deleteHighlitedLine:
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
            // Np NP
            case VimCommand.putRegisterAfterCursorPosition:
                this.putRegisterAfterCursorPosition(command.isReverse);
                return;

            // ** Changing text **
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
            case VimCommand.repeatLastChange:
                this.repeatLastChange();
                return;

            // other
            case VimCommand.stackNumber:
                this.stackNumber(key);
            case VimCommand.nothing:
                return;
        }
    }

    // sorted and categorised by quickref.md

    // -----
    // Left-right motions
    // -----

    // h l
    private gotoRight(isLeft: boolean) {
        let m = new RightMotion();
        if (isLeft) {
            m.SetLeftDirection();
        };
        m.SetCount(this.getNumStack());
        this.action = this.createGotoAction(m);
    }

    // ch cl
    private addRightMotion(isLeft: boolean) {
        let m = new RightMotion();
        if (isLeft) {
            m.SetLeftDirection();
        };
        m.SetCount(this.getNumStack());
        let a = <IRequireMotionAction>this.action;
        a.SetMotion(m);
    }

    // 0
    private gotoFirstCharacterInLine() {
        this.action = this.createGotoAction(new FirstCharacterInLineMotion());
    }

    // c0
    private addFirstCharacterInLineMotion() {
        let a = <IRequireMotionAction>this.action;
        a.SetMotion(new FirstCharacterInLineMotion());
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
        a.SetMotion(m);
    }

    // c$
    private addLastCharacterInLineMotion() {
        let a = <IRequireMotionAction>this.action;
        a.SetMotion(new LastCharacterInLineMotion());
    }

    // $
    private gotoLastCharacterInLine() {
        this.action = this.createGotoAction(new LastCharacterInLineMotion());
    }

    // fx Fx
    private gotoCharacterToRight(isReverse) {
        let a = new GoAction();
        let m: CharacterMotion;
        if (isReverse) {
            m = new CharacterMotion(Direction.Left);
        } else {
            m = new CharacterMotion(Direction.Right);
        }
        m.SetCount(this.getNumStack());
        a.SetMotion(m);
        this.action = a;
        this.motion = m;
    }

    // tx Tx
    private goTillBeforeCharacterToRight(isReverse) {
        let a = new GoAction();
        let m: CharacterMotion;
        if (isReverse) {
            m = new CharacterMotion(Direction.Left);
        } else {
            m = new CharacterMotion(Direction.Right);
        }
        m.SetCount(this.getNumStack());
        m.SetTillOption();
        a.SetMotion(m);
        this.action = a;
        this.motion = m;
    }

    // cfx cFx
    private addCharacterToRightMotion(isReverse) {
        let m: CharacterMotion;
        if (isReverse) {
            m = new CharacterMotion(Direction.Left);
        } else {
            m = new CharacterMotion(Direction.Right);
            m.SetContainTargetCharOption();
        }
        m.SetCount(this.getNumStack());
        let a = <IRequireMotionAction>this.action;
        a.SetMotion(m);
        this.motion = m;
    }

    // ctx cTx
    private addTillCharacterMotion(isReverse) {
        let m: CharacterMotion;
        if (isReverse) {
            m = new CharacterMotion(Direction.Left);
        } else {
            m = new CharacterMotion(Direction.Right);
            m.SetContainTargetCharOption();
        }
        m.SetCount(this.getNumStack());
        m.SetTillOption();
        let a = <IRequireMotionAction>this.action;
        a.SetMotion(m);
        this.motion = m;
    }

    // -----
    // Up-down motions
    // -----

    // j k
    private gotoDown(isUp: boolean) {
        let m = new DownMotion();
        if (isUp) {
            m.SetUpDirection();
        }
        m.SetCount(this.getNumStack());
        let a = new GoDownAction();
        a.SetMotion(m);
        this.action = a;
    }

    // cj ck
    private addDownMotion(isUp: boolean) {
        let m = new DownMotion();
        if (isUp) {
            m.SetUpDirection();
        }
        m.SetCount(this.getNumStack());
        let a = <IRequireMotionAction>this.action;
        a.SetMotion(m);
        a.SetLineOption();
    }

    // G
    private gotoLastLine() {
        let a = new GoAction();
        let m = new FirstCharacterMotion();
        m.Target = FirstCharacterMotion.Target.Last;
        a.SetMotion(m);
        this.action = a;
    }

    // cG
    private addLastLineMotion() {
        let m = new FirstCharacterMotion();
        m.Target = FirstCharacterMotion.Target.Last;
        let a = <IRequireMotionAction>this.action;
        a.SetMotion(m);
        a.SetLineOption();
    }

    // NG
    private gotoLine() {
        let a = new GoAction();
        let m = new FirstCharacterMotion();
        m.SetCount(this.getNumStack() - 1);
        a.SetMotion(m);
        this.action = a;
    }

    // cNG
    private addLineMotion() {
        let m = new FirstCharacterMotion();
        m.SetCount(this.getNumStack() - 1);
        let a = <IRequireMotionAction>this.action;
        a.SetMotion(m);
        a.SetLineOption();
    }

    // gg
    private gotoFirstLineOnFirstNonBlankCharacter() {
        let a = new GoAction();
        let m = new FirstCharacterMotion();
        m.Target = FirstCharacterMotion.Target.First;
        a.SetMotion(m);
        this.action = a;
    }

    // cgg
    private addFirstLineMotion() {
        let m = new FirstCharacterMotion();
        m.Target = FirstCharacterMotion.Target.First;
        let a = <IRequireMotionAction>this.action;
        a.SetMotion(m);
        a.SetLineOption();
    }

    // -----
    // Text object motions
    // -----

    // w b e W B E
    private gotoWordFoward(isReverse: boolean, isWordEnd: boolean, isWORD: boolean, isSkipBlankLine) {
        let m: WordMotion;
        if (isReverse) {
            m = new WordMotion(Direction.Left);
        } else {
            m = new WordMotion(Direction.Right);
        }
        m.IsWordEnd = isWordEnd;
        m.IsWORD = isWORD;
        m.IsSkipBlankLine = isSkipBlankLine;
        m.SetCount(this.getNumStack());
        this.action = this.createGotoAction(m);
    }

    // cw cb ce cW cB cE
    private addWordMotion(isReverse: boolean, isWordEnd: boolean, isWORD: boolean, isSkipBlankLine: boolean) {
        let m: WordMotion;
        if (isReverse) {
            m = new WordMotion(Direction.Left);
        } else {
            m = new WordMotion(Direction.Right);
        }
        m.IsWordEnd = isWordEnd;
        m.IsWORD = isWORD;
        m.IsSkipBlankLine = isSkipBlankLine;
        m.IsForRange = true;
        m.SetCount(this.getNumStack());
        let a = <IRequireMotionAction>this.action;
        a.SetMotion(m);
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
        m.SetCount(1);
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

    // o O    
    private openNewLineBelowCurrentLineAndAppendText(isAbove: boolean) {
        let a = new OpenNewLineAndAppendTextAction();
        if (isAbove) {
            a.SetAboveOption();
        }
        this.action = a;
    }

    // -----
    // Deleting text
    // -----

    // x Nx X NX
    private deleteCharactersUnderCursor(isLeft: boolean) {
        let m = new RightMotion();
        if (isLeft) {
            m.SetLeftDirection();
        }
        m.SetCount(this.getNumStack());
        let a = new DeleteYankChangeAction();
        a.SetSmallOption();
        a.SetMotion(m);
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
        a.SetLineOption();
        let count = 0;
        if (this.num !== 0) {
            count = this.num - 1;
        }
        let m = new DownMotion();
        m.SetCount(count);
        a.SetMotion(m);
    }

    // D
    private deleteTextToEndOfLine() {
        let m = new LastCharacterInLineMotion();
        m.SetCount(1);
        let a = new DeleteYankChangeAction();
        a.SetSmallOption();
        a.SetMotion(m);
        this.action = a;
    }

    // -----
    // Copying and moving text
    // -----

    // ym
    private yankTextWithMotion() {
        let a = new DeleteYankChangeAction();
        a.SetOnlyYancOption();
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
        m.SetCount(1);
        let a = new DeleteYankChangeAction();
        a.SetSmallOption();
        a.SetMotion(m);
        a.SetOnlyYancOption();
        this.action = a;
    }

    // p P Np NP
    private putRegisterAfterCursorPosition(isBack: boolean) {
        let a = new PutRegisterAction();
        if (isBack) {
            a.SetBackOption();
        }
        a.SetCount(this.getNumStack());
        this.action = a;
    }

    // -----
    // Changing text
    // -----

    // c{motion}
    private changeTextWithMotion() {
        let a = new DeleteYankChangeAction();
        a.SetChangeOption();
        this.action = a;
    }

    // S
    private changeLines() {
        let m = new DownMotion();
        m.SetCount(this.getNumStack() - 1);
        let a = new DeleteYankChangeAction();
        a.SetLineOption();
        a.SetMotion(m);
        a.SetChangeOption();
        this.action = a;
    }

    // C
    private changeTextToEndOfLine() {
        let m = new LastCharacterInLineMotion();
        m.SetCount(1);
        let a = new DeleteYankChangeAction();
        a.SetSmallOption();
        a.SetMotion(m);
        a.SetChangeOption();
        this.action = a;
    }

    // s
    private changeCharacters() {
        let m = new RightMotion();
        m.SetCount(1);
        let a = new DeleteYankChangeAction();
        a.SetSmallOption();
        a.SetMotion(m);
        a.SetChangeOption();
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
        this.motion.SetChar(key);
        return this.action;
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
        a.SetMotion(motion);
        return a;
    }

}