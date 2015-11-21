import {IEditor} from "../IEditor"
import {Position} from "../VimStyle"

export interface IMotion{
	SetCount(count:number);
	CalculateEnd(editor:IEditor,start:Position);
}