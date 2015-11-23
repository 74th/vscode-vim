import {VimStyle} from './VimStyle';
import * as Enums from "./VimStyleEnums";
import * as Utils from "./Utils";
import {IAction, IRequireMotionAction} from './action/IAction';
import {PanicAction} from './action/PanicAction';
import {CombinationAction} from './action/CombinationAction';
import {InsertAction} from './action/InsertAction';
import {InsertNewLineAction} from './action/InsertNewLineAction';
import {PasteAction} from './action/PasteAction';
import {DeleteAction} from './action/DeleteAction';
import {FirstInsertAction} from './action/FirstInsertAction';
import {MoveAction} from './action/MoveAction';
import {IMotion} from './motion/IMotion';
import {RightMotion} from './motion/RightMotion';
import {LeftMotion} from './motion/LeftMotion';
import {UpMotion} from './motion/UpMotion';
import {DownMotion} from './motion/DownMotion';
import {FirstMotion} from './motion/FirstMotion';
import {EndMotion} from './motion/EndMotion';
import {ForwardCharMotion} from './motion/ForwardCharMotion';


enum CommandStatus {
    None,
    FirstNum,
    RequireMotion,
    RequireMotionNum,
    RequireCharForMotion
}
export class CommandFactory {

    private status: CommandStatus;
    private stack: IAction;
    private stackMotion: ForwardCharMotion;
    private stackedKey: Enums.Key;
    private numStock: number;
    private commandString: string;

    constructor() {
        this.Clear();
    }

