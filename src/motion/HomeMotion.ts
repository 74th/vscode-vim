import {AbstractMotion} from "./AbstractMotion"
import {Position, Range} from "../VimStyle";

export class HomeMotion extends AbstractMotion{
	
	public CalculateSelectionRange(editor: IEditor, start: IPosition): IRange {
		var start = new Position(start.line, start.char);
		var end = this.CalculateEnd(editor, start);

		return new Range(start, end);
		
	}
	
	public CalculateEnd(editor: IEditor,start: IPosition): IPosition {
		return new Position(start.line, 0);
	}
}