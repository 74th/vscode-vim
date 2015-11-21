import {VimStyle} from './VimStyle';
import * as Enums from "./VimStyleEnums";
import {IAction} from './action/IAction';
import {PanicAction} from './action/PanicAction';
import {CombinationAction} from './action/CombinationAction';
import {InsertAction} from './action/InsertAction';
import {DeleteAction} from './action/DeleteAction';
import {FirstInsertAction} from './action/FirstInsertAction';
import {MoveAction} from './action/MoveAction';
import {IMotion} from './motion/IMotion';
import {RightMotion} from './motion/RightMotion';
import {LeftMotion} from './motion/LeftMotion';
import {UpMotion} from './motion/UpMotion';
import {DownMotion} from './motion/DownMotion'
import {FirstMotion} from './motion/FirstMotion'
import {EndMotion} from './motion/EndMotion'


enum CommandStatus {
	None,
	FirstNum,
	RequireMotion,
	RequireMotionNum
}
enum KeyClass {
	NumWithoutZero,
	Zero,
	Motion,
	TextObjectOrSingleAction,
	SingleAction,
	RangeAction
}

export class CommandFactory {

	private status: CommandStatus;
	private stack: any[];
	private numStock: number;
	private commandString: string;

	constructor() {
		this.status = CommandStatus.None;
		this.stack = [];
		this.commandString = "";
	}

	public PushKey(key: Enums.Key): IAction {
		switch (this.status) {
			case CommandStatus.None:
				return this.pushKeyAtStart(key);
			case CommandStatus.FirstNum:
				return this.pushKeyAtFirstNum(key);
		}
	}

	public Clear() {
		this.status = CommandStatus.None;
		this.stack = [];
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
				return this.createSingleAction(key,1);
			case KeyClass.Motion:
			case KeyClass.Zero:
				return this.createMoveAction(key, 1);
			case KeyClass.NumWithoutZero:
				this.status = CommandStatus.FirstNum;
				this.numStock = 0;
				return this.setNumStock(key);
			default:
				this.Clear();
				return new PanicAction();
		}
	}

	private pushKeyAtFirstNum(key: Enums.Key): IAction {
		var keyClass = SelectKeyClass(key);
		switch (keyClass) {
			case KeyClass.Motion:
				return this.createMoveAction(key,this.numStock);
			case KeyClass.NumWithoutZero:
            case KeyClass.Zero:
                this.setNumStock(key);
                return null;
            case KeyClass.SingleAction:
                return this.createSingleAction(key, this.numStock);
        }
        throw new Error("Panic!");
	}

	private createSingleAction(key: Enums.Key,count:number): IAction {
		var action:IAction;
		var list:IAction[];
		switch (key) {
			case Enums.Key.i:
				return new InsertAction();
			case Enums.Key.a:
				return this.createAppendAction();
			case Enums.Key.I:
				return new FirstInsertAction();
			case Enums.Key.A:
                return this.createEndAppendAction();
            case Enums.Key.x:
                return this.createCharactorDeleteAction(count);    
			// TODO
			default:
				return new PanicAction();
		}
	}

	private createMoveAction(key: Enums.Key, count: number): IAction {
		var motion: IMotion;
		switch (key) {
			case Enums.Key.l:
				motion = new RightMotion();
				break;
			case Enums.Key.h:
				motion = new LeftMotion();
				break;
			case Enums.Key.j:
				motion = new DownMotion();
				break;
			case Enums.Key.k:
				motion = new UpMotion();
				break;
			case Enums.Key.n0:
				motion = new FirstMotion();
				break;
			case Enums.Key.doller:
				motion = new EndMotion();
				break;
			default :
				throw new Error("Panic!");
		}
		motion.SetCount(count);
		return new MoveAction(motion);
	}
	
	private setNumStock(key: Enums.Key): IAction {
		var plus: number;
		switch (key) {
			case Enums.Key.n0:
				plus = 0;
				break;
			case Enums.Key.n1:
				plus = 1;
				break;
			case Enums.Key.n2:
				plus = 2;
				break;
			case Enums.Key.n3:
				plus = 3;
				break;
			case Enums.Key.n4:
				plus = 4;
				break;
			case Enums.Key.n5:
				plus = 5;
				break;
			case Enums.Key.n6:
				plus = 6;
				break;
			case Enums.Key.n7:
				plus = 7;
				break;
			case Enums.Key.n8:
				plus = 8;
				break;
			case Enums.Key.n9:
				plus = 9;
				break;
		}
		this.numStock = this.numStock * 10 + plus;
		this.commandString += plus.toString();
		if (this.numStock > 10000) {
			return new PanicAction();
		}
		return null;
	}

	private createAppendAction():IAction{
		var motion = new RightMotion();
		motion.SetCount(1);
		return new CombinationAction([
			new MoveAction(motion),
			new InsertAction()
		]);
	}
	
	private createEndAppendAction():IAction{
		var motion = new EndMotion();
		motion.SetCount(1);
        return new CombinationAction([
            new MoveAction(motion),
            new InsertAction()
        ]);
    }
    
    // commnad: x
    private createCharactorDeleteAction(c:number):IAction {
        var m = new RightMotion();
        m.SetCount(c);
        return new DeleteAction(m);
    }

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
		case Enums.Key.doller:
			return KeyClass.Motion;
		case Enums.Key.x:
		case Enums.Key.s:
		case Enums.Key.I:
		case Enums.Key.A:
			return KeyClass.SingleAction;
		case Enums.Key.i:
		case Enums.Key.a:
			return KeyClass.TextObjectOrSingleAction;
	}
}