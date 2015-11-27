import * as Utils from "./Utils";
import {PanicAction} from './action/PanicAction';
import {CombinationAction} from './action/CombinationAction';
import {InsertAction} from './action/InsertAction';
import {InsertNewLineAction} from './action/InsertNewLineAction';
import {PasteAction} from './action/PasteAction';
import {DeleteAction} from './action/DeleteAction';
import {FirstInsertAction} from './action/FirstInsertAction';
import {MoveAction} from './action/MoveAction';
import {RightMotion} from './motion/RightMotion';
import {LeftMotion} from './motion/LeftMotion';
import {UpMotion} from './motion/UpMotion';
import {DownMotion} from './motion/DownMotion';
import {FirstMotion} from './motion/FirstMotion';
import {EndMotion} from './motion/EndMotion';
import {ForwardCharMotion} from './motion/ForwardCharMotion';
import {ForwardWordMotion} from './motion/ForwardWordMotion';


export class CommandFactory implements ICommandFactory {

    private status: CommandStatus;
    private stack: IAction;
    private stackMotion: ForwardCharMotion;
    private stackedKey: Key;
    private numStock: number;
    private commandString: string;

    constructor() {
        this.Clear();
    }

    public PushKey(key: Key): IAction {
        switch (this.status) {
            case CommandStatus.None:
                return this.pushKeyAtStart(key);
            case CommandStatus.FirstNum:
                return this.pushKeyAtFirstNum(key);
            case CommandStatus.RequireMotion:
                return this.pushKeyAtRequireMotion(key);
            case CommandStatus.RequireMotionNum:
                return this.pushKeyAtRequireMotionNum(key);
            case CommandStatus.RequireCharForMotion:
                return this.pushKeyAtRequireCharForMotion(key);
        }
        return new PanicAction();
    }

    public Clear() {
        this.status = CommandStatus.None;
        this.stack = null;
        this.stackedKey = null;
        this.numStock = 0;
        this.commandString = "";
    }

    public GetCommandString(): string {
        return this.commandString;
    }

    private pushKeyAtStart(key: Key): IAction {
        var keyClass = SelectKeyClass(key);
        switch (keyClass) {
            case KeyClass.TextObjectOrSingleAction:
            case KeyClass.SingleAction:
                return this.createSingleAction(key, 1);
            case KeyClass.Motion:
            case KeyClass.Zero:
                return this.createMoveAction(key, 1);
            case KeyClass.NumWithoutZero:
                this.status = CommandStatus.FirstNum;
                this.numStock = 0;
                return this.stackNumeric(key);
            case KeyClass.RequireMotionAction:
                this.status = CommandStatus.RequireMotion;
                return this.stackRequireMotionAction(key, 1);
            case KeyClass.RequireCharMotion:
                this.status = CommandStatus.RequireCharForMotion;
                return this.stackForwardCharMoveAction(key, 1);
            default:
                this.Clear();
                return new PanicAction();
        }
    }

    private pushKeyAtFirstNum(key: Key): IAction {
        var keyClass = SelectKeyClass(key);
        switch (keyClass) {
            case KeyClass.Motion:
                return this.createMoveAction(key, this.numStock);
            case KeyClass.NumWithoutZero:
            case KeyClass.Zero:
                this.stackNumeric(key);
                return null;
            case KeyClass.SingleAction:
                return this.createSingleAction(key, this.numStock);
            case KeyClass.RequireMotionAction:
                this.status = CommandStatus.RequireMotion;
                return this.stackRequireMotionAction(key, this.numStock);
            case KeyClass.RequireCharMotion:
                this.status = CommandStatus.RequireCharForMotion;
                return this.stackForwardCharMoveAction(key, this.numStock);
        }
        return new PanicAction();
    }

    private pushKeyAtRequireMotion(key: Key): IAction {
        var keyClass = SelectKeyClass(key);
        switch (keyClass) {
            case KeyClass.Motion:
            case KeyClass.Zero:
                return this.setMotionToStackAction(key, 1);
            case KeyClass.NumWithoutZero:
                this.status = CommandStatus.RequireMotionNum;
                this.numStock = 0;
                return this.stackNumeric(key);
            case KeyClass.RequireMotionAction:
                return this.setLineToStackAction(key, 1);
            case KeyClass.RequireCharMotion:
                this.status = CommandStatus.RequireCharForMotion;
                return this.stackForwardCharMotion(key, 1);
        }
        return new PanicAction();
    }

    private pushKeyAtRequireMotionNum(key: Key): IAction {
        var keyClass = SelectKeyClass(key);
        switch (keyClass) {
            case KeyClass.Motion:
                return this.setMotionToStackAction(key, this.numStock);
            case KeyClass.NumWithoutZero:
            case KeyClass.Zero:
                this.stackNumeric(key);
                return null;
            case KeyClass.SingleAction:
                return this.setLineToStackAction(key, this.numStock);
            case KeyClass.RequireCharMotion:
                this.status = CommandStatus.RequireCharForMotion;
                return this.stackForwardCharMotion(key, this.numStock);
        }
        return new PanicAction();
    }
    
