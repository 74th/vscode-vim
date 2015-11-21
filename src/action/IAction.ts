import {IEditor} from "../IEditor"
import {VimStyle} from "../VimStyle"

export interface IAction{
	Execute(editor:IEditor, vim:VimStyle);
}
