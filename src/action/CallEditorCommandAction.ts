import { RegisterItem } from "../core/Register";
import { Position, Range } from "../VimStyle";
import { AbstractInsertTextAction } from "./AbstractInsertTextAction";

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

export function EditorCommand(command: IVimStyleCommand): IAction {
    let a = new CallEditorCommandAction();
    a.Argument = command.argument;
    a.Callback = command.callback;
    return a;
}
