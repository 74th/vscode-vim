import {IEditor} from "../IEditor";
import {VimStyle,Position} from "../VimStyle";
import {IAction} from "./IAction"

export class FirstInsertAction implements IAction {
	public Execute(editor:IEditor, vim:VimStyle){
		var line = editor.ReadLineAtCurrentPosition();
		var lineNum = editor.GetCurrentPosition().line;
		var l = line.length;
		var no:number;
		for(no=0;no<l;no++){
			var c = line[no];
			if( c != " " && c != "	" ){
				break;
			}
		}
		var p = new Position();
		p.line = lineNum;
		p.char = no;
		editor.SetPosition(p);
		vim.ApplyInsertMode();
	}
}