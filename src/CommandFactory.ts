import {VimStyle} from './VimStyle';
import * as Utils from "./Utils";
import {Command, State, IVimStyleCommand, KeyBindings} from './keybindings/keybindings';
import {PanicAction} from './action/PanicAction';
import {CombinationAction} from './action/CombinationAction';
import {InsertAction} from './action/InsertAction';
import {InsertNewLineAction} from './action/InsertNewLineAction';
import {PasteAction} from './action/PasteAction';
import {DeleteAction} from './action/DeleteAction';
import {FirstInsertAction} from './action/FirstInsertAction';
import {MoveAction} from './action/MoveAction';
import {RightMotion} from './motion/RightMotion';
import {DownMotion} from './motion/DownMotion';
import {FirstMotion} from './motion/FirstMotion';
import {EndMotion} from './motion/EndMotion';
import {ForwardCharMotion} from './motion/ForwardCharMotion';
import {ForwardWordMotion} from './motion/ForwardWordMotion';

export class CommandFactory implements ICommandFactory {

    private state: State;
    private action: IAction;
    private motion: ForwardCharMotion;
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
            case State.AtStart:
                command = KeyBindings.AtStart[keyChar];
                break;
            case State.FirstNum:
                command = KeyBindings.FirstNum[keyChar];
                break;
            case State.RequireMotion:
                command = KeyBindings.RequireMotion[keyChar];
                break
            case State.RequireMotionNum:
                command = KeyBindings.RequireMotionNum[keyChar];
            case State.RequireCharForMotion:
                return this.pushKeyAtRequireCharForMotion(key);
        }
        if (command == undefined) {
            this.Clear();
            return null;
        }
        this.createVimStyleCommand(key, command);
        if (command.state == State.Panic) {
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
        this.state = State.AtStart;
        this.action = null;
        this.stackedKey = null;
        this.num = 0;
        this.commandString = "";
    }

    public GetCommandString(): string {
        return this.commandString;
    }

    private createVimStyleCommand(key: Key, command: IVimStyleCommand) {

        switch (command.cmd) {
            case Command.insertCurrentPositionAction:
                return this.insertCurrentPositionAction();
            case Command.appendCurrentPositionAction:
                return this.appendCurrentPositionAction();
            case Command.insertHomeAction:
                return this.insertHomeAction();
            case Command.appendEndAction:
                return this.appendEndAction();
            case Command.insertLineBelowAction:
                return this.insertLineBelowAction(command.isReverse);
            case Command.deleteCharacterAction:
                return this.deleteCharacterAction(command.isReverse);
            case Command.changeCharacterAction:
                return this.changeCharacterAction();
            case Command.changeLineAction:
                return this.changeLineAction();
            case Command.pasteBelowAction:
                return this.pasteBelowAction(command.isReverse);
            case Command.moveRightAction:
                return this.moveRightAction(command.isReverse);
            case Command.moveLineAction:
                return this.moveLineAction(command.isReverse);
            case Command.moveWordAction:
                return this.moveWordAction(command.isReverse);
            case Command.moveHomeAction:
                return this.moveHomeAction();
            case Command.moveEndAction:
                return this.moveEndAction();
            case Command.moveFindCharacterAction:
                return this.moveFindCharacterAction(command.isReverse);
            case Command.moveTillCharacterAction:
                return this.moveTillCharacterAction(command.isReverse);
            case Command.rightMotion:
                return this.rightMotion(command.isReverse);
            case Command.lineMotion:
                return this.lineMotion(command.isReverse);
            case Command.wordMotion:
                return this.wordMotion(command.isReverse);
            case Command.homeMotion:
                return this.homeMotion();
            case Command.endMotion:
                return this.endMotion();
            case Command.findCharacterMotion:
                return this.findCharacterMotion(command.isReverse);
            case Command.tillCharacterMotion:
                return this.tillCharacterMotion(command.isReverse);
            case Command.changeAction:
                return this.changeAction();
            case Command.deleteAction:
                return this.deleteAction();
            case Command.yancAction:
                return this.yancAction();
            case Command.changeToEndAction:
                return this.changeToEndAction();
            case Command.deleteToEndAction:
                return this.deleteToEndAction();
            case Command.yancToEndAction:
                return this.yancToEndAction();
            case Command.doActionAtCurrentLine:
                return this.doActionAtCurrentLine(key);
            case Command.stackNumber:
                return this.stackNumber(key);
        }
    }

    private pushKeyAtRequireCharForMotion(key: Key):IAction {
        this.motion.SetChar(Utils.KeyToChar(key));
        return this.action;
    }

    private getNumStack() {
        return this.num == 0 ? 1 : this.num;
    }

    // i    
    private insertCurrentPositionAction() {
        this.action = new InsertAction();
    }

    // a    
    private appendCurrentPositionAction() {
        var m = new RightMotion();
        m.SetCount(1);
        var ma = new MoveAction();
        ma.SetMotion(m);
        this.action = new CombinationAction([
            ma,
            new InsertAction()
        ]);
    }
    
    // I
    private insertHomeAction() {
        this.action = new FirstInsertAction();
    }

    // A    
    private appendEndAction() {
        var m = new EndMotion();
        var ma = new MoveAction();
        ma.SetMotion(m);
        this.action = new CombinationAction([
            ma,
            new InsertAction()
        ]);
    }

    // o O    
    private insertLineBelowAction(isAbove: boolean) {
        var a = new InsertNewLineAction();
        if (isAbove) {
            a.SetBackOption();
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
        a.SetInsertOption()
        this.action = a;
    }
    
    // S
    private changeLineAction() {
        var m = new DownMotion();
        m.SetCount(this.getNumStack() - 1);
        var a = new DeleteAction();
        a.SetLineOption();
        a.SetMotion(m);
        a.SetInsertOption()
        this.action = a;
    }
    
    // p P Np NP
    private pasteBelowAction(isBack: boolean) {
        var a = new PasteAction();
        if (isBack) {
            a.SetBackOption()
        }
        a.SetCount(this.getNumStack())
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
        var m = new ForwardWordMotion();
        if (isReverse) {
            m.SetBack();
        }
        m.SetCount(this.getNumStack());
        this.action = this.createMoveAction(m);
    }
    
    // 0
    private moveHomeAction() {
        this.action = this.createMoveAction(new FirstMotion());
    }
    
    // $
    private moveEndAction() {
        this.action = this.createMoveAction(new EndMotion());
    }
    
    // fx Fx
    private moveFindCharacterAction(isReverse) {
        var a = new MoveAction();
        var m: ForwardCharMotion;
        if (isReverse) {
            m = new ForwardCharMotion(Direction.Left);
        } else {
            m = new ForwardCharMotion(Direction.Right);
        }
        m.SetCount(this.getNumStack());
        a.SetMotion(m);
        this.action = a;
        this.motion = m;
    }
    
    // tx Tx
    private moveTillCharacterAction(isReverse) {
        var a = new MoveAction();
        var m: ForwardCharMotion;
        if (isReverse) {
            m = new ForwardCharMotion(Direction.Left);
        } else {
            m = new ForwardCharMotion(Direction.Right);
        }
        m.SetCount(this.getNumStack());
        m.SetTillOption();
        a.SetMotion(m);
        this.action = a;
        this.motion = m;
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
        var m = new ForwardWordMotion();
        if (isReverse) {
            m.SetBack();
        }
        m.SetCount(this.getNumStack());
        var a = <IRequireMotionAction>this.action;
        a.SetMotion(m);
    }
    
    // c0
    private homeMotion() {
        var a = <IRequireMotionAction>this.action;
        a.SetMotion(new FirstMotion());
    }
    
    // c$
    private endMotion() {
        var a = <IRequireMotionAction>this.action;
        a.SetMotion(new EndMotion());
    }
    
    // fx Fx
    private findCharacterMotion(isReverse) {
        var m: ForwardCharMotion;
        if (isReverse) {
            m = new ForwardCharMotion(Direction.Right);
        } else {
            m = new ForwardCharMotion(Direction.Left);
        }
        m.SetCount(this.getNumStack());
        var a = <IRequireMotionAction>this.action;
        a.SetMotion(m);
        this.motion = m;
    }
    
    // tx Tx
    private tillCharacterMotion(isReverse) {
        var m: ForwardCharMotion;
        if (isReverse) {
            m = new ForwardCharMotion(Direction.Right);
        } else {
            m = new ForwardCharMotion(Direction.Left);
        }
        m.SetCount(this.getNumStack());
        m.SetTillOption();
        var a = <IRequireMotionAction>this.action;
        a.SetMotion(m);
        this.motion = m;
    }
    
    // cm 
    private changeAction() {
        var a = new DeleteAction();
        a.SetInsertOption();
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
        a.SetInsertOption();
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
    
    // command: Y
    private yancToEndAction() {
        var m = new EndMotion();
        m.SetCount(1);
        var a = new DeleteAction();
        a.SetSmallOption();
        a.SetMotion(m);
        a.SetOnlyYancOption()
        this.action = a;
    }

    private stackNumber(key: Key) {
        var n: number = Utils.KeyToNum(key);
        this.num = this.num * 10 + n;
        this.commandString += n.toString();
        if (this.num > 10000) {
            this.Clear();
        }
    }

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