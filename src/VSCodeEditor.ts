import * as vscode from "vscode";
import {Position, Range} from "./VimStyle";
import * as Utils from "./Utils";

enum EditorActionType {
    Insert,
    Replace,
    Delete,
    SetPosition
}
class EditorAction {
    public Type: EditorActionType;
    public Position: IPosition;
    public Range: IRange;
    public Text: string;
}

export interface IVSCodeEditorOptions {
    showMode: boolean;
    isWinJisKeyboard: boolean;
    isMacJisKeyboard: boolean;
}

export class VSCodeEditor implements IEditor {
    private modeStatusBarItem: vscode.StatusBarItem;
    private commandStatusBarItem: vscode.StatusBarItem;
    private vimStyle: IVimStyle;

    private selectionSetTime: number;
    private dummySpacePosition: vscode.Position;
    public Options: IVSCodeEditorOptions;

    public constructor(options: IVSCodeEditorOptions) {
        this.modeStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
        this.commandStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
        this.selectionSetTime = 0;
        this.dummySpacePosition = null;
        this.commandStatusBarItem.show();
        this.ApplyOptions(options);
    }

    public SetVimStyle(vim: IVimStyle) {
        this.vimStyle = vim;
    }

    // Status
    public CloseCommandStatus() {
        this.commandStatusBarItem.text = "";
    }
    public ShowCommandStatus(text: string) {
        this.commandStatusBarItem.text = text;
    }

    public ShowModeStatus(mode: VimMode) {
        this.modeStatusBarItem.text = Utils.ModeToString(mode);
    }

    public ApplyOptions(option: IVSCodeEditorOptions) {
        this.Options = option;
        this.Options.showMode ? this.modeStatusBarItem.show() : this.modeStatusBarItem.hide();
    }

    // Edit
    public InsertTextAtCurrentPosition(text: string) {
        vscode.window.activeTextEditor.edit((editBuilder) => {
            editBuilder.insert(vscode.window.activeTextEditor.selection.active, text);
        });
    }
    public InsertCharactorAtCurrentPosition(char: string) {
        vscode.window.activeTextEditor.edit((editBuilder) => {
            editBuilder.insert(vscode.window.activeTextEditor.selection.active, char);
        });
    }
    public Insert(position: IPosition, text: string) {
        vscode.window.activeTextEditor.edit((editBuilder) => {
            editBuilder.insert(tranceVSCodePosition(position), text);
        });
    }
    public DeleteRange(range: IRange, position?: IPosition) {
        vscode.window.activeTextEditor.edit((editBuilder) => {
            let doc = vscode.window.activeTextEditor.document;

            let vsPos: vscode.Position;
            if (position) {
                vsPos = tranceVSCodePosition(position);
            } else {
                vsPos = tranceVSCodePosition(range.start);
            }
            let vsRange = tranceVSCodeRange(range);

            let needDummy = false;
            let endCursor = false;
            let documentEndPos = doc.lineAt(doc.lineCount - 1).range.end;
            let isInsertMode = this.vimStyle.GetMode() !== VimMode.Normal;
            if (!isInsertMode &&
                vsRange.contains(vsPos) &&
                documentEndPos.isEqual(vsRange.end) &&
                vsRange.start.character === 0) {
                if (vsRange.start.line === 0) {
                    // Conditions that require a dummy
                    // * Normal mode
                    // * delete from document home
                    // * delete to document end
                    needDummy = true;
                } else {
                    // Conditions that tansrated cursor
                    // * normal mode
                    // * delete to document end
                    // * delete from line home
                    endCursor = true;
                }
            }
            let cursor: vscode.Selection;
            if (isInsertMode) {
                cursor = new vscode.Selection(vsPos, vsPos);
                vscode.window.activeTextEditor.selection = cursor;
                editBuilder.delete(vsRange);
                return;
            }
            this.selectionSetTime = Date.now();
            if (needDummy) {
                cursor = new vscode.Selection(vsRange.end, vsRange.start);
                this.dummySpacePosition = vsRange.start;
                vscode.window.activeTextEditor.selection = cursor;
                editBuilder.replace(vsRange, " ");
            } else if (endCursor) {
                let nextPos = selectNeiborPosition(doc, vsPos, false);
                cursor = new vscode.Selection(nextPos, vsPos);
                vscode.window.activeTextEditor.selection = cursor;
                editBuilder.delete(vsRange);
            } else {
                let nextPos = selectNeiborPosition(doc, vsPos, true);
                if (vsRange.contains(nextPos) && !nextPos.isEqual(vsRange.start)) {
                    // if position contained delete range
                    nextPos = selectNeiborPosition(doc, vsRange.end, true);
                }
                cursor = new vscode.Selection(nextPos, vsPos);
                vscode.window.activeTextEditor.selection = cursor;
                editBuilder.delete(vsRange);
            }
        });
    }
    public ReplaceRange(range: IRange, text: string) {
        vscode.window.activeTextEditor.edit((editBuilder) => {
            editBuilder.replace(tranceVSCodeRange(range), text);
        });
    }

