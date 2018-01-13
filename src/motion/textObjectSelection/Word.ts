import * as Utils from "../../Utils";
import { Position, Range } from "../../VimStyle";
import { AbstractTextObjectSelection } from "./AbstractTextObjectSelection";

const INNER = 0;
const OUTER = 1;

/**
 * ciw ciW
 * caw caW
 */
export class WordSelection extends AbstractTextObjectSelection {

    public IsWORD: boolean;
    public InnerOuter: number;

    constructor() {
        super();
    }

    public CalculateRange(editor: IEditor, vim: IVimStyle, start: IPosition): IRange {

        let count = this.Count;
        if (this.InnerOuter === OUTER) {
            count++;
        }
        const range = new Range();
        const forwardEdgeResult = this.SearchForwardEdge(editor, start, count);
        range.start = this.SearchBackwordEdge(editor, start);

        return range;
    }

    private SearchBackwordEdge(editor: IEditor, start: IPosition): IPosition {
        const line = editor.ReadLine(start.Line);
        const startClass = Utils.GetCharClass(line.charCodeAt(start.Char));
        let char: number;
        for (char = start.Char - 1; char > 0; char--) {
            const charClass = Utils.GetCharClass(line.charCodeAt(char));
            if (startClass === CharGroup.Spaces || !this.IsWORD) {
                if (charClass !== startClass) {
                    break;
                }
            } else {
                // WORD
                if (charClass !== CharGroup.Spaces) {
                    break;
                }
            }
        }
        return new Position(start.Line, char + 1);
    }

    private SearchForwardEdge(editor: IEditor, start: IPosition, count: number): {pos: IPosition, hasSpace: boolean } {
        const pos = start.Copy();
        const line = editor.ReadLine(start.Line);
        const startClass = Utils.GetCharClass(line.charCodeAt(start.Char));
        let char: number;
        for (char = start.Char - 1; char > 0; char--) {
            const charClass = Utils.GetCharClass(line.charCodeAt(char));
            if (startClass === CharGroup.Spaces || !this.IsWORD) {
                if (charClass !== startClass) {
                    break;
                }
            } else {
                // WORD
                if (charClass !== CharGroup.Spaces) {
                    break;
                }
            }
        }
        // countの1つめは、そのスペースor単語を切り取る
        // countの2つめは、

        // aaa aaa a|aa$$ccc ddd
        // daw-> aaa aaa|$$ccc ddd
        // 前方にしかスペースが無い場合、それを切り取る
        // aaa aaa a|aa ccc ddd
        // 後方にスペースが有る場合、それを切り取る

        return { pos, hasSpace: false };
    };

}

// ciw
export function AddInnerWordSelection(num: number, action: IAction) {
    let m = new WordSelection();
    m.InnerOuter = INNER;
    m.Count = num > 0 ? num : 1;
    let a = <IRequireMotionAction>action;
    a.Selection = m;
}

// caw
export function AddOuterApostropheSelection(num: number, action: IAction) {
    let m = new WordSelection();
    m.InnerOuter = OUTER;
    m.Count = num > 0 ? num : 1;
    let a = <IRequireMotionAction>action;
    a.Selection = m;
}
