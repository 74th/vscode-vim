import {AbstractInsertTextAction} from "./AbstractInsertTextAction";
import {Range, Position} from "../VimStyle";
import {RegisterItem} from "../core/Register";

export class ReplaceCharacterAction implements IRequireCharAction, ICountableAction {

    public Count: number;
    public CharacterCode: number;
    public IsAffectingLayout: boolean;

    constructor() {
        this.Count = null;
        this.CharacterCode = null;
        this.IsAffectingLayout = true;
    }

    public GetActionType(): ActionType {
        return ActionType.Edit;
    }

    public Execute(editor: IEditor, vim: IVimStyle) {
        const cp = editor.GetCurrentPosition();
        const line = editor.ReadLineAtCurrentPosition();

        let text = "";
        const char = String.fromCharCode(this.CharacterCode);
        for (let i = 0; i < this.Count; i++) {
            text += char;
        }

        let r = new Range();
        r.start = cp;
        if (cp.Char + this.Count > line.length) {
            if (this.IsAffectingLayout) {
                return;
            }
            r.end = new Position(cp.Line, line.length);
        } else {
            r.end = new Position(cp.Line, cp.Char + this.Count);
        }
        let np: IPosition;
        np = new Position(cp.Line, cp.Char + this.Count - 1);

        editor.ReplaceRange(r, text);
        editor.SetPosition(np);
        return;
    }
}