import * as Utils from "../Utils";
import {InsertTextAction} from "../action/InsertTextAction";
import {InsertLineBelowAction} from "../action/InsertLineBelowAction";
import {PasteAction} from "../action/PasteAction";
import {DeleteAction} from "../action/DeleteAction";
import {MoveAction} from "../action/MoveAction";
import {MoveLineAction} from "../action/MoveLineAction";
import {ApplyVisualModeAction} from "../action/ApplyVisualModeAction";
import {ExpandSelectionAction} from "../action/ExpandSelectionAction";
import {DeleteSelectionAction} from "../action/DeleteSelectionAction";
import {ApplyVisualLineModeAction} from "../action/ApplyVisualLineModeAction";
import {ExpandLineSelectionAction} from "../action/ExpandLineSelectionAction";
import {DeleteLineSelectionAction} from "../action/DeleteLineSelectionAction";
import {RepeatAction} from "../action/RepeatAction";
import {RightMotion} from "../motion/RightMotion";
import {DownMotion} from "../motion/DownMotion";
import {HomeMotion} from "../motion/HomeMotion";
import {EndMotion} from "../motion/EndMotion";
import {FindCharacterMotion} from "../motion/FindCharacterMotion";
import {WordMotion} from "../motion/WordMotion";
import {FirstCharacterMotion} from "../motion/FirstCharacterMotion";

export class CommandFactory implements ICommandFactory {

    private state: StateName;
    private action: IAction;
    private motion: FindCharacterMotion;
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
                    this.action = new ExpandSelectionAction();
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
                    this.action = new ExpandLineSelectionAction();
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
            // single action
            case VimCommand.insertTextBeforeCursor:
                this.insertTextBeforeCursor();
                return;
            case VimCommand.appendTextAfterCursor:
                this.appendTextAfterCursor();
                return;
            case VimCommand.insertTextBeforeFirstNonBlankInLine:
                this.insertTextBeforeFirstNonBlankInLine();
                return;
            case VimCommand.appendTextAtEndOfLine:
                this.appendTextAtEndOfLine();
                return;
            case VimCommand.openNewLineBelowCurrentLineAndAppnedText:
                this.openNewLineBelowCurrentLineAndAppendText(command.isReverse);
                return;
            case VimCommand.deleteCharactersUnderCursor:
                this.deleteCharactersUnderCursor(command.isReverse);
                return;
            case VimCommand.changeCharacters:
                this.changeCharacters();
                return;
            case VimCommand.changeToEndOfLine:
                this.changeToEndOfLine();
                return;

            // move action
            case VimCommand.putRegisterAfterCursorPosition:
                this.putRegisterAfterCursorPosition(command.isReverse);
                return;
            case VimCommand.gotoRight:
                this.gotoRight(command.isReverse);
                return;
            case VimCommand.gotoDownLine:
                this.gotoDownLine(command.isReverse);
                return;
            case VimCommand.gotoWordFoward:
                this.gotoWordFoward(false, false, false, false);
                return;
            case VimCommand.gotoBlankSeparated:
                this.gotoWordFoward(false, false, true, false);
                return;
            case VimCommand.gotoWords:
                this.gotoWordFoward(true, true, false, false);
                return;
            case VimCommand.gotoBlankSepalated:
                this.gotoWordFoward(true, true, true, false);
                return;
            case VimCommand.gotoForwardToEndOfWold:
                this.gotoWordFoward(false, true, false, true);
                return;
            case VimCommand.gotoForwardToEndOfBlankSeparated:
                this.gotoWordFoward(false, true, true, true);
                return;
            case VimCommand.gotoFirstCharacterInLine:
                this.gotoFirstCharacterInLine();
                return;
            case VimCommand.gotoLastCharacterInLine:
                this.gotoLastCharacterInLine();
                return;
            case VimCommand.gotoFirstNonBlankCharacterInLine:
                this.gotoFirstNonBlankCharacterInLine();
                return;
            case VimCommand.gotoCharacterToRight:
                this.gotoCharacterToRight(command.isReverse);
                return;
            case VimCommand.goTillBeforeCharacterToRight:
                this.goTillBeforeCharacterToRight(command.isReverse);
                return;
            case VimCommand.gotoLine:
                this.gotoLine();
                return;
            case VimCommand.gotoLastLine:
                this.gotoLastLine();
                return;
            case VimCommand.gotoFirstLineOnFirstNonBlankCharacter:
                this.gotoFirstLineOnFirstNonBlankCharacter();
                return;

