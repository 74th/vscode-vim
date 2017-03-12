import * as FirstCharacterMotion from "../motion/FirstCharacterMotion";
import * as LastCharacterInLineMotion from "../motion/LastCharacterInLineMotion";
import * as RightMotion from "../motion/RightMotion";
import { AbstractInsertTextAction } from "./AbstractInsertTextAction";

/**
 * a A i I
 */
export class InsertTextAction extends AbstractInsertTextAction {
    public Motion: IMotion;

    constructor(m?: IMotion) {
        super();
        if (m === undefined) {
            this.Motion = null;
        } else {
            this.Motion = m;
        }
    }

    public GetActionType(): ActionType {
        return ActionType.Insert;
    }

    public Execute(editor: IEditor, vim: IVimStyle) {
        let p = editor.GetCurrentPosition();
        if (this.Motion != null) {
            p = this.Motion.CalculateEnd(editor, vim, p);
        }
        if (this.insertText !== null) {
            editor.Insert(p, this.insertText);
            editor.SetPosition(this.calcPositionAfterInsert(p));
        } else {
            vim.ApplyInsertMode(p);
            let text = editor.ReadLineAtCurrentPosition();
            this.insertModeInfo = {
                DocumentLineCount: editor.GetLastLineNum() + 1,
                Position: p.Copy(),
                BeforeText: text.substring(0, p.Char),
                AfterText: text.substring(p.Char),
            };
        }
    }

}

/**
 * a
 */
export function AppendTextAfterCursor(num: number): IAction {
    let m = new RightMotion.RightMotion();
    m.Count = 1;
    return new InsertTextAction(m);
}

/**
 * A
 */
export function AppendTextAtEndOfLine(num: number): IAction {
    let m = new LastCharacterInLineMotion.LastCharacterInLineMotion();
    return new InsertTextAction(m);
}

/**
 * i
 */
export function InsertTextBeforeCursor(num: number): IAction {
    return new InsertTextAction();
}

/**
 * I
 */
export function InsertTextBeforeFirstNonBlankInLine(num: number): IAction {
    let m = new FirstCharacterMotion.FirstCharacterMotion();
    m.Target = FirstCharacterMotion.Target.Current;
    return new InsertTextAction(m);
}
