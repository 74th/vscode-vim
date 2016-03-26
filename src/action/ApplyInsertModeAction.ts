import {AbstractInsertAction} from "./AbstractInsertAction";
export class ApplyInsertModeAction extends AbstractInsertAction {
    private motion: IMotion;

    constructor(m?: IMotion) {
        super();
        if (m === undefined) {
            this.motion = null;
        } else {
            this.motion = m;
        }
    }

    public GetActionType(): ActionType {
        return ActionType.Insert;
    }

    public Execute(editor: IEditor, vim: IVimStyle) {
        let p = editor.GetCurrentPosition();
        if (this.motion != null) {
            p = this.motion.CalculateEnd(editor, p);
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