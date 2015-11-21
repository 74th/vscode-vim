import {IMotion} from "./IMotion"
import {IEditor} from "../IEditor"
import {Position} from "../VimStyle"

export class AbstractMotion implements IMotion{
	
	private counter:number;
	
	public GetCounter(){
		return this.counter;
	}
	
	public SetCount(count:number){
		this.counter = count;
	}
	
	public CalculateEnd(editor:IEditor,start:Position){
		throw new Error("UnImplemented");
	}
}