    // Read Line
    public ReadLine(line: number): string {
        if (this.dummySpacePosition != null && line === this.dummySpacePosition.line) {
            return "";
        }
        if (vscode.window.activeTextEditor.document.lineCount > line) {
            return vscode.window.activeTextEditor.document.lineAt(line).text;
        }
        return null;
    }
    public ReadLineAtCurrentPosition(): string {
        let p = vscode.window.activeTextEditor.selection.active;
        if (this.dummySpacePosition != null && p.line === this.dummySpacePosition.line) {
            return "";
        }
        return vscode.window.activeTextEditor.document.lineAt(vscode.window.activeTextEditor.selection.active.line).text;
    }

    // Read Range
    public ReadRange(range: IRange): string {
        return vscode.window.activeTextEditor.document.getText(tranceVSCodeRange(range));
    }

    // Position
    public GetCurrentPosition(): IPosition {
        return tranceVimStylePosition(vscode.window.activeTextEditor.selection.active);
    }
    public SetPosition(p: IPosition) {
        let cp = tranceVSCodePosition(p);
        this.showBlockCursor(cp);
        vscode.window.activeTextEditor.revealRange(vscode.window.activeTextEditor.selection, vscode.TextEditorRevealType.Default);
    }
    public GetLastPosition(): IPosition {
        let end = vscode.window.activeTextEditor.document.lineAt(vscode.window.activeTextEditor.document.lineCount - 1).range.end;
        return tranceVimStylePosition(end);
    }

    // Selection
    public GetCurrentSelection(): IRange {
        return tranceVimStyleRange(vscode.window.activeTextEditor.selection);
    }
    public SetSelection(range: IRange) {
        let s = new vscode.Selection(tranceVSCodePosition(range.start), tranceVSCodePosition(range.end));
        vscode.window.activeTextEditor.selection = s;
    }

    // Document Info
    public GetLastLineNum(): number {
        return vscode.window.activeTextEditor.document.lineCount - 1;
    }

    public dispose() {
        this.modeStatusBarItem.dispose();
        this.commandStatusBarItem.dispose();
    }

    // changed focused editor or changed position by user
    public ChangePositionByUser() {
        if (this.selectionSetTime + 200 >= Date.now()) {
            // resrict event loop
            return;
        }
        if (this.vimStyle.GetMode() !== VimMode.Normal) {
            // if insert mode, do nothing
            this.deleteNonCharLine();
            return;
        }
        if (vscode.window.activeTextEditor === undefined) {
            // do nothing
            return;
        }
        let s = vscode.window.activeTextEditor.selection;
        let p = vscode.window.activeTextEditor.selection.active;
        if (!s.start.isEqual(s.end)) {
            this.vimStyle.ApplyVisualMode();
            return;
        }
        if (p.character !== 0 &&
            p.isEqual(vscode.window.activeTextEditor.document.lineAt(p.line).range.end)) {
            // if end of line, move prev position
            p = p.translate(0, -1);
        }
        this.showBlockCursor(p);
    }

