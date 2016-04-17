import {Range} from "../VimStyle";
export class ExpandHighlightedTextAction implements IAction {

    public Motion: IMotion;

    constructor() {
        this.Motion = null;
    }

    public GetActionType(): ActionType {
        return ActionType.Other;
    }

    public Execute(editor: IEditor, vim: IVimStyle) {
        let before = editor.GetCurrentVisualModeSelection();
        before.Sort();
        let p = editor.GetCurrentPosition();

        let np = this.Motion.CalculateEnd(editor, p);
        let after = new Range();

        if (before.start.Line === before.end.Line &&
            (before.start.Char - before.end.Char === 1 ||
                before.end.Char - before.start.Char === 1)) {
            // selected 1 char
            before.Sort();
            if (np.IsBefore(before.start)) {
                np = this.Motion.CalculateEnd(editor, before.start);
                after.start = before.end;
                after.end = np;
            } else if (np.IsEqual(before.start)) {
                after.start = before.end;
                after.end = np;
            }else {
                np = this.Motion.CalculateEnd(editor, before.end);
                after.start = before.start;
                after.end = np;
            }
        } else {
            let startBlock = new Range();
            let cursor: IPosition;
            if (before.start.IsEqual(p)) {
                // cursor is start of the selection
                startBlock.end = before.end.Copy();
                startBlock.start = before.end.Copy();
                if (startBlock.start.Char > 0) {
                    startBlock.start.Char -= 1;
                }
                cursor = before.start.Copy();
            } else {
                // cursor is end of the selection
                startBlock.start = before.start.Copy();
                startBlock.end = before.start.Copy();
                startBlock.end.Char += 1;
                cursor = before.end.Copy();
                if (cursor.Char > 0) {
                    cursor.Char -= 1;
                }
            }

            np = this.Motion.CalculateEnd(editor, cursor);

            if (np.IsBefore(startBlock.start)) {
                // move start
                after.start = startBlock.end.Copy();
                after.end = np;
            } else if (np.IsAfter(startBlock.end)) {
                // move end
                after.start = startBlock.start.Copy();
                after.end = np;
                after.end.Char += 1;
            } else {
                after.start = startBlock.end.Copy();
                after.end = startBlock.start.Copy();
            }
        }
        editor.ShowVisualMode(after, after.end);
    }
}