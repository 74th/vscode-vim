import {Range, Position} from "../VimStyle";
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
        let startPosition: Position;
        let currentPosition = editor.GetCurrentPosition();

        if (before.start.IsEqual(currentPosition)) {
            startPosition = new Position(before.end.Line, before.end.Char - 1);
        } else {
            startPosition = before.start;
            currentPosition = new Position(currentPosition.Line, currentPosition.Char - 1);
        }

        let nextPosition = this.Motion.CalculateEnd(editor, vim, currentPosition);
        let after = new Range();
        if (nextPosition.IsAfterOrEqual(startPosition)) {
            after.start = startPosition;
            after.end = new Position(nextPosition.Line, nextPosition.Char + 1);
        } else {
            after.start = new Position(startPosition.Line, startPosition.Char + 1);
            after.end = nextPosition;
        }
        editor.ShowVisualMode(after, after.end);
    }
}