            // motion
            case VimCommand.rightMotion:
                this.addRightMotion(command.isReverse);
                return;
            case VimCommand.downLineMotion:
                this.addDownLineMotion(command.isReverse);
                return;
            case VimCommand.wordForwardMotion:
                this.addWordMotion(false, false, false, false);
                return;
            case VimCommand.wordForwardMotion:
                this.addWordMotion(false, false, true, false);
                return;
            case VimCommand.wordsBackwardMotion:
                this.addWordMotion(true, true, false, false);
                break;
            case VimCommand.motion_BlankSeparatedBackWard:
                this.addWordMotion(true, true, true, false);
                break;
            case VimCommand.motion_endOfWord:
                this.addWordMotion(false, true, false, true);
                break;
            case VimCommand.endOfBlankSeparatedMotion:
                this.addWordMotion(false, true, true, true);
                break;
            case VimCommand.firstCharacterInLineMotion:
                this.addFirstCharacterInLineMotion();
                return;
            case VimCommand.lastCharacterInLineMotion:
                this.addLastCharacterInLineMotion();
                return;
            case VimCommand.firstNonBlankCharacterInLineMotion:
                this.addFirstNonBlankCharacterInLineMotion();
                return;
            case VimCommand.characterToRightMotion:
                this.addCharacterToRightMotion(command.isReverse);
                return;
            case VimCommand.tillBeforeCharToRightMotion:
                this.addTillCharacterMotion(command.isReverse);
                return;
            case VimCommand.lineMotion:
                this.addLineMotion();
                return;
            case VimCommand.lastLineMotion:
                this.addLastLineMotion();
                return;
            case VimCommand.firstLineMotion:
                this.addFirstLineMotion();
                return;

            // delete, yanc, change action
            case VimCommand.changeTextWithMotion:
                this.changeTextWithMotion();
                return;
            case VimCommand.deleteTextWithMotion:
                this.deleteTextWithMotion();
                return;
            case VimCommand.yankTextWithMotion:
                this.yankTextWithMotion();
                return;
            case VimCommand.changeTextToEndOfLine:
                this.changeTextToEndOfLine();
                return;
            case VimCommand.deleteTextToEndOfLine:
                this.deleteTextToEndOfLine();
                return;
            case VimCommand.yankLine:
                this.yankLine();
                return;
            case VimCommand.doActionAtCurrentLine:
                this.doActionAtCurrentLine(key);
                return;

            // visual mode
            case VimCommand.startVisualMode:
                this.startVisualMode();
                return;
            case VimCommand.deleteHighlightedText:
                this.deleteHighligtedText();
                return;
            case VimCommand.changeHighlightedText:
                this.changeHighlightedText();
                return;
            case VimCommand.yankHighlightedText:
                this.yancSelectionAction();
                return;

            // line visual mode
            case VimCommand.startVisualLineMode:
                this.enterVisualLineModeAction();
                return;
            case VimCommand.deleteHighlitedLine:
                this.deleteLineSelectionAction();
                return;
            case VimCommand.changeHighligtedLine:
                this.changeLineSelectionAction();
                return;
            case VimCommand.deleteHighlitedLine:
                this.deleteLineSelectionAction();
                return;
            case VimCommand.yankHighlightedLine:
                this.yancLineSelectionAction();
                return;

            // special
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

    private pushKeyAtRequireCharForMotion(key: string): IAction {
        this.motion.SetChar(key);
        return this.action;
    }

    private getNumStack() {
        return this.num === 0 ? 1 : this.num;
    }

    // .
    private repeatLastChange() {
        this.action = new RepeatAction();
    }

    // i    
    private insertTextBeforeCursor() {
        this.action = new InsertTextAction();
    }

    // a    
    private appendTextAfterCursor() {
        let m = new RightMotion();
        m.SetCount(1);
        this.action = new InsertTextAction(m);
    }

    // I
    private insertTextBeforeFirstNonBlankInLine() {
        let m = new FirstCharacterMotion();
        m.Target = FirstCharacterMotion.Target.Current;
        this.action = new InsertTextAction(m);
    }

    // A    
    private appendTextAtEndOfLine() {
        let m = new EndMotion();
        this.action = new InsertTextAction(m);
    }

    // o O    
    private openNewLineBelowCurrentLineAndAppendText(isAbove: boolean) {
        let a = new InsertLineBelowAction();
        if (isAbove) {
            a.SetAboveOption();
        }
        this.action = a;
    }

