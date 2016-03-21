export class ApplyInsertModeAction implements IAction {
    private motion: IMotion;
    private insertText: string;

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

    public Execute(editor: IEditor, vim: IVimStyle) {
        let p = editor.GetCurrentPosition();
        if (this.motion != null) {
            p = this.motion.CalculateEnd(editor, p);
        }
        if (this.insertText !== null) {
            editor.Insert(p, this.insertText);
        } else {
            vim.ApplyInsertMode(p);
        }
    }
}