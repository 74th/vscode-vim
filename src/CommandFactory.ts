import {VimStyle} from './VimStyle';
import * as Enums from "./VimStyleEnums";
import {IAction} from './action/IAction';
import {InsertAction} from './action/InsertAction';
import {MoveAction} from './action/MoveAction';
import {IMotion} from './motion/IMotion';
import {RightMotion} from './motion/RightMotion';

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
	private commandString: string;
	
	constructor(){
		this.status = CommandStatus.None;
		this.stack = [];
		this.commandString = "";
	}
	
	public PushKey(key: Enums.Key): IAction {
		switch(this.status){
			case CommandStatus.None:
			return this.pushKeyAtStart(key);
		}
	}
	
	public Clear() {
		this.status = CommandStatus.None;
		this.stack = [];
		this.commandString = "";
	}

	public GetCommandString(): string {
		return this.commandString;
	}
	
	private pushKeyAtStart(key):IAction{
		var keyClass = SelectKeyClass(key);
		// TODO other
		switch(keyClass){
			case KeyClass.TextObjectOrSingleAction:
			case KeyClass.SingleAction:
				return this.createSingleAction(key);
			case KeyClass.Motion:
				return this.createMoveAction(key,1);
		}
		
	}
	
	private createSingleAction(key):IAction{
		switch(key) {
			case Enums.Key.i:
				return new InsertAction();
			// TODO other
		}
	}
	
	private createMoveAction(key,count:number):IAction{
		var action = new MoveAction();
		var motion : IMotion;
		switch(key) {
			case Enums.Key.l:
				motion = new RightMotion();
				break;
		}
		motion.SetCount(count);
		action.SetMotion(motion);
		return action;
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
			return KeyClass.Motion;
		case Enums.Key.x:
		case Enums.Key.s:
			return KeyClass.SingleAction;
		case Enums.Key.i:
		case Enums.Key.a:
			return KeyClass.TextObjectOrSingleAction;
	}
}