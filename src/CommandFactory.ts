import {VimStyle} from './VimStyle';
import * as Utils from "./Utils";
import keybindings from './keybindings/keybindings';
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

var motions = {
    RightMotion: RightMotion,
    LeftMotion: LeftMotion,
    UpMotion: UpMotion,
    DownMotion: DownMotion,
    FirstMotion: FirstMotion,
    EndMotion: EndMotion,
    ForwardCharMotion: ForwardCharMotion,
    ForwardWordMotion: ForwardWordMotion
};

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

    private pushKeyAtStart(key): IAction {
        var keyClass = SelectKeyClass(key);
        switch (keyClass) {
            case KeyClass.TextObjectOrSingleAction:
            case KeyClass.SingleAction:
                this.numStock = 1;
                return this.createSingleAction(key);
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
                return this.createSingleAction(key);
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

    private createSingleAction(key: Key): IAction {
        var a: IAction;
        var list: IAction[];
        var char = Utils.KeyToChar(key);

        var method: string = this.findMethodInKeybinding(key, [
            keybindings.normalMode.singleAction,
            keybindings.normalMode.textObjectOrSingleAction
        ]);

        return this[method]();
    }

    private insertAction(): IAction {
        return new InsertAction();
    }

    private firstInsertAction(): IAction {
        return new FirstInsertAction();
    }

    private createMotion(key: Key, count: number): IMotion {
        var m: IMotion;
        var char = Utils.KeyToChar(key);
        var motion = this.findMethodInKeybinding(key, [
            keybindings.normalMode.motion,
            keybindings.normalMode.zero
        ]);
        var hasChain = motion.indexOf('.') !== -1;

        if (hasChain) {
            var motionSplit = motion.split('.');
            m = new motions[motionSplit[0]]();
            m[motionSplit[1]]();
        } else {
            m = new motions[motion]();
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
        var n: number = Utils.KeyToNum(key);
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
        var char = Utils.KeyToChar(key);
        a = this[keybindings.normalMode.requireMotionAction[char]]();

        this.commandString += char;
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

    private stackForwardCharMotion(key: Key, c: number): IAction {
        var m = this.createForwardCharMotion(key, c);
        var a = <IRequireMotionAction>this.stack;
        a.SetMotion(m);
        this.stackMotion = m;
        this.commandString += Utils.KeyToChar(key);
        return null;
    }

    private createForwardCharMotion(key: Key, c: number): ForwardCharMotion {
        var m: ForwardCharMotion;
        var char = Utils.KeyToChar(key);
        var action = keybindings.normalMode.requireCharMotion[char];
        
        switch (action) {
            case 'find':
                m = new ForwardCharMotion(Direction.Right, Direction.Left);
                break;
            case 'findBack':
                m = new ForwardCharMotion(Direction.Left, Direction.Left);
                break;
            case 'till':
                m = new ForwardCharMotion(Direction.Right, Direction.Right);
                break;
            case 'tillBack':
                m = new ForwardCharMotion(Direction.Left, Direction.Right);
                break;
        }
        m.SetCount(c);
        return m;
    }

    private insertLineBelowAction(): IAction {
        return this.insertNewLineAction(false);
    }

    private insertLineAboveAction(): IAction {
        return this.insertNewLineAction(true);
    }
    
    // command: o O
    public insertNewLineAction(isPre: boolean) {
        var a = new InsertNewLineAction();
        if (isPre) {
            a.SetBackOption();
        }
        return a;
    }
    
    private deleteAction(): IAction {
        return new DeleteAction();
    }

    private yancAction(): IAction {
        var ya = new DeleteAction();
        ya.SetOnlyYancOption();
        return ya;
    }

    private changeAction() {
        var ca = new DeleteAction();
        ca.SetInsertOption();
        return ca;
    }

    // command: a    
    private appendAction(): IAction {
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
    private endAppendAction(): IAction {
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
    private characterDeleteAction(): IAction {
        var m = new RightMotion();
        m.SetCount(this.numStock);
        var a = new DeleteAction();
        a.SetSmallOption();
        a.SetMotion(m);
        return a;
    }
    
    // commnad: X NX
    private characterBeforeDeleteAction(): IAction {
        var m = new LeftMotion();
        m.SetCount(this.numStock);
        var a = new DeleteAction();
        a.SetSmallOption();
        a.SetMotion(m);
        return a;
    }
    
    // commnad: s
    private characterDeleteInsertAction(): IAction {
        var m = new RightMotion();
        m.SetCount(1);
        var a = new DeleteAction();
        a.SetSmallOption();
        a.SetMotion(m);
        a.SetInsertOption()
        return a;
    }
    
    // command: S
    private lineDeleteInsertAction() {
        var m = new DownMotion();
        m.SetCount(this.numStock - 1);
        var a = new DeleteAction();
        a.SetLineOption();
        a.SetMotion(m);
        a.SetInsertOption()
        return a;
    }
    
    // command: D
    private deleteToEndAction() {
        var m = new EndMotion();
        m.SetCount(1);
        var a = new DeleteAction();
        a.SetSmallOption();
        a.SetMotion(m);
        return a;
    }
    
    // command: C
    private deleteInsertToEndAction() {
        var m = new EndMotion();
        m.SetCount(1);
        var a = new DeleteAction();
        a.SetSmallOption();
        a.SetMotion(m);
        a.SetInsertOption();
        return a;
    }
    
    // command: Y
    private yancToEndAction() {
        var m = new EndMotion();
        m.SetCount(1);
        var a = new DeleteAction();
        a.SetSmallOption();
        a.SetMotion(m);
        a.SetOnlyYancOption()
        return a;
    }

    private pasteBelowAction(): IAction {
        return this.pasteAction(false);
    }

    private pasteAboveAction(): IAction {
        return this.pasteAction(true);
    }
    
    // command: p P np NP
    private pasteAction(isBack: boolean) {
        var a = new PasteAction();
        if (isBack) {
            a.SetBackOption()
        }
        return a;
    }

    private findMethodInKeybinding(key: Key, possibleClasses: Array<Object>): string {
        var char = Utils.KeyToChar(key);
        for (var i = 0; i < possibleClasses.length; i++) {
            var bindings = possibleClasses[i];
            for (var jsonKey in bindings) {
                if (char === jsonKey) {
                    return bindings[jsonKey];
                }
            }
        }
    }
}

function SelectKeyClass(key: Key): KeyClass {
    var char = Utils.KeyToChar(key);
    for (var className in keybindings.normalMode) {
        for (var jsonKey in keybindings.normalMode[className]) {
            if (jsonKey === char) {
                switch (className) {
                    case 'singleAction':
                        return KeyClass.SingleAction
                    case 'textObjectOrSingleAction':
                        return KeyClass.TextObjectOrSingleAction;
                    case 'requireMotionAction':
                        return KeyClass.RequireMotionAction;
                    case 'requireCharMotion':
                        return KeyClass.RequireCharMotion;
                    case 'motion':
                        return KeyClass.Motion;
                    case 'zero':
                        return KeyClass.Zero;
                    case 'numWithoutZero':
                        return KeyClass.NumWithoutZero;

                }
            }
        }
    }
}