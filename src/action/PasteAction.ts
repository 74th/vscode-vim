import {IEditor} from "../IEditor";
import {VimStyle, Position} from "../VimStyle";
import * as Enums from "../VimStyleEnums"
import {IAction} from "./IAction"
import {RegisterItem} from "../Register"

export class PasteAction implements IAction {

    private isBack: boolean;
    private registerKey: Enums.Key;
    private count: number;

    constructor() {
        this.isBack = false;
        this.registerKey = null;
    }

    public SetCount(value: number) {
        this.count = value;
    }

    public SetBackOption() {
        this.isBack = true;
    }

    public SetRegisterKey(key: Enums.Key) {
        this.registerKey = key;
    }

    public Execute(editor: IEditor, vim: VimStyle) {
        var item: RegisterItem;
        if (this.registerKey == null) {
            item = vim.Register.GetUnName();
        } else {
            item = vim.Register.Get(this.registerKey);
        }
        if (item == null) {
            return;
        }
        var content = item.Body;
        var cp = editor.GetCurrentPosition();
        if (item.Type == Enums.RegisterType.Text) {
            if (this.isBack) {
                // paste before posision character
                editor.InsertTextAtCurrentPosition(item.Body);
                editor.SetPosition(cp);
                return;
            }
            // paste after position charactor
            var np = new Position();
            np.char = cp.char + 1;
            np.line = cp.line;
            editor.Insert(np, content);
            editor.SetPosition(np);
            return;
        } else {
            // line Paste
            var np = new Position();
            np.char = 0;
            if (this.isBack) {
                // paste at home of current position¥
                np.line = cp.line;
            } else {
                // paste at next line
                np.line = cp.line + 1;
                if (cp.line == editor.GetLastLineNum()) {
                    // next line is last
                    content = "\n" + content.substring(0, content.length - 1);
                    var lp = editor.GetLastPosition();
                    editor.Insert(lp, content);
                    editor.SetPosition(np);
                    return
                }
            }
            editor.Insert(np, content);
            editor.SetPosition(np);
        }
    }
}