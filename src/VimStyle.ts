import * as Enums from "./VimStyleEnums";
import {CommandFactory} from "./CommandFactory";
import {InsertModeExecute} from "./mode/InsertMode";
import {IEditor} from "./IEditor"
import * as Utils from "./Utils"

enum Mode {
	Normal,
	Insert
}

export class VimStyle {
	
	private mode: Mode;
	private editor: IEditor;
	private commandFactory: CommandFactory;
	public Register;

	constructor(editor: IEditor) {
		this.editor = editor;
		this.mode = Mode.Normal;
		this.commandFactory = new CommandFactory();
		this.Register = new Register(); 
	}

	public PushKey(key: Enums.Key) {
		switch (this.mode) {
			case Mode.Normal:
				this.readCommand(key);
				return;
			case Mode.Insert:
				InsertModeExecute(key, this.editor)
		}
	}

	public PushEscKey() {
		this.mode = Mode.Normal;
		this.commandFactory.Clear()
		this.editor.CloseStatus();
	}

	public ApplyInsertMode() {
		this.mode = Mode.Insert;
	}

	private readCommand(key: Enums.Key) {
		var action = this.commandFactory.PushKey(key);
		if(action == null){
			this.showCommand();
			return;
		}
		this.editor.CloseStatus();
		action.Execute(this.editor,this);
		this.commandFactory.Clear();
	}
	
	private showCommand(){
		this.editor.ShowStatus(this.commandFactory.GetCommandString());
	}
}

export class Position{
	public line:number;
	public char:number;
}

export class Range{
	public start:Position;
	public end:Position;
}

class Register{
	private register :any;
	private rollregister: string[]
	constructor(){
		this.register = {};
		this.rollregister = [];
	}
	public Set(key:Enums.Key,value:string){
		this.register[key] = value;
	}
	public Get(key:Enums.Key):string{
		if( this.register[key] == undefined ){
			return "";
		}
		return this.register[key];
	}
	public SetRoll(value){
		this.rollregister.unshift(value);
		if( this.rollregister.length > 10 ){
			this.rollregister.length = 10;
		}
	}
	public GetRollFirst(value){
		if( this.rollregister.length > 0){
			return this.rollregister[0];
		}
		return "";
	}
	public GetRoll(key:Enums.Key){
		
	}
}