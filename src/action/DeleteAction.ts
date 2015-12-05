import {Range} from "../VimStyle";
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
        var r = new Range();
        r.start = editor.GetCurrentPosition();
        var p = this.motion.CalculateEnd(editor, r.start);
        if (p == null) {
            // cancel
            return;
        }
        r.end = p;
        r.Sort();

        var item = new RegisterItem();
        if (this.isLine) {

            r.start.char = 0;
            r.end.line = r.end.line + 1;
            r.end.char = 0;
            var lastLineCount = editor.GetLastLineNum();
            if (r.end.line > lastLineCount) {
                // over last line
                var lastLine = editor.ReadLine(lastLineCount)
                r.end.line = lastLineCount;
                r.end.char = lastLine.length;
                item.Body = editor.ReadRange(r) + "\n";
                if (r.start.line > 0) {
                    // delete previous \n
                    var preLine = editor.ReadLine(r.start.line - 1);
                    r.start.line = r.start.line - 1;
                    r.start.char = preLine.length;
                }
            } else {
                item.Body = editor.ReadRange(r);
            }
            item.Type = RegisterType.LineText;
        } else {
            item.Body = editor.ReadRange(r);
            item.Type = RegisterType.Text;
        }

        if (this.isLarge) {
            vim.Register.SetRoll(item);
        }
        if (!this.isOnlyYanc) {
            if (this.isLine && this.isInsert) {
                editor.ReplaceRange(r, "\n");
            } else {
                editor.DeleteRange(r);
            }
        }

        if (this.isInsert) {
            vim.ApplyInsertMode(r.start);
        }
    }
}