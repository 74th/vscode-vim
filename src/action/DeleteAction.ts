import {Range, Position} from "../VimStyle";
import {RegisterItem} from "../core/Register";

export class DeleteAction implements IRequireMotionAction {

    public motion: IMotion;
    public isLine: boolean;
    public isLarge: boolean;
    public isInsert: boolean;
    public isOnlyYanc: boolean;

    constructor() {
        this.motion = null;
        this.isLine = false;
        this.isLarge = true;
        this.isInsert = false;
        this.isOnlyYanc = false;
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

    public Execute(editor: IEditor, vim: IVimStyle) {

        var range = new Range();
        range.start = editor.GetCurrentPosition();
        var p = this.motion.CalculateEnd(editor, range.start);
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
        var nextPosition = new Position();
        var nextPositionLineHasNoChar = false;

        nextPosition.line = range.start.line;

        var endLine = editor.ReadLine(range.end.line);
        if (range.start.char == 0) {
            nextPosition.char = 0;
            if (endLine.length <= range.end.char) {
                // delete to end
                nextPositionLineHasNoChar = true;
            }
        } else {
            if (endLine.length <= range.end.char) {
                // delete to end 
                nextPosition.char = range.start.char - 1;
            } else {
                nextPosition.char = range.start.char;
            }
        }

        var item = new RegisterItem();
        item.Body = editor.ReadRange(range);
        item.Type = RegisterType.Text;
        if (this.isLarge) {
            vim.Register.SetRoll(item);
        }
        if (!this.isOnlyYanc) {
            editor.DeleteRange(range);
        }
        if (this.isInsert) {
            vim.ApplyInsertMode(nextPosition);
        } else if (!this.isOnlyYanc) {
            editor.ApplyNormalMode(nextPosition, nextPositionLineHasNoChar);
        }

    }

    private deleteLine(range: Range, editor: IEditor, vim: IVimStyle) {
        var del = new Range();
        var nextPosition = new Position();
        var nextPositionLineHasNoChar = false;
        nextPosition.char = 0;

        var lineNum = editor.GetLastLineNum();
        var nextLine = "";
        var lastLine: string;
        if (lineNum <= range.end.line) {
            // delete to end line
            if (range.start.line == 0) {
                // delete all
                del.start.char = 0;
                del.start.line = 0;
                del.end.char = Number.MAX_VALUE;
                del.end.line = range.end.line;
                del.end = editor.UpdateValidPosition(del.end);
                nextPosition.line = 0;
                nextLine = "";
            } else if (this.isInsert) {
                // delete from home of start line
                del.start.char = 0;
                del.start.line = range.start.line;
                del.start = editor.UpdateValidPosition(del.start);
                del.end.char = Number.MAX_VALUE;
                del.end.line = range.end.line;
                del.end = editor.UpdateValidPosition(del.end);
                nextPosition.line = del.start.line;
            } else {
                // delete from end of previous line
                del.start.char = Number.MAX_VALUE;
                del.start.line = range.start.line - 1;
                del.start = editor.UpdateValidPosition(del.start);
                del.end.char = Number.MAX_VALUE;
                del.end.line = range.end.line;
                del.end = editor.UpdateValidPosition(del.end);
                nextPosition.line = range.start.line - 1;
                nextLine = editor.ReadLine(del.start.line - 1);
            }
        } else {
            if (this.isInsert) {
                // delete from top of start line to end of end line
                del.start.char = 0;
                del.start.line = range.start.line;
                del.end.char = Number.MAX_VALUE;
                del.end.line = range.end.line;
                del.end = editor.UpdateValidPosition(del.end);
                nextPosition.line = del.start.line;
            } else {
                // delete to top of next line
                del.start.char = 0;
                del.start.line = range.start.line;
                del.end.char = 0;
                del.end.line = range.end.line + 1;
                nextPosition.line = range.start.line;
                nextLine = editor.ReadLine(range.end.line + 1);
            }
        }

        var nextPositionLineHasNoChar = nextLine.length == 0;
        var yanc = new Range();
        yanc.start.line = range.start.line;
        yanc.start.char = 0;
        yanc.end.line = range.end.line;
        yanc.end.char = Number.MAX_VALUE;
        yanc.end = editor.UpdateValidPosition(yanc.end);

        var item = new RegisterItem();
        item.Body = editor.ReadRange(yanc);
        if (this.isLine) {
            item.Body += "\n";
        }
        item.Type = RegisterType.LineText;
        vim.Register.SetRoll(item);

        if (!this.isOnlyYanc) {
            editor.DeleteRange(del);
        }
        if (this.isInsert) {
            vim.ApplyInsertMode(nextPosition);
        } else {
            if (!this.isOnlyYanc) {
                editor.ApplyNormalMode(nextPosition, nextPositionLineHasNoChar);
            }
        }
    }
}