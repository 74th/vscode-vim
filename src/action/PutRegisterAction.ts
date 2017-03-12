import { Position } from "../VimStyle";

/**
 * p P
 */
export class PutRegisterAction implements IAction {

    public IsPrev: boolean;
    public RegisterKey: Key;
    public Count: number;

    constructor() {
        this.IsPrev = false;
        this.RegisterKey = null;
    }

    public GetActionType(): ActionType {
        return ActionType.Edit;
    }

    public Execute(editor: IEditor, vim: IVimStyle) {
        let item: IRegisterItem;
        if (this.RegisterKey == null) {
            item = vim.Register.GetUnName();
        } else {
            item = vim.Register.Get(this.RegisterKey);
        }
        if (item == null) {
            return;
        }
        let content = item.Body;
        let cp = editor.GetCurrentPosition();
        if (item.Type === RegisterType.Text) {
            if (this.IsPrev) {
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
            if (this.IsPrev) {
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

/**
 * p
 */
export function PutRegisterAfterCursorPosition(num: number): IAction {
    let a = new PutRegisterAction();
    a.Count = num === 0 ? 1 : num;
    return a;
}

/**
 * P
 */
export function PutRegisterBeforeCursorPosition(num: number): IAction {
    let a = new PutRegisterAction();
    a.IsPrev = true;
    a.Count = num === 0 ? 1 : num;
    return a;
}
