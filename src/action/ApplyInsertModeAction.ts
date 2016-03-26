export class ApplyInsertModeAction implements IInsertAction {
    private motion: IMotion;
    private insertText: string;
    private insertModeInfo: any;

    constructor(m?: IMotion) {
        if (m === undefined) {
            this.motion = null;
        } else {
            this.motion = m;
        }
        this.insertText = null;
    }

    public GetActionType(): ActionType {
        return ActionType.Insert;
    }

    public SetInsertText(text: string) {
        this.insertText = text;
    }

    public GetInsertModeInfo() {
        return this.insertModeInfo;
    }


    public Execute(editor: IEditor, vim: IVimStyle) {
        let p = editor.GetCurrentPosition();
        if (this.motion != null) {
            p = this.motion.CalculateEnd(editor, p);
        }
        if (this.insertText !== null) {
            editor.Insert(p, this.insertText);
            editor.SetPosition(this.calcPositionAfterInsert(p, this.insertText));
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

    private calcPositionAfterInsert(p: IPosition, text: string): IPosition {
        let splitText = text.split("\n");
        let np = p.Copy();
        if (splitText.length > 1) {
            np.Line += splitText.length - 1;
            np.Char = 0;
        }
        np.Char += splitText[splitText.length - 1].length - 1;
        if (np.Char < 0) {
            np.Char = 0;
        }
        return np;
    }
}