/**
 * i I a A cw...
 */
export abstract class AbstractInsertTextAction implements IInsertTextAction {

    protected insertText: string;
    protected insertModeInfo: any;

    constructor() {
        this.insertModeInfo = null;
        this.insertText = null;
    }

    public abstract GetActionType(): ActionType;

    public abstract Execute(editor: IEditor, vim: IVimStyle): any;

    public GetInsertModeInfo(): any {
        return this.insertModeInfo;
    }
    public SetInsertText(text: string) {
        this.insertText = text;
    }

    protected calcPositionAfterInsert(p: IPosition): IPosition {
        let splitText = this.insertText.split("\n");
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
