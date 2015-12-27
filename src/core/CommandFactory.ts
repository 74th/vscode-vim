import * as Utils from "../Utils";
import {ApplyInsertModeAction} from "../action/ApplyInsertModeAction";
import {InsertLineBelowAction} from "../action/InsertLineBelowAction";
import {PasteAction} from "../action/PasteAction";
import {DeleteAction} from "../action/DeleteAction";
import {MoveAction} from "../action/MoveAction";
import {RightMotion} from "../motion/RightMotion";
import {DownMotion} from "../motion/DownMotion";
import {HomeMotion} from "../motion/HomeMotion";
import {EndMotion} from "../motion/EndMotion";
import {FindCharacterMotion} from "../motion/FindCharacterMotion";
import {WordMotion} from "../motion/WordMotion";
import {LineHeadMotion} from "../motion/LineHeadMotion";

export class CommandFactory implements ICommandFactory {

    private state: StateName;
    private action: IAction;
    private motion: FindCharacterMotion;
    private keyBindings: IKeyBindings;
    private stackedKey: Key;
    private num: number;
    private commandString: string;

    constructor() {
        this.Clear();
    }

    public PushKey(key: Key): IAction {
        let keyChar = Utils.KeyToChar(key);
        var command: IVimStyleCommand;
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
                return this.pushKeyAtRequireCharForMotion(key);
            case StateName.SmallG:
                command = this.keyBindings.SmallG[keyChar];
                break;
            case StateName.SmallGForMotion:
                command = this.keyBindings.SmallGForMotion[keyChar];
                break;
        }
        if (command == undefined) {
            this.Clear();
            return null;
        }
        this.createVimStyleCommand(key, command);
        if (command.state == StateName.Panic) {
            this.Clear();
            return null;
        }
        if (command.state === undefined) {
            return this.action;
        }
        this.stackedKey = key;
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

    private createVimStyleCommand(key: Key, command: IVimStyleCommand) {

        switch (command.cmd) {
            // single action
            case CommandName.insertCurrentPositionAction:
                this.insertCurrentPositionAction();
                return;
            case CommandName.appendCurrentPositionAction:
                this.appendCurrentPositionAction();
                return;
            case CommandName.insertHomeAction:
                this.insertHomeAction();
                return;
            case CommandName.appendEndAction:
                this.appendEndAction();
                return;
            case CommandName.insertLineBelowAction:
                this.insertLineBelowAction(command.isReverse);
                return;
            case CommandName.deleteCharacterAction:
                this.deleteCharacterAction(command.isReverse);
                return;
            case CommandName.changeCharacterAction:
                this.changeCharacterAction();
                return;
            case CommandName.changeLineAction:
                this.changeLineAction();
                return;

            // move action
            case CommandName.pasteBelowAction:
                this.pasteBelowAction(command.isReverse);
                return;
            case CommandName.moveRightAction:
                this.moveRightAction(command.isReverse);
                return;
            case CommandName.moveLineAction:
                this.moveLineAction(command.isReverse);
                return;
            case CommandName.moveWordAction:
                this.moveWordAction(command.isReverse);
                return;
            case CommandName.moveHomeAction:
                this.moveHomeAction();
                return;
            case CommandName.moveEndAction:
                this.moveEndAction();
                return;
            case CommandName.moveFindCharacterAction:
                this.moveFindCharacterAction(command.isReverse);
                return;
            case CommandName.moveTillCharacterAction:
                this.moveTillCharacterAction(command.isReverse);
                return;
            case CommandName.moveGotoLineAction:
                this.moveGotoLineAction();
                return;
            case CommandName.moveLastLineAction:
                this.moveLastLineAction();
                return;
            case CommandName.moveFirstLineAction:
                this.moveFirstLineAction();
                return;

            // motion
            case CommandName.rightMotion:
                this.rightMotion(command.isReverse);
                return;
            case CommandName.lineMotion:
                this.lineMotion(command.isReverse);
                return;
            case CommandName.wordMotion:
                this.wordMotion(command.isReverse);
                return;
            case CommandName.homeMotion:
                this.homeMotion();
                return;
            case CommandName.endMotion:
                this.endMotion();
                return;
            case CommandName.findCharacterMotion:
                this.findCharacterMotion(command.isReverse);
                return;
            case CommandName.tillCharacterMotion:
                this.tillCharacterMotion(command.isReverse);
                return;
            case CommandName.gotoLineMotion:
                this.gotoLineMotion();
                return;
            case CommandName.lastLineMotion:
                this.lastLineMotion();
                return;
            case CommandName.firstLineMotion:
                this.firstLineMotion();
                return;

            // delete, yanc, change action
            case CommandName.changeAction:
                this.changeAction();
                return;
            case CommandName.deleteAction:
                this.deleteAction();
                return;
            case CommandName.yancAction:
                this.yancAction();
                return;
            case CommandName.changeToEndAction:
                this.changeToEndAction();
                return;
            case CommandName.deleteToEndAction:
                this.deleteToEndAction();
                return;
            case CommandName.yancToEndAction:
                this.yancToEndAction();
                return;
            case CommandName.doActionAtCurrentLine:
                this.doActionAtCurrentLine(key);
                return;

            // other
            case CommandName.stackNumber:
                this.stackNumber(key);
            case CommandName.nothing:
                return;
        }
    }

