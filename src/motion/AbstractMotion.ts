export abstract class AbstractMotion implements IMotion {

    private count: number;

    public GetCount(): number {
        return this.count;
    }

    public SetCount(count: number) {
        this.count = count;
    }
    
    public abstract CalculateSelectionRange(editor: IEditor, start: IPosition): IRange;

    public abstract CalculateEnd(editor: IEditor, start: IPosition): IPosition;
}