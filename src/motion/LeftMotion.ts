import {AbstractMotion} from "./AbstractMotion"
import {Position} from "../VimStyle";

export class LeftMotion extends AbstractMotion{
	
	public CalculateEnd(editor: IEditor, start: IPosition): IPosition {
		var end = new Position();
		end.line = start.line;
		end.char = start.char - this.GetCount();
		if( end.char < 0 ){
			end.char = 0;
		}
		return end;
	}
}