import * as Utils from "../Utils";
import {ApplyInsertModeAction} from "../action/ApplyInsertModeAction";
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
            case VimCommand.insertCurrentPositionAction:
                this.insertCurrentPositionAction();
                return;
            case VimCommand.appendCurrentPositionAction:
                this.appendCurrentPositionAction();
                return;
            case VimCommand.insertHomeAction:
                this.insertHomeAction();
                return;
            case VimCommand.appendEndAction:
                this.appendEndAction();
                return;
            case VimCommand.insertLineBelowAction:
                this.insertLineBelowAction(command.isReverse);
                return;
            case VimCommand.deleteCharacterAction:
                this.deleteCharacterAction(command.isReverse);
                return;
            case VimCommand.changeCharacterAction:
                this.changeCharacterAction();
                return;
            case VimCommand.changeLineAction:
                this.changeLineAction();
                return;

            // move action
            case VimCommand.pasteBelowAction:
                this.pasteBelowAction(command.isReverse);
                return;
            case VimCommand.moveRightAction:
                this.moveRightAction(command.isReverse);
                return;
            case VimCommand.moveLineAction:
                this.moveLineAction(command.isReverse);
                return;
            case VimCommand.moveWordAction:
                this.moveWordAction(false, false, false, false);
                return;
            case VimCommand.moveWORDAction:
                this.moveWordAction(false, false, true, false);
                return;
            case VimCommand.moveBackWordAction:
                this.moveWordAction(true, true, false, false);
                return;
            case VimCommand.moveBackWORDAction:
                this.moveWordAction(true, true, true, false);
                return;
            case VimCommand.moveWordEndAction:
                this.moveWordAction(false, true, false, true);
                return;
            case VimCommand.moveWORDEndAction:
                this.moveWordAction(false, true, true, true);
                return;
            case VimCommand.moveHomeAction:
                this.moveHomeAction();
                return;
            case VimCommand.moveEndAction:
                this.moveEndAction();
                return;
            case VimCommand.moveFirstNonBlankCharAction:
                this.moveFirstNonBlankCharAction();
                return;
            case VimCommand.moveFindCharacterAction:
                this.moveFindCharacterAction(command.isReverse);
                return;
            case VimCommand.moveTillCharacterAction:
                this.moveTillCharacterAction(command.isReverse);
                return;
            case VimCommand.moveGotoLineAction:
                this.moveGotoLineAction();
                return;
            case VimCommand.moveLastLineAction:
                this.moveLastLineAction();
                return;
            case VimCommand.moveFirstLineAction:
                this.moveFirstLineAction();
                return;

            // motion
            case VimCommand.rightMotion:
                this.rightMotion(command.isReverse);
                return;
            case VimCommand.lineMotion:
                this.lineMotion(command.isReverse);
                return;
            case VimCommand.wordMotion:
                this.wordMotion(false, false, false, false);
                return;
            case VimCommand.wordMotion:
                this.wordMotion(false, false, true, false);
                return;
            case VimCommand.backWordMotion:
                this.wordMotion(true, true, false, false);
                break;
            case VimCommand.backWORDMotion:
                this.wordMotion(true, true, true, false);
                break;
            case VimCommand.wordEndMotion:
                this.wordMotion(false, true, false, true);
                break;
            case VimCommand.WORDEndMotion:
                this.wordMotion(false, true, true, true);
                break;
            case VimCommand.homeMotion:
                this.homeMotion();
                return;
            case VimCommand.endMotion:
                this.endMotion();
                return;
            case VimCommand.firstNonBlankCharMotion:
                this.firstNonBlankCharMotion();
                return;
            case VimCommand.findCharacterMotion:
                this.findCharacterMotion(command.isReverse);
                return;
            case VimCommand.tillCharacterMotion:
                this.tillCharacterMotion(command.isReverse);
                return;
            case VimCommand.gotoLineMotion:
                this.gotoLineMotion();
                return;
            case VimCommand.lastLineMotion:
                this.lastLineMotion();
                return;
            case VimCommand.firstLineMotion:
                this.firstLineMotion();
                return;

            // delete, yanc, change action
            case VimCommand.changeAction:
                this.changeAction();
                return;
            case VimCommand.deleteAction:
                this.deleteAction();
                return;
            case VimCommand.yancAction:
                this.yancAction();
                return;
            case VimCommand.changeToEndAction:
                this.changeToEndAction();
                return;
            case VimCommand.deleteToEndAction:
                this.deleteToEndAction();
                return;
            case VimCommand.yancToEndAction:
                this.yancToEndAction();
                return;
            case VimCommand.doActionAtCurrentLine:
                this.doActionAtCurrentLine(key);
                return;

            // visual mode
            case VimCommand.enterVisualModeAction:
                this.enterVisualModeAction();
                return;
            case VimCommand.deleteSelectionAction:
                this.deleteSelectionAction();
                return;
            case VimCommand.changeSelectionAction:
                this.changeSelectionAction();
                return;
            case VimCommand.deleteSelectionAction:
                this.deleteSelectionAction();
                return;
            case VimCommand.yancSelectionAction:
                this.yancSelectionAction();
                return;

            // line visual mode
            case VimCommand.enterVisualLineModeAction:
                this.enterVisualLineModeAction();
                return;
            case VimCommand.deleteLineSelectionAction:
                this.deleteLineSelectionAction();
                return;
            case VimCommand.changeLineSelectionAction:
                this.changeLineSelectionAction();
                return;
            case VimCommand.deleteLineSelectionAction:
                this.deleteLineSelectionAction();
                return;
            case VimCommand.yancLineSelectionAction:
                this.yancLineSelectionAction();
                return;

            // special
            case VimCommand.repeat:
                this.repeatAction();
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
    private repeatAction() {
        this.action = new RepeatAction();
    }

    // i    
    private insertCurrentPositionAction() {
        this.action = new ApplyInsertModeAction();
    }

    // a    
    private appendCurrentPositionAction() {
        let m = new RightMotion();
        m.SetCount(1);
        this.action = new ApplyInsertModeAction(m);
    }

    // I
    private insertHomeAction() {
        let m = new FirstCharacterMotion();
        m.Target = FirstCharacterMotion.Target.Current;
        this.action = new ApplyInsertModeAction(m);
    }

    // A    
    private appendEndAction() {
        let m = new EndMotion();
        this.action = new ApplyInsertModeAction(m);
    }

    // o O    
    private insertLineBelowAction(isAbove: boolean) {
        let a = new InsertLineBelowAction();
        if (isAbove) {
            a.SetAboveOption();
        }
        this.action = a;
    }

    // x Nx
    private deleteCharacterAction(isLeft: boolean) {
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
    private changeCharacterAction() {
        let m = new RightMotion();
        m.SetCount(1);
        let a = new DeleteAction();
        a.SetSmallOption();
        a.SetMotion(m);
        a.SetChangeOption();
        this.action = a;
    }

    // S
    private changeLineAction() {
        let m = new DownMotion();
        m.SetCount(this.getNumStack() - 1);
        let a = new DeleteAction();
        a.SetLineOption();
        a.SetMotion(m);
        a.SetChangeOption();
        this.action = a;
    }

    // p P Np NP
    private pasteBelowAction(isBack: boolean) {
        let a = new PasteAction();
        if (isBack) {
            a.SetBackOption();
        }
        a.SetCount(this.getNumStack());
        this.action = a;
    }

    // j k
    private moveLineAction(isUp: boolean) {
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
    private moveRightAction(isLeft: boolean) {
        let m = new RightMotion();
        if (isLeft) {
            m.SetLeftDirection();
        };
        m.SetCount(this.getNumStack());
        this.action = this.createMoveAction(m);
    }

    // w b e W B E
    private moveWordAction(isReverse: boolean, isWordEnd: boolean, isWORD: boolean, isSkipBlankLine) {
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
    private moveHomeAction() {
        this.action = this.createMoveAction(new HomeMotion());
    }

    // $
    private moveEndAction() {
        this.action = this.createMoveAction(new EndMotion());
    }

    // ^
    private moveFirstNonBlankCharAction() {
        let m = new FirstCharacterMotion();
        m.Target = FirstCharacterMotion.Target.Current;
        this.action = this.createMoveAction(m);
    }

    // fx Fx
    private moveFindCharacterAction(isReverse) {
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
    private moveTillCharacterAction(isReverse) {
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
    private moveGotoLineAction() {
        let a = new MoveAction();
        let m = new FirstCharacterMotion();
        m.SetCount(this.getNumStack() - 1);
        a.SetMotion(m);
        this.action = a;
    }

    // G
    private moveLastLineAction() {
        let a = new MoveAction();
        let m = new FirstCharacterMotion();
        m.Target = FirstCharacterMotion.Target.Last;
        a.SetMotion(m);
        this.action = a;
    }

    // gg
    private moveFirstLineAction() {
        let a = new MoveAction();
        let m = new FirstCharacterMotion();
        m.Target = FirstCharacterMotion.Target.First;
        a.SetMotion(m);
        this.action = a;
    }

    // ch cl
    private rightMotion(isLeft: boolean) {
        let m = new RightMotion();
        if (isLeft) {
            m.SetLeftDirection();
        };
        m.SetCount(this.getNumStack());
        let a = <IRequireMotionAction>this.action;
        a.SetMotion(m);
    }

    // cj ck
    private lineMotion(isUp: boolean) {
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
    private wordMotion(isReverse: boolean, isWordEnd: boolean, isWORD: boolean, isSkipBlankLine: boolean) {
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
    private homeMotion() {
        let a = <IRequireMotionAction>this.action;
        a.SetMotion(new HomeMotion());
    }

    // c$
    private endMotion() {
        let a = <IRequireMotionAction>this.action;
        a.SetMotion(new EndMotion());
    }

    // c^
    private firstNonBlankCharMotion() {
        let a = <IRequireMotionAction>this.action;
        let m = new FirstCharacterMotion();
        m.Target = FirstCharacterMotion.Target.Current;
        a.SetMotion(m);
    }

    // fx Fx
    private findCharacterMotion(isReverse) {
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
    private tillCharacterMotion(isReverse) {
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
    private gotoLineMotion() {
        let m = new FirstCharacterMotion();
        m.SetCount(this.getNumStack() - 1);
        let a = <IRequireMotionAction>this.action;
        a.SetMotion(m);
        a.SetLineOption();
    }

    // cG
    private lastLineMotion() {
        let m = new FirstCharacterMotion();
        m.Target = FirstCharacterMotion.Target.Last;
        let a = <IRequireMotionAction>this.action;
        a.SetMotion(m);
        a.SetLineOption();
    }

    // cgg
    private firstLineMotion() {
        let m = new FirstCharacterMotion();
        m.Target = FirstCharacterMotion.Target.First;
        let a = <IRequireMotionAction>this.action;
        a.SetMotion(m);
        a.SetLineOption();
    }

    // cm 
    private changeAction() {
        let a = new DeleteAction();
        a.SetChangeOption();
        this.action = a;
    }

    // dm
    private deleteAction() {
        this.action = new DeleteAction();
    }

    // ym
    private yancAction() {
        let a = new DeleteAction();
        a.SetOnlyYancOption();
        this.action = a;
    }

    // C
    private changeToEndAction() {
        let m = new EndMotion();
        m.SetCount(1);
        let a = new DeleteAction();
        a.SetSmallOption();
        a.SetMotion(m);
        a.SetChangeOption();
        this.action = a;
    }

    // D
    private deleteToEndAction() {
        let m = new EndMotion();
        m.SetCount(1);
        let a = new DeleteAction();
        a.SetSmallOption();
        a.SetMotion(m);
        this.action = a;
    }

    // Y
    private yancToEndAction() {
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
    private enterVisualModeAction() {
        this.action = new ApplyVisualModeAction();
    }

    // v...c
    private changeSelectionAction() {
        let a = new DeleteSelectionAction();
        a.SetChangeOption();
        this.action = a;
    }

    // v...d
    private deleteSelectionAction() {
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