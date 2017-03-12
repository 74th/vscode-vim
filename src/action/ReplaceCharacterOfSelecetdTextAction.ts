import { RegisterItem } from "../core/Register";
import { Position, Range } from "../VimStyle";

/**
 * {Visual}c{char}
 */
export class ReplaceCharacterOfSelectedTextAction implements IRequireCharAction {

    public CharacterCode: number;

    public GetActionType(): ActionType {
        return ActionType.Edit;
    }

    public Execute(editor: IEditor, vim: IVimStyle) {

        let s = editor.GetCurrentVisualModeSelection();
        s.Sort();

        let char = String.fromCharCode(this.CharacterCode);

        let text = "";
        if (s.start.Line === s.end.Line) {
            for (let i = s.start.Char; i < s.end.Char; i++) {
                text += char;
            }
        } else {
            let line = editor.ReadLine(s.start.Line);
            for (let c = s.start.Char; c < line.length; c++) {
                text += char;
            }
            text += "\n";
            for (let l = s.start.Line + 1; l < s.end.Line; l++) {
                line = editor.ReadLine(l);
                for (let c of line) {
                    text += char;
                }
                text += "\n";
            }
            line = editor.ReadLine(s.end.Line);
            for (let c = 0; c < s.end.Char; c++) {
                text += char;
            }
        }

        editor.ReplaceRange(s, text);
        editor.SetPosition(s.start);
    }
}

/**
 * {Visual}c{char}
 */
export function ReplaceCharacterOfSelectedText(num: number): IAction {
    return new ReplaceCharacterOfSelectedTextAction();
}
