import * as Utils from "../../Utils";
import { Range } from "../../VimStyle";
import { AbstractTextObjectSelection } from "./AbstractTextObjectSelection";

const INNER = 0;
const OUTER = 1;

/**
 * ci[ ci( ci{ ci<
 * ca[ ca( ca{ ca<
 */
export class BrancketSelection extends AbstractTextObjectSelection {

    public LeftBrancket: string;
    public RightBrancket: string;
    public InnerOuter: number;

    constructor() {
        super();
    }

    public CalculateRange(editor: IEditor, vim: IVimStyle, start: IPosition): IRange {

        let left = this.SearchLeftBrancket(editor, vim, start);
        let right = this.SearchRightBrancket(editor, vim, start);
        if (left == null || right == null) {
            return null;
        }

        if (this.InnerOuter === INNER) {
            left.Char++;
        } else {
            right.Char++;
        }

        let result = new Range();
        result.start = left;
        result.end = right;
        return result;
    }

    public SearchRightBrancket(editor: IEditor, vim: IVimStyle, start: IPosition): IPosition {

        let p = start.Copy();
        let line = editor.ReadLineAtCurrentPosition();
        let lastLine = editor.GetLastLineNum();
        let count = this.Count;
        while (count > 0) {

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

            if (c === this.LeftBrancket) {
                count++;
            }
            if (c === this.RightBrancket) {
                count--;
            }

            if (count === 0) {
                break;
            }

        }
        return p;
    }

    private SearchLeftBrancket(editor: IEditor, vim: IVimStyle, start: IPosition): IPosition {
        let p = start.Copy();
        let line = editor.ReadLineAtCurrentPosition();
        let lastLine = editor.GetLastLineNum();
        let count = this.Count;
        while (this.Count > 0) {

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

            if (c === this.LeftBrancket) {
                count--;
            }
            if (c === this.RightBrancket) {
                count++;
            }

            if (count === 0) {
                break;
            }
        }

        return p;
    }

}

// ci( ci)
export function AddInnerUnclosedParenthesisSelection(num: number, action: IAction) {
    let m = new BrancketSelection();
    m.LeftBrancket = "(";
    m.RightBrancket = ")";
    m.InnerOuter = INNER;
    m.Count = num > 0 ? num : 1;
    let a = <IRequireMotionAction>action;
    a.Selection = m;
}

// ca( ca)
export function AddOuterUnclosedParenthesisSelection(num: number, action: IAction) {
    let m = new BrancketSelection();
    m.LeftBrancket = "(";
    m.RightBrancket = ")";
    m.InnerOuter = OUTER;
    m.Count = num > 0 ? num : 1;
    let a = <IRequireMotionAction>action;
    a.Selection = m;
}

// ci< ci>
export function AddInnerLessThanSignSelection(num: number, action: IAction) {
    let m = new BrancketSelection();
    m.LeftBrancket = "<";
    m.RightBrancket = ">";
    m.InnerOuter = INNER;
    m.Count = num > 0 ? num : 1;
    let a = <IRequireMotionAction>action;
    a.Selection = m;
}

// ca< ca>
export function AddOuterLessThanSignSelection(num: number, action: IAction) {
    let m = new BrancketSelection();
    m.LeftBrancket = "<";
    m.RightBrancket = ">";
    m.InnerOuter = OUTER;
    m.Count = num > 0 ? num : 1;
    let a = <IRequireMotionAction>action;
    a.Selection = m;
}

// ci[ ci]
export function AddInnerSquareBlancketSelection(num: number, action: IAction) {
    let m = new BrancketSelection();
    m.LeftBrancket = "[";
    m.RightBrancket = "]";
    m.InnerOuter = INNER;
    m.Count = num > 0 ? num : 1;
    let a = <IRequireMotionAction>action;
    a.Selection = m;
}

// ca[ ca]
export function AddOuterSquareBlancketSelection(num: number, action: IAction) {
    let m = new BrancketSelection();
    m.LeftBrancket = "[";
    m.RightBrancket = "]";
    m.InnerOuter = OUTER;
    m.Count = num > 0 ? num : 1;
    let a = <IRequireMotionAction>action;
    a.Selection = m;
}

// ci{ ci}
export function AddInnerCurlyBrancketSelection(num: number, action: IAction) {
    let m = new BrancketSelection();
    m.LeftBrancket = "{";
    m.RightBrancket = "}";
    m.InnerOuter = INNER;
    m.Count = num > 0 ? num : 1;
    let a = <IRequireMotionAction>action;
    a.Selection = m;
}

// ca{ ca}
export function AddOuterCurlyBrancketSelection(num: number, action: IAction) {
    let m = new BrancketSelection();
    m.LeftBrancket = "{";
    m.RightBrancket = "}";
    m.InnerOuter = OUTER;
    m.Count = num > 0 ? num : 1;
    let a = <IRequireMotionAction>action;
    a.Selection = m;
}
