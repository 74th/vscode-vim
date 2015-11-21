import {IMotion} from "./IMotion"
import {IEditor} from "../IEditor"
import {Position} from "../VimStyle"

export class AbstractMotion implements IMotion{
	
	private count:number;
	
	public GetCount(){
		return this.count;
	}
	
	public SetCount(count:number){
		this.count = count;
	}
	
	public CalculateEnd(editor:IEditor,start:Position){
		throw new Error("UnImplemented");
	}
}