import {Position,Range} from "./VimStyle" 
export interface IEditor{
    
    // Status
	CloseStatus();
	ShowStatus(text:string);
    
    // Edit
	InsertTextAtCurrentPosition(text:string);
    DeleteRange(range:Range);
    ReplaceRange(range:Range,text:string);
    
    // Read Line
	ReadLineAtCurrentPosition():string;
	ReadLine(line:number):string;
    
    // Read Range
    ReadRange(range: Range):string;
    
    // Position
	GetCurrentPosition():Position;
	SetPosition(position:Position);
    
    // Document Info
	GetLineCount():number;
}