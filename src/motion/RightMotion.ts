import {AbstractMotion} from "./AbstractMotion"
import {IEditor} from "../IEditor"
import {Position} from "../VimStyle"

export class RightMotion extends AbstractMotion{
	
	public CalculateEnd(editor:IEditor,start:Position){
		var line = editor.ReadLineAtCurrentPosition();
		var end = new Position();
		end.line = start.line;
		end.char = start.char + this.GetCount();
		if( line.length < end.char ){
			end.char = line.length;
		}
		return end;
	}
}