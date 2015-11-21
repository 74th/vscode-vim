import {AbstractMotion} from "./AbstractMotion"
import {IEditor} from "../IEditor"
import {Position} from "../VimStyle"

export class UpMotion extends AbstractMotion{
	
	public CalculateEnd(editor:IEditor,start:Position){
		var end = new Position();
		end.line = start.line - this.GetCount();
		end.char = start.char;
		var c = editor.GetLineCount()
		if( end.line < 0 ){
			end.line = 0;
		}
		var line = editor.GetLine(end.line);
		if( end.char > line.length ){
			end.char = line.length;
		}
		return end;
	}
}