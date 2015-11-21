import {AbstractMotion} from "./AbstractMotion"
import {IEditor} from "../IEditor"
import {Position} from "../VimStyle"

export class EndMotion extends AbstractMotion{
	
	public CalculateEnd(editor:IEditor,start:Position){
		var line = editor.ReadLineAtCurrentPosition();
		var end = new Position();
		end.line = start.line;
		end.char = line.length;
		return end;
	}
}