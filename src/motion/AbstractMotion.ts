export class AbstractMotion implements IMotion {

    private count: number;

    public GetCount(): number {
        return this.count;
    }

    public SetCount(count: number) {
        this.count = count;
    }

    public CalculateEnd(editor: IEditor, start: IPosition): IPosition {
        throw new Error("UnImplemented");
    }
}