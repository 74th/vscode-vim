import { RegisterItem } from "../core/Register";
import { Position, Range } from "../VimStyle";

/**
 * {VisualLine}d {VisualLine} y {VisualLine}c
 */
export class DeleteYankChangeHighlightedLineAction implements IInsertTextAction {

    public isInsert: boolean;
    public isOnlyYanc: boolean;
    private insertText: string;
    private insertModeInfo: any;

    constructor() {
        this.isInsert = false;
        this.isOnlyYanc = false;
    }

    public GetActionType(): ActionType {
        if (this.isOnlyYanc) {
            return ActionType.Other;
        } else if (this.isInsert) {
            return ActionType.Insert;
        }
        return ActionType.Other;
    }

    public SetChangeOption() {
        this.isInsert = true;
    }

    public SetOnlyYancOption() {
        this.isOnlyYanc = true;
    }

    public GetInsertModeInfo(): any {
        return this.insertModeInfo;
    }

    public SetInsertText(text: string) {
        this.insertText = text;
    }

    public Execute(editor: IEditor, vim: IVimStyle) {

        let s = editor.GetCurrentVisualLineModeSelection();
        let n1line: number;
        let n2line: number;
        if (s.startLine < s.endLine) {
            n1line = s.startLine;
            n2line = s.endLine;
        } else {
            n1line = s.endLine;
            n2line = s.startLine;
        }
        let line2 = editor.ReadLine(n2line);
        let n1 = new Position(n1line, 0);
        let n2 = new Position(n2line, line2.length);
        let nrange = new Range();
        nrange.start = n1;
        nrange.end = n2;

        let item = new RegisterItem();
        item.Body = editor.ReadRange(nrange) + "\n";
        item.Type = RegisterType.LineText;
        vim.Register.SetRoll(item);

        if (this.isOnlyYanc) {
            // y
            vim.ApplyNormalMode();
            editor.SetPosition(s.focusPosition);
        } else if (this.isInsert) {
            // c
            vim.ApplyInsertMode();
            editor.DeleteRange(nrange, nrange.start);
        } else {
            // d
            vim.ApplyNormalMode();

            if (n2line === editor.GetLastLineNum()) {
                // delete last line
                if (nrange.start.Line !== 0) {
                    // delete previous line Ln
                    nrange.start.Line -= 1;
                    let prevLine = editor.ReadLine(nrange.start.Line);
                    nrange.start.Char = prevLine.length;
                }
            } else {
                // include next line Ln
                nrange.end.Line += 1;
                nrange.end.Char = 0;
            }
            editor.DeleteRange(nrange, nrange.start);
        }
    }
}

/**
 * {visualLine}d
 */
export function DeleteHighlightedLine(num: number): IAction {
    return new DeleteYankChangeHighlightedLineAction();
}

/**
 * {visualLine}y
 */
export function YankHighlightedLine(num: number): IAction {
    let a = new DeleteYankChangeHighlightedLineAction();
    a.SetOnlyYancOption();
    return a;
}

/**
 * {visualLine}c
 */
export function ChangeHighligtedLine(num: number): IAction {
    let a = new DeleteYankChangeHighlightedLineAction();
    a.SetChangeOption();
    return a;
}