    // x Nx
    private deleteCharactersUnderCursor(isLeft: boolean) {
        let m = new RightMotion();
        if (isLeft) {
            m.SetLeftDirection();
        }
        m.SetCount(this.getNumStack());
        let a = new DeleteAction();
        a.SetSmallOption();
        a.SetMotion(m);
        this.action = a;
    }

    // s
    private changeCharacters() {
        let m = new RightMotion();
        m.SetCount(1);
        let a = new DeleteAction();
        a.SetSmallOption();
        a.SetMotion(m);
        a.SetChangeOption();
        this.action = a;
    }

    // S
    private changeToEndOfLine() {
        let m = new DownMotion();
        m.SetCount(this.getNumStack() - 1);
        let a = new DeleteAction();
        a.SetLineOption();
        a.SetMotion(m);
        a.SetChangeOption();
        this.action = a;
    }

    // p P Np NP
    private putRegisterAfterCursorPosition(isBack: boolean) {
        let a = new PasteAction();
        if (isBack) {
            a.SetBackOption();
        }
        a.SetCount(this.getNumStack());
        this.action = a;
    }

    // j k
    private gotoDownLine(isUp: boolean) {
        let m = new DownMotion();
        if (isUp) {
            m.SetUpDirection();
        }
        m.SetCount(this.getNumStack());
        let a = new MoveLineAction();
        a.SetMotion(m);
        this.action = a;
    }

    private createMoveAction(motion: IMotion) {
        let a = new MoveAction();
        a.SetMotion(motion);
        return a;
    }

