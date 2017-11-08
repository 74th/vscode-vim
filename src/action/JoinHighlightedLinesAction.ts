import * as Utils from "../Utils";
import {Position, Range} from "../VimStyle";

/**
 * {Visual}J {VisualLine}J
 */
export class JoinHighlightedLinesAction implements IAction {

    public GetActionType(): ActionType {
        return ActionType.Edit;
    }

    public Execute(editor: IEditor, vim: IVimStyle) {
        let startLine: number;
        let endLine: number;
        if (vim.GetMode() === VimMode.Visual) {
            // Visual Mode
            let s = editor.GetCurrentVisualModeSelection();
            startLine = s.start.Line;
            endLine = s.end.Line;
        } else {
            // Visual Line Mode
            let s = editor.GetCurrentVisualLineModeSelection();
            startLine = s.startLine;
            endLine = s.endLine;
        }

        const docLines = editor.GetLastLineNum();
        const startPos = new Position(startLine, 0);
        let endPos: IPosition;
        if (startLine === endLine) {
            if (startLine + 1 === docLines) {
                return;
            }
            endPos = new Position(endLine + 1, 0);
        } else {
            endPos = new Position(endLine, 0);
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
 * {Visual}J
 */
export function JoinHighlightedText(num: number): IAction {
    let a = new JoinHighlightedLinesAction();
    return a;
}

/**
 * {VisualLine}J
 */
export function JoinHighlightedLines(num: number): IAction {
    let a = new JoinHighlightedLinesAction();
    return a;
}
