import {AbstractInsertTextAction} from "./AbstractInsertTextAction";
import {Range, Position} from "../VimStyle";
import {RegisterItem} from "../core/Register";

export class CallEditorCommandAction implements IAction {

    public Callback: ICommandCallback;
    public Argument: string;

    public GetActionType(): ActionType {
        return ActionType.Other;
    }

    public Execute(editor: IEditor, vim: IVimStyle) {
        if (this.Callback === undefined || this.Callback === null) {
            editor.CallEditorCommand(this.Argument);
        } else {
            this.Callback(editor, vim);
        }
    }

}