    private pushKeyAtRequireCharForMotion(key: Key): IAction {
        this.motion.SetChar(Utils.KeyToChar(key));
        return this.action;
    }

    private getNumStack() {
        return this.num == 0 ? 1 : this.num;
    }

    // i    
    private insertCurrentPositionAction() {
        this.action = new ApplyInsertModeAction();
    }

    // a    
    private appendCurrentPositionAction() {
        var m = new RightMotion();
        m.SetCount(1);
        this.action = new ApplyInsertModeAction(m);
    }

    // I
    private insertHomeAction() {
        var m = new LineHeadMotion();
        m.SetCurrentLineOption();
        this.action = new ApplyInsertModeAction(m);
    }

    // A    
    private appendEndAction() {
        var m = new EndMotion();
        this.action = new ApplyInsertModeAction(m);
    }

    // o O    
    private insertLineBelowAction(isAbove: boolean) {
        var a = new InsertLineBelowAction();
        if (isAbove) {
            a.SetAboveOption();
        }
        this.action = a;
    }

    // x Nx
    private deleteCharacterAction(isLeft: boolean) {
        var m = new RightMotion();
        if (isLeft) {
            m.SetLeftDirection();
        }
        m.SetCount(this.getNumStack());
        var a = new DeleteAction();
        a.SetSmallOption();
        a.SetMotion(m);
        this.action = a;
    }

    // s
    private changeCharacterAction() {
        var m = new RightMotion();
        m.SetCount(1);
        var a = new DeleteAction();
        a.SetSmallOption();
        a.SetMotion(m);
        a.SetChangeOption();
        this.action = a;
    }

    // S
    private changeLineAction() {
        var m = new DownMotion();
        m.SetCount(this.getNumStack() - 1);
        var a = new DeleteAction();
        a.SetLineOption();
        a.SetMotion(m);
        a.SetChangeOption();
        this.action = a;
    }

    // p P Np NP
    private pasteBelowAction(isBack: boolean) {
        var a = new PasteAction();
        if (isBack) {
            a.SetBackOption();
        }
        a.SetCount(this.getNumStack());
        this.action = a;
    }

    private createMoveAction(motion: IMotion) {
        var a = new MoveAction();
        a.SetMotion(motion);
        return a;
    }

    // h l
    private moveRightAction(isLeft: boolean) {
        var m = new RightMotion();
        if (isLeft) {
            m.SetLeftDirection();
        };
        m.SetCount(this.getNumStack());
        this.action = this.createMoveAction(m);
    }

    // j k
    private moveLineAction(isUp: boolean) {
        var m = new DownMotion();
        if (isUp) {
            m.SetUpDirection();
        }
        m.SetCount(this.getNumStack());
        this.action = this.createMoveAction(m);
    }

