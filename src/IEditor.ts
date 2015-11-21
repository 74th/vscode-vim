import {Position,Range} from "./VimStyle" 
export interface IEditor{
	CloseStatus();
	ShowStatus(text:string);
	InsertTextAtCurrentPosition(text:string);
	GetLineAtCurrentPosition():string;
	GetLine(line:number):string;
	GetCurrentPosition():Position;
	SetPosition(position:Position);
}