import {IEditor} from "../IEditor";
import {VimStyle} from "../VimStyle";
import {IAction} from "./IAction"

export class PanicAction implements IAction {
    public Execute(editor: IEditor, vim: VimStyle) {
        editor.CloseStatus()
    }
}