    public ApplyNormalMode(p?: Position) {
        let vp: vscode.Position;
        if (p) {
            vp = tranceVSCodePosition(p);
        } else {
            vp = vscode.window.activeTextEditor.selection.active;
        }
        this.showBlockCursor(vp);
    }

    private showBlockCursor(p: vscode.Position) {
        let select = new vscode.Selection(p, p);
        vscode.window.activeTextEditor.options = {
            cursorStyle: vscode.TextEditorCursorStyle.Block
        };
        vscode.window.activeTextEditor.selection = select;
        this.selectionSetTime = new Date().getTime();
    }

    public ApplyInsertMode(p?: Position) {
        vscode.window.activeTextEditor.options = {
            cursorStyle: vscode.TextEditorCursorStyle.Line
        };
        let c: vscode.Position;
        if (p === undefined) {
            c = vscode.window.activeTextEditor.selection.active;
        } else {
            c = tranceVSCodePosition(p);
        }
        let s = new vscode.Selection(c, c);
        vscode.window.activeTextEditor.selection = s;
        this.selectionSetTime = new Date().getTime();
    }

    public ApplyVisualMode() {
        // TODO?
    }

    public UpdateValidPosition(p: IPosition, isBlock?: boolean): IPosition {
        let cp = new Position();
        cp.Line = p.Line;
        cp.Char = p.Char;
        if (p.Line <= 0) {
            cp.Line = 0;
        } else {
            let lastLineNum = this.GetLastLineNum();
            if (lastLineNum < p.Line) {
                cp.Line = lastLineNum;
            }
        }
        if (cp.Char <= 0) {
            cp.Char = 0;
        } else {
            let line = this.ReadLine(cp.Line);
            if (isBlock) {
                if (cp.Char >= line.length) {
                    cp.Char = line.length - 1;
                }
            } else {
                if (cp.Char > line.length) {
                    cp.Char = line.length;
                }
            }
        }
        return cp;
    }

    private deleteNonCharLine() {
        if (this.dummySpacePosition == null) {
            return;
        }
        let st = this.dummySpacePosition;
        let ed = new vscode.Position(st.line, st.character + 1);
        let r = new vscode.Range(st, ed);
        vscode.window.activeTextEditor.edit((editBuilder) => {
            editBuilder.delete(r);
        });
        this.dummySpacePosition = null;
    }
}

function tranceVimStylePosition(org: vscode.Position): IPosition {
    let p = new Position();
    p.Line = org.line;
    p.Char = org.character;
    return p;
}
function tranceVimStyleRange(org: vscode.Range): IRange {
    let r = new Range();
    r.start = tranceVimStylePosition(org.start);
    r.end = tranceVimStylePosition(org.end);
    return r;
}
function tranceVSCodePosition(org: IPosition): vscode.Position {
    return new vscode.Position(org.Line, org.Char);
}
function tranceVSCodeRange(org: IRange): vscode.Range {
    let start = tranceVSCodePosition(org.start);
    let end = tranceVSCodePosition(org.end);
    return new vscode.Range(start, end);
}
function selectNeiborPosition(doc: vscode.TextDocument, p: vscode.Position, toRight: boolean): vscode.Position {
    let np: vscode.Position;
    let offset = doc.offsetAt(p);
    let v = toRight ? 1 : -1;
    for (let i = 1; i < 4; i++) {
        np = doc.positionAt(offset + i * v);
        if (np.line !== p.line || np.character !== p.character) {
            return np;
        }
    }
    return new vscode.Position(p.line, p.character + 1);
}