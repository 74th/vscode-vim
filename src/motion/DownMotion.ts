import {AbstractMotion} from "./AbstractMotion"
import {IEditor} from "../IEditor"
import {Position} from "../VimStyle"

export class DownMotion extends AbstractMotion{
	
	public CalculateEnd(editor:IEditor,start:Position){
		var end = new Position();
		end.line = start.line + this.GetCount();
		end.char = start.char;
		var c = editor.GetLineCount() -1;
		if( end.line > c ){
			end.line = c;
		}
		var line = editor.GetLine(end.line);
		if( end.char > line.length ){
			end.char = line.length;
		}
		return end;
	}
}