    // h l
    private gotoRight(isLeft: boolean) {
        let m = new RightMotion();
        if (isLeft) {
            m.SetLeftDirection();
        };
        m.SetCount(this.getNumStack());
        this.action = this.createMoveAction(m);
    }

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
        this.action = this.createMoveAction(m);
    }

    // 0
    private gotoFirstCharacterInLine() {
        this.action = this.createMoveAction(new HomeMotion());
    }

    // $
    private gotoLastCharacterInLine() {
        this.action = this.createMoveAction(new EndMotion());
    }

    // ^
    private gotoFirstNonBlankCharacterInLine() {
        let m = new FirstCharacterMotion();
        m.Target = FirstCharacterMotion.Target.Current;
        this.action = this.createMoveAction(m);
    }

    // fx Fx
    private gotoCharacterToRight(isReverse) {
        let a = new MoveAction();
        let m: FindCharacterMotion;
        if (isReverse) {
            m = new FindCharacterMotion(Direction.Left);
        } else {
            m = new FindCharacterMotion(Direction.Right);
        }
        m.SetCount(this.getNumStack());
        a.SetMotion(m);
        this.action = a;
        this.motion = m;
    }

    // tx Tx
    private goTillBeforeCharacterToRight(isReverse) {
        let a = new MoveAction();
        let m: FindCharacterMotion;
        if (isReverse) {
            m = new FindCharacterMotion(Direction.Left);
        } else {
            m = new FindCharacterMotion(Direction.Right);
        }
        m.SetCount(this.getNumStack());
        m.SetTillOption();
        a.SetMotion(m);
        this.action = a;
        this.motion = m;
    }

    // Ng
    private gotoLine() {
        let a = new MoveAction();
        let m = new FirstCharacterMotion();
        m.SetCount(this.getNumStack() - 1);
        a.SetMotion(m);
        this.action = a;
    }

    // G
    private gotoLastLine() {
        let a = new MoveAction();
        let m = new FirstCharacterMotion();
        m.Target = FirstCharacterMotion.Target.Last;
        a.SetMotion(m);
        this.action = a;
    }

    // gg
    private gotoFirstLineOnFirstNonBlankCharacter() {
        let a = new MoveAction();
        let m = new FirstCharacterMotion();
        m.Target = FirstCharacterMotion.Target.First;
        a.SetMotion(m);
        this.action = a;
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

    // cj ck
    private addDownLineMotion(isUp: boolean) {
        let m = new DownMotion();
        if (isUp) {
            m.SetUpDirection();
        }
        m.SetCount(this.getNumStack());
        let a = <IRequireMotionAction>this.action;
        a.SetMotion(m);
        a.SetLineOption();
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

    // c0
    private addFirstCharacterInLineMotion() {
        let a = <IRequireMotionAction>this.action;
        a.SetMotion(new HomeMotion());
    }

    // c$
    private addLastCharacterInLineMotion() {
        let a = <IRequireMotionAction>this.action;
        a.SetMotion(new EndMotion());
    }

    // c^
    private addFirstNonBlankCharacterInLineMotion() {
        let a = <IRequireMotionAction>this.action;
        let m = new FirstCharacterMotion();
        m.Target = FirstCharacterMotion.Target.Current;
        a.SetMotion(m);
    }

    // fx Fx
    private addCharacterToRightMotion(isReverse) {
        let m: FindCharacterMotion;
        if (isReverse) {
            m = new FindCharacterMotion(Direction.Left);
        } else {
            m = new FindCharacterMotion(Direction.Right);
            m.SetContainTargetCharOption();
        }
        m.SetCount(this.getNumStack());
        let a = <IRequireMotionAction>this.action;
        a.SetMotion(m);
        this.motion = m;
    }

    // tx Tx
    private addTillCharacterMotion(isReverse) {
        let m: FindCharacterMotion;
        if (isReverse) {
            m = new FindCharacterMotion(Direction.Left);
        } else {
            m = new FindCharacterMotion(Direction.Right);
            m.SetContainTargetCharOption();
        }
        m.SetCount(this.getNumStack());
        m.SetTillOption();
        let a = <IRequireMotionAction>this.action;
        a.SetMotion(m);
        this.motion = m;
    }

    // cNg
    private addLineMotion() {
        let m = new FirstCharacterMotion();
        m.SetCount(this.getNumStack() - 1);
        let a = <IRequireMotionAction>this.action;
        a.SetMotion(m);
        a.SetLineOption();
    }

    // cG
    private addLastLineMotion() {
        let m = new FirstCharacterMotion();
        m.Target = FirstCharacterMotion.Target.Last;
        let a = <IRequireMotionAction>this.action;
        a.SetMotion(m);
        a.SetLineOption();
    }

    // cgg
    private addFirstLineMotion() {
        let m = new FirstCharacterMotion();
        m.Target = FirstCharacterMotion.Target.First;
        let a = <IRequireMotionAction>this.action;
        a.SetMotion(m);
        a.SetLineOption();
    }

    // cm 
    private changeTextWithMotion() {
        let a = new DeleteAction();
        a.SetChangeOption();
        this.action = a;
    }

    // dm
    private deleteTextWithMotion() {
        this.action = new DeleteAction();
    }

    // ym
    private yankTextWithMotion() {
        let a = new DeleteAction();
        a.SetOnlyYancOption();
        this.action = a;
    }

    // C
    private changeTextToEndOfLine() {
        let m = new EndMotion();
        m.SetCount(1);
        let a = new DeleteAction();
        a.SetSmallOption();
        a.SetMotion(m);
        a.SetChangeOption();
        this.action = a;
    }

    // D
    private deleteTextToEndOfLine() {
        let m = new EndMotion();
        m.SetCount(1);
        let a = new DeleteAction();
        a.SetSmallOption();
        a.SetMotion(m);
        this.action = a;
    }

    // Y
    private yankLine() {
        let m = new EndMotion();
        m.SetCount(1);
        let a = new DeleteAction();
        a.SetSmallOption();
        a.SetMotion(m);
        a.SetOnlyYancOption();
        this.action = a;
    }

    private stackNumber(key: string) {
        let n: number = parseInt(key, 10);
        this.num = this.num * 10 + n;
        if (this.num > 10000) {
            this.Clear();
        }
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

    // v
    private startVisualMode() {
        this.action = new ApplyVisualModeAction();
    }

    // v...c
    private changeHighlightedText() {
        let a = new DeleteSelectionAction();
        a.SetChangeOption();
        this.action = a;
    }

    // v...d
    private deleteHighligtedText() {
        this.action = new DeleteSelectionAction();
    }

    // v...y
    private yancSelectionAction() {
        let a = new DeleteSelectionAction();
        a.SetOnlyYancOption();
        this.action = a;
    }

    // V
    private enterVisualLineModeAction() {
        this.action = new ApplyVisualLineModeAction();
    }

    // V...c
    private changeLineSelectionAction() {
        let a = new DeleteLineSelectionAction();
        a.SetChangeOption();
        this.action = a;
    }

    // V...d
    private deleteLineSelectionAction() {
        this.action = new DeleteLineSelectionAction();
    }

    // V...y
    private yancLineSelectionAction() {
        let a = new DeleteLineSelectionAction();
        a.SetOnlyYancOption();
        this.action = a;
    }
}