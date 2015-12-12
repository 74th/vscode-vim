export class ApplyInsertModeAction implements IAction {
    private motion: IMotion;

    constructor(m?: IMotion) {
        if (m == undefined) {
            this.motion = null;
        } else {
            this.motion = m;
        }
    }

    public Execute(editor: IEditor, vim: IVimStyle) {
        var p = editor.GetCurrentPosition();
        if (this.motion != null) {
            p = this.motion.CalculateEnd(editor, p);
        }
        vim.ApplyInsertMode(p)
    }
}