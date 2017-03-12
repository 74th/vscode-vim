export abstract class AbstractMotion implements IMotion {

    public Count: number;

    public CalculateEnd(editor: IEditor, vim: IVimStyle, start: IPosition): IPosition {
        throw new Error("UnImplemented");
    }
}
