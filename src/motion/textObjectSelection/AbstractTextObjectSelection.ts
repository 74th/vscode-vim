export abstract class AbstractTextObjectSelection implements ISelectionMotion {

    public Count: number;

    public CalculateRange(editor: IEditor, vim: IVimStyle, start: IPosition): IRange {
        throw new Error("UnImplemented");
    }
}
