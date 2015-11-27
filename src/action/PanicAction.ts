export class PanicAction implements IAction {
    public Execute(editor: IEditor, vim: IVimStyle) {
        editor.CloseStatus()
    }
}