    public PushKey(key: Enums.Key): IAction {
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

    private pushKeyAtStart(key): IAction {
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

    private pushKeyAtFirstNum(key: Enums.Key): IAction {
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

    private pushKeyAtRequireMotion(key: Enums.Key): IAction {
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

    private pushKeyAtRequireMotionNum(key: Enums.Key): IAction {
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
    
    private pushKeyAtRequireCharForMotion(key: Enums.Key): IAction {
        this.stackMotion.SetChar(Utils.KeyToChar(key));
        return this.stack;
    }

    private createSingleAction(key: Enums.Key, count: number): IAction {
        var a: IAction;
        var list: IAction[];
        switch (key) {
            case Enums.Key.i:
                return new InsertAction();
            case Enums.Key.a:
                return this.createAppendAction();
            case Enums.Key.I:
                return new FirstInsertAction();
            case Enums.Key.A:
                return this.createEndAppendAction();
            case Enums.Key.o:
                return this.createInsertNewLineAction(false);
            case Enums.Key.O:
                return this.createInsertNewLineAction(true);
            case Enums.Key.x:
                return this.createCharactorDeleteAction(count);
            case Enums.Key.X:
                return this.createBeforeCharactorDeleteAction(count);
            case Enums.Key.s:
                return this.createCharactorDeleteInsertAction(count);
            case Enums.Key.S:
                return this.createLineDeleteInsertAction(count);
            case Enums.Key.D:
                return this.createDeleteToEndAction();
            case Enums.Key.Y:
                return this.createYancToEndAction();
            case Enums.Key.C:
                return this.createDeleteInsertToEndAction();
            case Enums.Key.p:
                return this.createPasteAction(false, count);
            case Enums.Key.P:
                return this.createPasteAction(true, count);    
            // TODO
            default:
                return new PanicAction();
        }
    }

    private createMotion(key: Enums.Key, count: number): IMotion {
        var m: IMotion;
        switch (key) {
            case Enums.Key.l:
                m = new RightMotion();
                break;
            case Enums.Key.h:
                m = new LeftMotion();
                break;
            case Enums.Key.j:
                m = new DownMotion();
                break;
            case Enums.Key.k:
                m = new UpMotion();
                break;
            case Enums.Key.n0:
                m = new FirstMotion();
                break;
            case Enums.Key.Doller:
                m = new EndMotion();
                break;
            default:    
                throw new Error("Panic!");
        }
        m.SetCount(count);
        return m;
    }

    private createMoveAction(key: Enums.Key, count: number): IAction {
        var m = this.createMotion(key, count);
        var a = new MoveAction();
        a.SetMotion(m);
        return a;
    }

    private stackNumeric(key: Enums.Key): IAction {
        var n: number;
        switch (key) {
            case Enums.Key.n0:
                n = 0;
                break;
            case Enums.Key.n1:
                n = 1;
                break;
            case Enums.Key.n2:
                n = 2;
                break;
            case Enums.Key.n3:
                n = 3;
                break;
            case Enums.Key.n4:
                n = 4;
                break;
            case Enums.Key.n5:
                n = 5;
                break;
            case Enums.Key.n6:
                n = 6;
                break;
            case Enums.Key.n7:
                n = 7;
                break;
            case Enums.Key.n8:
                n = 8;
                break;
            case Enums.Key.n9:
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
    private stackRequireMotionAction(key: Enums.Key, c: number): IAction {
        var a: IRequireMotionAction;
        switch (key) {
            case Enums.Key.d:
                a = new DeleteAction();
                break;
            case Enums.Key.y:
                var ya = new DeleteAction();
                ya.SetOnlyYancOption();
                a = ya;
                break;
            case Enums.Key.c:
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

    private setMotionToStackAction(key: Enums.Key, c: number): IAction {
        var a = <IRequireMotionAction>this.stack;
        a.SetMotion(this.createMotion(key, c));
        return a;
    }

    private setLineToStackAction(key: Enums.Key, c: number): IAction {
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

    private stackForwardCharMoveAction(key: Enums.Key, c: number): IAction {
        var a = new MoveAction();
        var m = this.createForwardCharMotion(key, c);
        a.SetMotion(m);
        this.stack = a;
        this.stackMotion = m;
        this.commandString += Utils.KeyToChar(key);
        return null;
    }
    
    private stackForwardCharMotion(key: Enums.Key, c: number): IAction{
        var m = this.createForwardCharMotion(key, c);
        var a = <IRequireMotionAction>this.stack;
        a.SetMotion(m);
        this.stackMotion = m;
        this.commandString += Utils.KeyToChar(key);
        return null;
    }

    private createForwardCharMotion(key: Enums.Key, c: number): ForwardCharMotion {
        var m: ForwardCharMotion;
        switch (key) {
            case Enums.Key.f:
                m = new ForwardCharMotion(Enums.Direction.Right, Enums.Direction.Left);
                break;
            case Enums.Key.F:
                m = new ForwardCharMotion(Enums.Direction.Left, Enums.Direction.Left);
                break;
            case Enums.Key.t:
                m = new ForwardCharMotion(Enums.Direction.Right, Enums.Direction.Right);
                break;
            case Enums.Key.T:
                m = new ForwardCharMotion(Enums.Direction.Left, Enums.Direction.Right);
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

enum KeyClass {
    // 1 2 3 4 5 6 7 8 9
    NumWithoutZero,
    // 0
    Zero,
    // w b h j k l $
    Motion,
    // x s I A p P C D S
    SingleAction,
    // i a 
    TextObjectOrSingleAction,
    // d y c
    RequireMotionAction,
    // f t F T
    RequireCharMotion
}
function SelectKeyClass(key: Enums.Key): KeyClass {
    switch (key) {
        case Enums.Key.n0:
            return KeyClass.Zero;
        case Enums.Key.n1:
        case Enums.Key.n2:
        case Enums.Key.n3:
        case Enums.Key.n4:
        case Enums.Key.n5:
        case Enums.Key.n6:
        case Enums.Key.n7:
        case Enums.Key.n8:
        case Enums.Key.n9:
            return KeyClass.NumWithoutZero;
        case Enums.Key.w:
        case Enums.Key.b:
        case Enums.Key.h:
        case Enums.Key.j:
        case Enums.Key.k:
        case Enums.Key.l:
        case Enums.Key.Doller:
            return KeyClass.Motion;
        case Enums.Key.x:
        case Enums.Key.x:
        case Enums.Key.s:
        case Enums.Key.S:
        case Enums.Key.C:
        case Enums.Key.D:
        case Enums.Key.I:
        case Enums.Key.A:
        case Enums.Key.o:
        case Enums.Key.O:
        case Enums.Key.p:
        case Enums.Key.P:
            return KeyClass.SingleAction;
        case Enums.Key.i:
        case Enums.Key.a:
            return KeyClass.TextObjectOrSingleAction;
        case Enums.Key.d:
        case Enums.Key.y:
        case Enums.Key.c:
            return KeyClass.RequireMotionAction;
        case Enums.Key.f:
        case Enums.Key.t:
        case Enums.Key.F:
        case Enums.Key.T:
            return KeyClass.RequireCharMotion;
    }
}