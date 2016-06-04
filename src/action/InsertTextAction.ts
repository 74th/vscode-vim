import {AbstractInsertTextAction} from "./AbstractInsertTextAction";
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
                AfterText: text.substring(p.Char)
            };
        }
    }


}