    private pushKeyAtRequireCharForMotion(key: Key): IAction {
        this.stackMotion.SetChar(Utils.KeyToChar(key));
        return this.stack;
    }

    private createSingleAction(key: Key, count: number): IAction {
        var a: IAction;
        var list: IAction[];
        switch (key) {
            case Key.i:
                return new InsertAction();
            case Key.a:
                return this.createAppendAction();
            case Key.I:
                return new FirstInsertAction();
            case Key.A:
                return this.createEndAppendAction();
            case Key.o:
                return this.createInsertNewLineAction(false);
            case Key.O:
                return this.createInsertNewLineAction(true);
            case Key.x:
                return this.createCharactorDeleteAction(count);
            case Key.X:
                return this.createBeforeCharactorDeleteAction(count);
            case Key.s:
                return this.createCharactorDeleteInsertAction(count);
            case Key.S:
                return this.createLineDeleteInsertAction(count);
            case Key.D:
                return this.createDeleteToEndAction();
            case Key.Y:
                return this.createYancToEndAction();
            case Key.C:
                return this.createDeleteInsertToEndAction();
            case Key.p:
                return this.createPasteAction(false, count);
            case Key.P:
                return this.createPasteAction(true, count);    
            // TODO
            default:
                return new PanicAction();
        }
    }

    private createMotion(key: Key, count: number): IMotion {
        var m: IMotion;
        switch (key) {
            case Key.l:
                m = new RightMotion();
                break;
            case Key.h:
                m = new LeftMotion();
                break;
            case Key.j:
                m = new DownMotion();
                break;
            case Key.k:
                m = new UpMotion();
                break;
            case Key.n0:
                m = new FirstMotion();
                break;
            case Key.Doller:
                m = new EndMotion();
                break;
            case Key.w:
                m = new ForwardWordMotion();
                break;
            case Key.b:
                var bm = new ForwardWordMotion();
                bm.SetBack();
                m = bm;
                break;
            default:    
                throw new Error("Panic!");
        }
        m.SetCount(count);
        return m;
    }

    private createMoveAction(key: Key, count: number): IAction {
        var m = this.createMotion(key, count);
        var a = new MoveAction();
        a.SetMotion(m);
        return a;
    }

    private stackNumeric(key: Key): IAction {
        var n: number;
        switch (key) {
            case Key.n0:
                n = 0;
                break;
            case Key.n1:
                n = 1;
                break;
            case Key.n2:
                n = 2;
                break;
            case Key.n3:
                n = 3;
                break;
            case Key.n4:
                n = 4;
                break;
            case Key.n5:
                n = 5;
                break;
            case Key.n6:
                n = 6;
                break;
            case Key.n7:
                n = 7;
                break;
            case Key.n8:
                n = 8;
                break;
            case Key.n9:
                n = 9;
                break;
        }
        this.numStock = this.numStock * 10 + n;
        this.commandString += n.toString();
        if (this.numStock > 10000) {
            return new PanicAction();
        }
        this.stackedKey = key;
        return null;
    }
    
    // command: dm ym cm 
    private stackRequireMotionAction(key: Key, c: number): IAction {
        var a: IRequireMotionAction;
        switch (key) {
            case Key.d:
                a = new DeleteAction();
                break;
            case Key.y:
                var ya = new DeleteAction();
                ya.SetOnlyYancOption();
                a = ya;
                break;
            case Key.c:
                var ca = new DeleteAction();
                ca.SetInsertOption();
                a = ca;
                break;
            default:
                throw new Error("Panic!");
        }
        this.commandString += Utils.KeyToChar(key);
        this.stack = a;
        this.stackedKey = key;
        return null;
    }

    private setMotionToStackAction(key: Key, c: number): IAction {
        var a = <IRequireMotionAction>this.stack;
        a.SetMotion(this.createMotion(key, c));
        return a;
    }

    private setLineToStackAction(key: Key, c: number): IAction {
        var a = <IRequireMotionAction>this.stack;
        var m: IMotion;
        a.SetLineOption();
        if (this.stackedKey == key) {

            if (c == 0) {
                // dd yy cc
                return a;
            }

            m = new DownMotion();
            m.SetCount(c - 1);
        } else {
            m = this.createMotion(key, c);
        }

        a.SetMotion(m);
        return a;
    }

    private stackForwardCharMoveAction(key: Key, c: number): IAction {
        var a = new MoveAction();
        var m = this.createForwardCharMotion(key, c);
        a.SetMotion(m);
        this.stack = a;
        this.stackMotion = m;
        this.commandString += Utils.KeyToChar(key);
        return null;
    }
    
