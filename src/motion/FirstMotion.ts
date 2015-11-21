import {AbstractMotion} from "./AbstractMotion"
import {IEditor} from "../IEditor"
import {Position} from "../VimStyle"

export class FirstMotion extends AbstractMotion{
	
	public CalculateEnd(editor:IEditor,start:Position){
		var end = new Position();
		end.line = start.line;
		end.char = 0;
		return end;
	}
}