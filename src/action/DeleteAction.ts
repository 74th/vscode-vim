import {IEditor} from "../IEditor";
import {VimStyle} from "../VimStyle";
import {IAction} from "./IAction";
import {IMotion} from "../motion/IMotion";

export class DeleteAction implements IAction {
	public motion:IMotion;
	public Execute(editor:IEditor, vim:VimStyle){
		vim.ApplyInsertMode();
	}
}