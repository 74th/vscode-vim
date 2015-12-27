export class ExpandSelectionAction implements IAction {

    private motion: IMotion;

    constructor() {
        this.motion = null;
    }

    public SetMotion(motion: IMotion) {
        this.motion = motion;
    }

    public Execute(editor: IEditor, vim: IVimStyle) {
        // TODO
        var p = editor.GetCurrentPosition();
        var before = editor.GetCurrentSelection();
    }
}