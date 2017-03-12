import * as Utils from "../../Utils";
import { Range } from "../../VimStyle";
import { AbstractTextObjectSelection } from "./AbstractTextObjectSelection";

const INNER = 0;
const OUTER = 1;

/**
 * ci" ci' ci`
 * ca" ca' ca`
 */
export class QuotationSelection extends AbstractTextObjectSelection {

    public Quote: string;
    public InnerOuter: number;

    constructor() {
        super();
    }

    public CalculateRange(editor: IEditor, vim: IVimStyle, start: IPosition): IRange {

        let left = this.SearchLeftQuote(editor, vim, start);
        let right = this.SearchRightQuote(editor, vim, start);
        if (left == null || right == null) {
            return null;
        }

        if (this.InnerOuter === INNER) {
            left.Char++;
        }

        let result = new Range();
        result.start = left;
        result.end = right;
        return result;
    }

    public SearchRightQuote(editor: IEditor, vim: IVimStyle, start: IPosition): IPosition {

        let p = start.Copy();
        let line = editor.ReadLineAtCurrentPosition();
        let lastLine = editor.GetLastLineNum();
        while (true) {

            // read 1 char
            p.Char++;
            if (p.Char >= line.length) {
                p.Line++;
                if (p.Line > lastLine) {
                    return null;
                }
                line = editor.ReadLine(p.Line);
                if (line.length === 0) {
                    // skip blank line
                    continue;
                }
                p.Char = 0;
            }

            let c: string = line[p.Char];

            if (c === this.Quote) {
                break;
            }
        }
        if (this.InnerOuter === OUTER) {
            while (true) {
                // read following space
                p.Char++;
                if (p.Char >= line.length) {
                    p.Char = line.length;
                    break;
                }
                if (Utils.GetCharClass(line.charCodeAt(p.Char)) !== CharGroup.Spaces) {
                    break;
                }
            }
        }
        return p;
    }

    private SearchLeftQuote(editor: IEditor, vim: IVimStyle, start: IPosition): IPosition {
        let p = start.Copy();
        let line = editor.ReadLineAtCurrentPosition();
        let lastLine = editor.GetLastLineNum();
        while (true) {

            // read 1 char
            p.Char--;
            if (p.Char < 0) {
                p.Line--;
                if (p.Line < 0) {
                    return null;
                }
                line = editor.ReadLine(p.Line);
                if (line.length === 0) {
                    // skip blank line
                    continue;
                }
                p.Char = line.length - 1;
            }

            let c: string = line[p.Char];

            if (c === this.Quote) {
                break;
            }
        }

        return p;
    }
}

// ci'
export function AddInnerApostropheSelection(num: number, action: IAction) {
    let m = new QuotationSelection();
    m.Quote = "'";
    m.InnerOuter = INNER;
    m.Count = num > 0 ? num : 1;
    let a = <IRequireMotionAction>action;
    a.Selection = m;
}

// ca'
export function AddOuterApostropheSelection(num: number, action: IAction) {
    let m = new QuotationSelection();
    m.Quote = "'";
    m.InnerOuter = OUTER;
    m.Count = num > 0 ? num : 1;
    let a = <IRequireMotionAction>action;
    a.Selection = m;
}

// ci"
export function AddInnerQuotationSelection(num: number, action: IAction) {
    let m = new QuotationSelection();
    m.Quote = "\"";
    m.InnerOuter = INNER;
    m.Count = num > 0 ? num : 1;
    let a = <IRequireMotionAction>action;
    a.Selection = m;
}

// ca"
export function AddOuterQuotationSelection(num: number, action: IAction) {
    let m = new QuotationSelection();
    m.Quote = "\"";
    m.InnerOuter = OUTER;
    m.Count = num > 0 ? num : 1;
    let a = <IRequireMotionAction>action;
    a.Selection = m;
}

// ci`
export function AddInnerGraveAccentSelection(num: number, action: IAction) {
    let m = new QuotationSelection();
    m.Quote = "`";
    m.InnerOuter = INNER;
    m.Count = num > 0 ? num : 1;
    let a = <IRequireMotionAction>action;
    a.Selection = m;
}

// ca`
export function AddOuterGraveAccentSelection(num: number, action: IAction) {
    let m = new QuotationSelection();
    m.Quote = "`";
    m.InnerOuter = OUTER;
    m.Count = num > 0 ? num : 1;
    let a = <IRequireMotionAction>action;
    a.Selection = m;
}
