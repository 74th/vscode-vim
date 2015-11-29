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
        var start = editor.GetCurrentPosition();
        var range = this.motion.CalculateSelectionRange(editor, start);
        
        if(!range) {
            return;
        }

        var item = new RegisterItem();
        if (this.isLine) {

            range.start.char = 0;
            range.end.line = range.end.line + 1;
            range.end.char = 0;
            var lastLineCount = editor.GetLastLineNum();
            if (range.end.line > lastLineCount) {
                // over last line
                var lastLine = editor.ReadLine(lastLineCount)
                range.end.line = lastLineCount;
                range.end.char = lastLine.length;
                item.Body = editor.ReadRange(range) + "\n";
                if (range.start.line > 0) {
                    // delete previous \n
                    var preLine = editor.ReadLine(range.start.line - 1);
                    range.start.line = range.start.line - 1;
                    range.start.char = preLine.length;
                }
            } else {
                item.Body = editor.ReadRange(range);
            }
            item.Type = RegisterType.LineText;
        } else {
            item.Body = editor.ReadRange(range);
            item.Type = RegisterType.Text;
        }

        if (this.isLarge) {
            vim.Register.SetRoll(item);
        }
        if (!this.isOnlyYanc) {
            if (this.isLine && this.isInsert) {
                editor.ReplaceRange(range, "\n");
            } else {
                editor.DeleteRange(range);
            }
        }

        if (this.isInsert) {
            vim.ApplyInsertMode();
        }
    }
}