    // w b
    private moveWordAction(isReverse: boolean) {
        var m: WordMotion;
        if (isReverse) {
            m = new WordMotion(Direction.Left);
        } else {
            m = new WordMotion(Direction.Right);
        }
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

    // fx Fx
    private moveFindCharacterAction(isReverse) {
        var a = new MoveAction();
        var m: FindCharacterMotion;
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
        var a = new MoveAction();
        var m: FindCharacterMotion;
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
        var a = new MoveAction();
        var m = new LineHeadMotion();
        m.SetCount(this.getNumStack() - 1);
        a.SetMotion(m);
        this.action = a;
    }

    // G
    private moveLastLineAction() {
        var a = new MoveAction();
        var m = new LineHeadMotion();
        m.SetLastLineOption();
        a.SetMotion(m);
        this.action = a;
    }

    // gg
    private moveFirstLineAction() {
        var a = new MoveAction();
        var m = new LineHeadMotion();
        m.SetFirstLineOption();
        a.SetMotion(m);
        this.action = a;
    }

    // ch cl
    private rightMotion(isLeft: boolean) {
        var m = new RightMotion();
        if (isLeft) {
            m.SetLeftDirection();
        };
        m.SetCount(this.getNumStack());
        var a = <IRequireMotionAction>this.action;
        a.SetMotion(m);
    }

    // cj ck
    private lineMotion(isUp: boolean) {
        var m = new DownMotion();
        if (isUp) {
            m.SetUpDirection();
        }
        m.SetCount(this.getNumStack());
        var a = <IRequireMotionAction>this.action;
        a.SetMotion(m);
        a.SetLineOption();
    }

    // cw cb
    private wordMotion(isReverse: boolean) {
        var m: WordMotion;
        if (isReverse) {
            m = new WordMotion(Direction.Left);
        } else {
            m = new WordMotion(Direction.Right);
        }
        m.SetCount(this.getNumStack());
        m.SetStopFinalLnOption();
        var a = <IRequireMotionAction>this.action;
        a.SetMotion(m);
    }

    // c0
    private homeMotion() {
        var a = <IRequireMotionAction>this.action;
        a.SetMotion(new HomeMotion());
    }

    // c$
    private endMotion() {
        var a = <IRequireMotionAction>this.action;
        a.SetMotion(new EndMotion());
    }

    // fx Fx
    private findCharacterMotion(isReverse) {
        var m: FindCharacterMotion;
        if (isReverse) {
            m = new FindCharacterMotion(Direction.Left);
        } else {
            m = new FindCharacterMotion(Direction.Right);
            m.SetContainTargetCharOption();
        }
        m.SetCount(this.getNumStack());
        var a = <IRequireMotionAction>this.action;
        a.SetMotion(m);
        this.motion = m;
    }

    // tx Tx
    private tillCharacterMotion(isReverse) {
        var m: FindCharacterMotion;
        if (isReverse) {
            m = new FindCharacterMotion(Direction.Left);
        } else {
            m = new FindCharacterMotion(Direction.Right);
            m.SetContainTargetCharOption();
        }
        m.SetCount(this.getNumStack());
        m.SetTillOption();
        var a = <IRequireMotionAction>this.action;
        a.SetMotion(m);
        this.motion = m;
    }

    // cNg
    private gotoLineMotion() {
        var m = new LineHeadMotion();
        m.SetCount(this.getNumStack() - 1);
        var a = <IRequireMotionAction>this.action;
        a.SetMotion(m);
        a.SetLineOption();
    }

    // cG
    private lastLineMotion() {
        var m = new LineHeadMotion();
        m.SetLastLineOption();
        var a = <IRequireMotionAction>this.action;
        a.SetMotion(m);
        a.SetLineOption();
    }

    // cgg
    private firstLineMotion() {
        var m = new LineHeadMotion();
        m.SetFirstLineOption();
        var a = <IRequireMotionAction>this.action;
        a.SetMotion(m);
        a.SetLineOption();
    }

    // cm 
    private changeAction() {
        var a = new DeleteAction();
        a.SetChangeOption();
        this.action = a;
    }

    // dm
    private deleteAction() {
        this.action = new DeleteAction();
    }

    // ym
    private yancAction() {
        var a = new DeleteAction();
        a.SetOnlyYancOption();
        this.action = a;
    }

    // C
    private changeToEndAction() {
        var m = new EndMotion();
        m.SetCount(1);
        var a = new DeleteAction();
        a.SetSmallOption();
        a.SetMotion(m);
        a.SetChangeOption();
        this.action = a;
    }

    // D
    private deleteToEndAction() {
        var m = new EndMotion();
        m.SetCount(1);
        var a = new DeleteAction();
        a.SetSmallOption();
        a.SetMotion(m);
        this.action = a;
    }

    // Y
    private yancToEndAction() {
        var m = new EndMotion();
        m.SetCount(1);
        var a = new DeleteAction();
        a.SetSmallOption();
        a.SetMotion(m);
        a.SetOnlyYancOption();
        this.action = a;
    }

    private stackNumber(key: Key) {
        var n: number = Utils.KeyToNum(key);
        this.num = this.num * 10 + n;
        if (this.num > 10000) {
            this.Clear();
        }
    }

    // dd, yy, cc    
    private doActionAtCurrentLine(key: Key) {
        if (this.stackedKey != key) {
            this.Clear();
            return;
        }
        var a = <IRequireMotionAction>this.action;
        a.SetLineOption();
        var count = 0;
        if (this.num !== 0) {
            count = this.num - 1;
        }
        var m = new DownMotion();
        m.SetCount(count);
        a.SetMotion(m);
    }
}