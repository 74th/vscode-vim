import {IEditor} from "../IEditor";
import {VimStyle} from "../VimStyle";
import {IAction} from "./IAction"

export class InsertAction implements IAction {
	public Execute(editor:IEditor, vim:VimStyle){
		vim.ApplyInsertMode();
	}
}