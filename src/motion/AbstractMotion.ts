export abstract class AbstractMotion implements IMotion {

    public Count: number;

    public CalculateEnd(editor: IEditor, start: IPosition): IPosition {
        throw new Error("UnImplemented");
    }
}