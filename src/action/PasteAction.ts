import {Position} from "../VimStyle";

export class PutRegisterAction implements IAction {

    private isPrev: boolean;
    private registerKey: Key;
    private count: number;

    constructor() {
        this.isPrev = false;
        this.registerKey = null;
    }

    public GetActionType(): ActionType {
        return ActionType.Edit;
    }

    public SetCount(value: number) {
        this.count = value;
    }

    public SetBackOption() {
        this.isPrev = true;
    }

    public SetRegisterKey(key: Key) {
        this.registerKey = key;
    }

    public Execute(editor: IEditor, vim: IVimStyle) {
        let item: IRegisterItem;
        if (this.registerKey == null) {
            item = vim.Register.GetUnName();
        } else {
            item = vim.Register.Get(this.registerKey);
        }
        if (item == null) {
            return;
        }
        let content = item.Body;
        let cp = editor.GetCurrentPosition();
        if (item.Type === RegisterType.Text) {
            if (this.isPrev) {
                // paste before posision character
                editor.InsertTextAtCurrentPosition(item.Body);
                editor.SetPosition(cp);
                return;
            }
            // paste after position charactor
            let np = new Position();
            np.Char = cp.Char + 1;
            np.Line = cp.Line;
            editor.Insert(np, content);
            editor.SetPosition(np);
            return;
        } else {
            // line Paste
            let np = new Position();
            np.Char = 0;
            if (this.isPrev) {
                // paste at home of current position¥
                np.Line = cp.Line;
            } else {
                // paste at next line
                np.Line = cp.Line + 1;
                if (cp.Line === editor.GetLastLineNum()) {
                    // next line is last
                    content = "\n" + content.substring(0, content.length - 1);
                    let lp = editor.GetLastPosition();
                    editor.Insert(lp, content);
                    editor.SetPosition(np);
                    return;
                }
            }
            editor.Insert(np, content);
            editor.SetPosition(np);
        }
    }
}