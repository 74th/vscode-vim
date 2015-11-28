import {VimStyle} from "../VimStyle";

export class CombinationAction implements IAction {
    private actionList: IAction[];
    constructor(list: IAction[]) {
        this.actionList = list;
    }
    public Execute(editor: IEditor, vim: IVimStyle) {
        var l = this.actionList.length;
        for (var i = 0; i < l; i++) {
            this.actionList[i].Execute(editor, vim);
        }
    }
}