import { RegisterItem } from "../core/Register";
import { DownMotion } from "../motion/DownMotion";
import { LastCharacterInLineMotion } from "../motion/LastCharacterInLineMotion";
import { RightMotion } from "../motion/RightMotion";
import { Position, Range } from "../VimStyle";
import { AbstractInsertTextAction } from "./AbstractInsertTextAction";

/**
 * dm ym cm D Y M
 * x X s S
 */
export class DeleteYankChangeAction extends AbstractInsertTextAction
    implements IRequireMotionAction, IInsertTextAction {

    public Motion: IMotion;
    public Selection: ISelectionMotion;
    public IsLine: boolean;
    public IsLarge: boolean;
    public IsChange: boolean;
    public IsOnlyYanc: boolean;

    constructor() {
        super();
        this.Motion = null;
        this.IsLine = false;
        this.IsLarge = true;
        this.IsChange = false;
        this.IsOnlyYanc = false;
    }

    public GetActionType(): ActionType {
        if (this.IsOnlyYanc) {
            return ActionType.Other;
        } else if (this.IsChange) {
            return ActionType.Insert;
        }
        return ActionType.Edit;
    }

    public Execute(editor: IEditor, vim: IVimStyle) {

        let range = new Range();
        range.start = editor.GetCurrentPosition();
        if (this.Motion) {
            let p = this.Motion.CalculateEnd(editor, vim, range.start);
            if (p == null) {
                // cancel
                return;
            }
            range.end = p;
            range.Sort();
        } else if (this.Selection) {
            range = this.Selection.CalculateRange(editor, vim, range.start);
            if (range == null) {
                // cancel
                return;
            }
        }

        if (this.IsLine) {
            this.deleteLine(range, editor, vim);
        } else {
            this.deleteRange(range, editor, vim);
        }
    }

    private deleteRange(range: Range, editor: IEditor, vim: IVimStyle) {
        let nextPosition = new Position();

        nextPosition.Line = range.start.Line;

        let endLine = editor.ReadLine(range.end.Line);
        if (range.start.Char === 0) {
            // delete from home of line
            nextPosition.Char = 0;
        } else {
            if (endLine.length <= range.end.Char) {
                // delete to end of line
                if (this.IsChange) {
                    nextPosition.Char = range.start.Char;
                } else {
                    nextPosition.Char = range.start.Char - 1;
                }
            } else {
                // delete immidiate
                nextPosition.Char = range.start.Char;
            }
        }

        let item = new RegisterItem();
        item.Body = editor.ReadRange(range);
        item.Type = RegisterType.Text;
        if (this.IsLarge) {
            vim.Register.SetRoll(item);
        }
        if (this.IsChange) {
            if (this.insertText === null) {

                vim.ApplyInsertMode(nextPosition);
            }
        }
        if (!this.IsOnlyYanc) {
            if (this.IsChange && this.insertText) {
                editor.ReplaceRange(range, this.insertText);
                editor.SetPosition(this.calcPositionAfterInsert(nextPosition));
            } else {
                editor.DeleteRange(range, nextPosition);
            }

        }
        if (this.IsChange && this.insertText === null) {
            let startLine = editor.ReadLine(range.start.Line);
            let afterLineCount = editor.GetLastLineNum() + 1 - (range.end.Line - range.start.Line);
            vim.ApplyInsertMode(range.start);
            this.insertModeInfo = {
                DocumentLineCount: afterLineCount,
                Position: nextPosition,
                BeforeText: startLine.substring(0, range.start.Char),
                AfterText: endLine.substring(range.end.Char),
            };
        }
    }

    private deleteLine(range: Range, editor: IEditor, vim: IVimStyle) {
        let del = new Range();
        let nextPosition = new Position();
        let nextPositionLineHasNoChar = false;
        nextPosition.Char = 0;

        let lastLine = editor.GetLastLineNum();
        if (lastLine <= range.end.Line) {
            // delete to end line
            if (range.start.Line === 0) {
                // delete all
                del.start.Char = 0;
                del.start.Line = 0;
                del.end.Char = Number.MAX_VALUE;
                del.end.Line = range.end.Line;
                del.end = editor.UpdateValidPosition(del.end);
                nextPosition.Line = 0;
            } else if (this.IsChange) {
                // delete from home of start line
                del.start.Char = 0;
                del.start.Line = range.start.Line;
                del.start = editor.UpdateValidPosition(del.start);
                del.end.Char = Number.MAX_VALUE;
                del.end.Line = range.end.Line;
                del.end = editor.UpdateValidPosition(del.end);
                nextPosition.Line = del.start.Line;
            } else {
                // delete from end of previous line
                del.start.Char = Number.MAX_VALUE;
                del.start.Line = range.start.Line - 1;
                del.start = editor.UpdateValidPosition(del.start);
                del.end.Char = Number.MAX_VALUE;
                del.end.Line = range.end.Line;
                del.end = editor.UpdateValidPosition(del.end);
                nextPosition.Line = range.start.Line - 1;
            }
        } else {
            if (this.IsChange) {
                // delete from top of start line to end of end line
                del.start.Char = 0;
                del.start.Line = range.start.Line;
                del.end.Char = Number.MAX_VALUE;
                del.end.Line = range.end.Line;
                del.end = editor.UpdateValidPosition(del.end);
                nextPosition.Line = del.start.Line;
            } else {
                // delete to top of next line
                del.start.Char = 0;
                del.start.Line = range.start.Line;
                del.end.Char = 0;
                del.end.Line = range.end.Line + 1;
                nextPosition.Line = range.start.Line;
            }
        }

        let yanc = new Range();
        yanc.start.Line = range.start.Line;
        yanc.start.Char = 0;
        yanc.end.Line = range.end.Line;
        yanc.end.Char = Number.MAX_VALUE;
        yanc.end = editor.UpdateValidPosition(yanc.end);

        let item = new RegisterItem();
        item.Body = editor.ReadRange(yanc);
        if (this.IsLine) {
            item.Body += "\n";
        }
        item.Type = RegisterType.LineText;
        vim.Register.SetRoll(item);

        if (!this.IsOnlyYanc) {
            if (this.IsChange && this.insertText !== null) {
                editor.ReplaceRange(del, this.insertText);
            } else {
                editor.DeleteRange(del, nextPosition);
            }
        }
        if (this.IsChange && this.insertText === null) {
            vim.ApplyInsertMode();
            this.insertModeInfo = {
                DocumentLineCount: lastLine + 1,
                Position: nextPosition,
                BeforeText: "",
                AfterText: "",
            };
        }

    }
}

