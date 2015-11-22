import {IEditor} from "../IEditor";
import {VimStyle, Range} from "../VimStyle";
import {RegisterItem} from "../Register";
import * as Enums from "../VimStyleEnums";
import {IAction} from "./IAction";
import {IMotion} from "../motion/IMotion";

export class DeleteAction implements IAction {

    public motion: IMotion;
    public isLine: boolean;
    public isLarge: boolean;

    constructor() {
        this.motion = null;
        this.isLine = false;
        this.isLarge = true;
    }

    public SetLineOption() {
        this.isLine = true;
    }
    
    public SetSmallOption() {
        this.isLarge = true;
    }
    
    public SetMotion(motion: IMotion) {
        this.motion = motion;
    }

    public Execute(editor: IEditor, vim: VimStyle) {
        var r = new Range();
        r.start = editor.GetCurrentPosition();
        r.end = this.motion.CalculateEnd(editor, r.start);
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
                    var preLine = editor.ReadLine(r.start.line -1);
                    r.start.line = r.start.line - 1;
                    r.start.char = preLine.length;
                }
            } else {
                item.Body = editor.ReadRange(r);
            }
            item.Type = Enums.RegisterType.LineText;
        } else {
            item.Body = editor.ReadRange(r);
            item.Type = Enums.RegisterType.Text;
        }    

        if (this.isLarge) {
            vim.Register.SetRoll(item);
        }
        editor.DeleteRange(r);
    }
}