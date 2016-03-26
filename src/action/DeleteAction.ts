import {Range, Position} from "../VimStyle";
import {RegisterItem} from "../core/Register";

export class DeleteAction implements IRequireMotionAction, IInsertAction {

    public motion: IMotion;
    public isLine: boolean;
    public isLarge: boolean;
    public isInsert: boolean;
    public isOnlyYanc: boolean;
    private insertText: string;
    private insertModeInfo: any;

    constructor() {
        this.motion = null;
        this.isLine = false;
        this.isLarge = true;
        this.isInsert = false;
        this.isOnlyYanc = false;
    }

    public GetActionType(): ActionType {
        if (this.isOnlyYanc) {
            return ActionType.Other;
        } else if (this.isInsert) {
            return ActionType.Insert;
        }
        return ActionType.Edit;
    }

    public SetInsertText(text: string) {
        this.insertText = text;
    }

    public SetLineOption() {
        this.isLine = true;
    }

    public SetSmallOption() {
        this.isLarge = true;
    }

    public SetChangeOption() {
        this.isInsert = true;
    }

    public SetOnlyYancOption() {
        this.isOnlyYanc = true;
    }

    public SetMotion(motion: IMotion) {
        this.motion = motion;
    }

    public GetInsertModeInfo() {
        return this.insertModeInfo;
    }

    public Execute(editor: IEditor, vim: IVimStyle) {

        let range = new Range();
        range.start = editor.GetCurrentPosition();
        let p = this.motion.CalculateEnd(editor, range.start);
        if (p == null) {
            // cancel
            return;
        }
        range.end = p;
        range.Sort();

        if (this.isLine) {
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
                if (this.isInsert) {
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
        if (this.isLarge) {
            vim.Register.SetRoll(item);
        }
        if (this.isInsert) {
            vim.ApplyInsertMode(nextPosition);
        }
        if (!this.isOnlyYanc) {
            editor.DeleteRange(range, nextPosition);
        }
        if (this.isInsert && this.insertText === null) {
            let startLine = editor.ReadLine(range.start.Line);
            let endLine = editor.ReadLine(range.end.Line);
            let afterLineCount = editor.GetLastLineNum() + 1 - (range.end.Line - range.start.Line);
            vim.ApplyInsertMode();
            this.insertModeInfo = {
                DocumentLineCount: afterLineCount,
                Position: nextPosition,
                BeforeText: startLine.substring(0, range.start.Char),
                AfterText: endLine.substring(range.end.Char)
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
            } else if (this.isInsert) {
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
            if (this.isInsert) {
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
        if (this.isLine) {
            item.Body += "\n";
        }
        item.Type = RegisterType.LineText;
        vim.Register.SetRoll(item);

        if (!this.isOnlyYanc) {
            if (this.isInsert && this.insertText !== null) {
                editor.ReplaceRange(del, this.insertText);
            } else {
                editor.DeleteRange(del, nextPosition);
            }
        }
        if (this.isInsert && this.insertText === null) {
            vim.ApplyInsertMode();
            this.insertModeInfo = {
                DocumentLineCount: lastLine + 1,
                Position: nextPosition,
                BeforeText: "",
                AfterText: ""
            };
        }

    }
}