/**
 * Nx
 */
export function DeleteCharactersUnderCursor(num: number): IAction {
    let m = new RightMotion();
    m.Count = num === 0 ? 1 : num;
    let a = new DeleteYankChangeAction();
    a.IsLarge = false;
    a.Motion = m;
    return a;
}

/**
 * NX
 */
export function DeleteCharactersBeforeCursor(num: number): IAction {
    let m = new RightMotion();
    m.IsLeftDirection = true;
    m.Count = num === 0 ? 1 : num;
    let a = new DeleteYankChangeAction();
    a.IsLarge = false;
    a.Motion = m;
    return a;
}

/**
 * dm
 */
export function DeleteTextWithMotion(num: number): IAction {
    return new DeleteYankChangeAction();
}

/**
 * dd
 */
export function DeleteCurrentLine(num: number): IAction {
    let a = new DeleteYankChangeAction();
    // let a = <DeleteYankChangeAction>action;
    // if (!(a.IsOnlyYanc == false && a.IsChange == false)) {
    //     return null;
    // }
    a.IsLine = true;
    let m = new DownMotion();
    m.Count = num === 0 ? 0 : num - 1;
    a.Motion = m;
    return a;
}

/**
 * D
 */
export function DeleteTextToEndOfLine(num: number): IAction {
    let m = new LastCharacterInLineMotion();
    m.Count = 1;
    let a = new DeleteYankChangeAction();
    a.IsLarge = false;
    a.Motion = m;
    return a;
}

/**
 * ym
 */
export function YankTextWithMotion(num: number): IAction {
    let a = new DeleteYankChangeAction();
    a.IsOnlyYanc = true;
    return a;
}

/**
 * yy
 */
export function YankCurrentLine(num: number): IAction {
    let a = new DeleteYankChangeAction();
    // let a = <DeleteYankChangeAction>action;
    // if (!(a.IsOnlyYanc == true)) {
    //     this.Clear();
    //     return null;
    // }
    a.IsLine = true;
    a.IsOnlyYanc = true;
    let m = new DownMotion();
    m.Count = num === 0 ? 0 : num - 1;
    a.Motion = m;
    return a;
}

/**
 * Y
 */
export function YankLine(num: number): IAction {
    let m = new LastCharacterInLineMotion();
    m.Count = 1;
    let a = new DeleteYankChangeAction();
    a.IsLarge = false;
    a.IsLine = true;
    a.Motion = m;
    a.IsOnlyYanc = true;
    return a;
}

/**
 * c{motion}
 */
export function ChangeTextWithMotion(num: number): IAction {
    let a = new DeleteYankChangeAction();
    a.IsChange = true;
    return a;
}

/**
 * S
 */
export function ChangeLines(num: number): IAction {
    let m = new DownMotion();
    m.Count = this.getNumStack() - 1;
    let a = new DeleteYankChangeAction();
    a.IsLine = true;
    a.Motion = m;
    a.IsChange = true;
    return a;
}

/**
 * cc
 */
export function ChangeCurrentLine(num: number): IAction {
    let a = new DeleteYankChangeAction();
    // let a = <DeleteYankChangeAction>action;
    // if (!(a.IsChange == true)) {
    //     this.Clear();
    //     return null;
    // }
    a.IsLine = true;
    a.IsChange = true;
    let m = new DownMotion();
    m.Count = num === 0 ? 0 : num - 1;
    a.Motion = m;
    return a;
}

/**
 * C
 */
export function ChangeTextToEndOfLine(num: number): IAction {
    let m = new LastCharacterInLineMotion();
    m.Count = 1;
    let a = new DeleteYankChangeAction();
    a.IsLarge = false;
    a.Motion = m;
    a.IsChange = true;
    return a;
}

/**
 * s
 */
export function ChangeCharacters(num: number): IAction {
    let m = new RightMotion();
    m.Count = 1;
    let a = new DeleteYankChangeAction();
    a.IsLarge = false;
    a.Motion = m;
    a.IsChange = true;
    return a;
}
