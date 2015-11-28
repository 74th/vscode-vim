import {AbstractMotion} from "./AbstractMotion"
import {Position} from "../VimStyle";

export class EndMotion extends AbstractMotion{
	
	public CalculateEnd(editor: IEditor,start: IPosition): IPosition {
		var line = editor.ReadLineAtCurrentPosition();
		var end = new Position();
		end.line = start.line;
		end.char = line.length;
		return end;
	}
}