    private stackForwardCharMotion(key: Key, c: number): IAction{
        var m = this.createForwardCharMotion(key, c);
        var a = <IRequireMotionAction>this.stack;
        a.SetMotion(m);
        this.stackMotion = m;
        this.commandString += Utils.KeyToChar(key);
        return null;
    }

    private createForwardCharMotion(key: Key, c: number): ForwardCharMotion {
        var m: ForwardCharMotion;
        switch (key) {
            case Key.f:
                m = new ForwardCharMotion(Direction.Right, Direction.Left);
                break;
            case Key.F:
                m = new ForwardCharMotion(Direction.Left, Direction.Left);
                break;
            case Key.t:
                m = new ForwardCharMotion(Direction.Right, Direction.Right);
                break;
            case Key.T:
                m = new ForwardCharMotion(Direction.Left, Direction.Right);
                break;
        }
        m.SetCount(c);
        return m;
    }
    
    // command: o O
    public createInsertNewLineAction(isPre: boolean) {
        var a = new InsertNewLineAction();
        if (isPre) {
            a.SetBackOption();
        }
        return a;
    }

    // command: a    
    private createAppendAction(): IAction {
        var m = new RightMotion();
        m.SetCount(1);
        var ma = new MoveAction();
        ma.SetMotion(m);
        return new CombinationAction([
            ma,
            new InsertAction()
        ]);
    }

    // command: A    
    private createEndAppendAction(): IAction {
        var m = new EndMotion();
        m.SetCount(1);
        var ma = new MoveAction();
        ma.SetMotion(m);
        return new CombinationAction([
            ma,
            new InsertAction()
        ]);
    }
    
    // commnad: x Nx
    private createCharactorDeleteAction(c: number): IAction {
        var m = new RightMotion();
        m.SetCount(c);
        var a = new DeleteAction();
        a.SetSmallOption();
        a.SetMotion(m);
        return a;
    }
    
    // commnad: X NX
    private createBeforeCharactorDeleteAction(c: number): IAction {
        var m = new LeftMotion();
        m.SetCount(c);
        var a = new DeleteAction();
        a.SetSmallOption();
        a.SetMotion(m);
        return a;
    }
    
    // commnad: s
    private createCharactorDeleteInsertAction(c: number): IAction {
        var m = new RightMotion();
        m.SetCount(1);
        var a = new DeleteAction();
        a.SetSmallOption();
        a.SetMotion(m);
        a.SetInsertOption()
        return a;
    }
    
    // command: S
    private createLineDeleteInsertAction(c: number) {
        var m = new DownMotion();
        m.SetCount(c - 1);
        var a = new DeleteAction();
        a.SetLineOption();
        a.SetMotion(m);
        a.SetInsertOption()
        return a;
    }
    
    // command: D
    private createDeleteToEndAction() {
        var m = new EndMotion();
        m.SetCount(1);
        var a = new DeleteAction();
        a.SetSmallOption();
        a.SetMotion(m);
        return a;
    }
    
    // command: C
    private createDeleteInsertToEndAction() {
        var m = new EndMotion();
        m.SetCount(1);
        var a = new DeleteAction();
        a.SetSmallOption();
        a.SetMotion(m);
        a.SetInsertOption();
        return a;
    }
    
    // command: Y
    private createYancToEndAction() {
        var m = new EndMotion();
        m.SetCount(1);
        var a = new DeleteAction();
        a.SetSmallOption();
        a.SetMotion(m);
        a.SetOnlyYancOption()
        return a;
    }
    
    // command: p P np NP
    private createPasteAction(isBack: boolean, c: number) {
        var a = new PasteAction();
        if (isBack) {
            a.SetBackOption()
        }
        return a;
    }

}

function SelectKeyClass(key: Key): KeyClass {
    switch (key) {
        case Key.n0:
            return KeyClass.Zero;
        case Key.n1:
        case Key.n2:
        case Key.n3:
        case Key.n4:
        case Key.n5:
        case Key.n6:
        case Key.n7:
        case Key.n8:
        case Key.n9:
            return KeyClass.NumWithoutZero;
        case Key.w:
        case Key.b:
        case Key.h:
        case Key.j:
        case Key.k:
        case Key.l:
        case Key.Doller:
            return KeyClass.Motion;
        case Key.x:
        case Key.x:
        case Key.s:
        case Key.S:
        case Key.C:
        case Key.D:
        case Key.I:
        case Key.A:
        case Key.o:
        case Key.O:
        case Key.p:
        case Key.P:
            return KeyClass.SingleAction;
        case Key.i:
        case Key.a:
            return KeyClass.TextObjectOrSingleAction;
        case Key.d:
        case Key.y:
        case Key.c:
            return KeyClass.RequireMotionAction;
        case Key.f:
        case Key.t:
        case Key.F:
        case Key.T:
            return KeyClass.RequireCharMotion;
    }
}