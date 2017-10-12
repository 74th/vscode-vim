import * as Utils from "../Utils";
import {Position, Range} from "../VimStyle";

/**
 * J
 */
export class JoinLinesAction implements IAction {

    public Count: number;

    public GetActionType(): ActionType {
        return ActionType.Edit;
    }

    public Execute(editor: IEditor, vim: IVimStyle) {

        const docLines = editor.GetLastLineNum();
        const startPos = new Position(editor.GetCurrentPosition().Line, 0) ;
        let endPos: IPosition;
        if (docLines > startPos.Line + this.Count - 1) {
            endPos = new Position(startPos.Line + this.Count - 1, 0);
        } else {
            endPos = new Position(docLines, 0);
        }
        const range = new Range();
        range.start = startPos;
        range.end = endPos;

        let text = editor.ReadRange(range);
        text = text.replace(/\r\n/g, " ");
        text = text.replace(/\n/g, " ");

        let pos = new Position(startPos.Line, text.length - 1);

        editor.ReplaceRange(range, text);
        editor.SetPosition(pos);
    }
}

/**
 * J
 */
export function JoinLines(num: number): IAction {
    let a = new JoinLinesAction();
    a.Count = num < 2 ? 2 : num;
    return a;
}
