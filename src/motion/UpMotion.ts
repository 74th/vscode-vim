import {AbstractMotion} from "./AbstractMotion"
import {Position} from "../VimStyle";

export class UpMotion extends AbstractMotion{
	
	public CalculateEnd(editor: IEditor,start: IPosition): IPosition {
		var end = new Position();
		end.line = start.line - this.GetCount();
		end.char = start.char;
		var c = editor.GetLastLineNum()
		if( end.line < 0 ){
			end.line = 0;
		}
		var line = editor.ReadLine(end.line);
		if( end.char > line.length ){
			end.char = line.length;
		}
		return end;
	}
}