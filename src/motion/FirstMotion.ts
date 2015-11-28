import {AbstractMotion} from "./AbstractMotion"
import {Position} from "../VimStyle";

export class FirstMotion extends AbstractMotion{
	
	public CalculateEnd(editor: IEditor,start: IPosition): IPosition {
		var end = new Position();
		end.line = start.line;
		end.char = 0;
		return end;
	}
}