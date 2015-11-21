import {IEditor} from "../IEditor";
import {VimStyle} from "../VimStyle";
import {IAction} from "./IAction"

export class CombinationAction implements IAction {
	private actionList: IAction[];
	constructor(list: IAction[]) {
		this.actionList = list;
	}
	public Execute(editor: IEditor, vim: VimStyle) {
		var l = this.actionList.length;
		for (var i = 0; i < l; i++) {
			this.actionList[i].Execute(editor, vim);
		}
	}
}