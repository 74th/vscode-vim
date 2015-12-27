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
    showMode: boolean,
    isWinJisKeyboard: boolean,
    isMacJisKeyboard: boolean
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
            var doc = vscode.window.activeTextEditor.document;

            var vsPos: vscode.Position;
            if (position) {
                vsPos = tranceVSCodePosition(position);
            } else {
                vsPos = tranceVSCodePosition(range.start);
            }
            var vsRange = tranceVSCodeRange(range);

            var needDummy = false;
            var endCursor = false;
            var documentEndPos = doc.lineAt(doc.lineCount - 1).range.end;
            var isInsertMode = this.vimStyle.GetMode() != VimMode.Normal;
            if (!isInsertMode &&
                vsRange.contains(vsPos) &&
                documentEndPos.isEqual(vsRange.end) &&
                vsRange.start.character == 0) {
                if (vsRange.start.line == 0) {
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
            var cursor: vscode.Selection;
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
                var nextPos = selectNeiborPosition(doc, vsPos, false);
                cursor = new vscode.Selection(nextPos, vsPos);
                vscode.window.activeTextEditor.selection = cursor;
                editBuilder.delete(vsRange);
            } else {
                var nextPos = selectNeiborPosition(doc, vsPos, true);
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
        if (this.dummySpacePosition != null && line == this.dummySpacePosition.line) {
            return "";
        }
        if (vscode.window.activeTextEditor.document.lineCount > line) {
            return vscode.window.activeTextEditor.document.lineAt(line).text;
        }
        return null;
    }
    public ReadLineAtCurrentPosition(): string {
        var p = vscode.window.activeTextEditor.selection.active;
        if (this.dummySpacePosition != null && p.line == this.dummySpacePosition.line) {
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
        var cp = tranceVSCodePosition(p);
        this.showBlockCursor(cp);
        vscode.window.activeTextEditor.revealRange(vscode.window.activeTextEditor.selection, vscode.TextEditorRevealType.Default);
    }
    public GetLastPosition(): IPosition {
        var end = vscode.window.activeTextEditor.document.lineAt(vscode.window.activeTextEditor.document.lineCount - 1).range.end;
        return tranceVimStylePosition(end);
    }
    
    // Selection
    public GetCurrentSelection(): IRange {
        return tranceVimStyleRange(vscode.window.activeTextEditor.selection);
    }
    public SetSelection(range: IRange) {
        var s = new vscode.Selection(tranceVSCodePosition(range.start), tranceVSCodePosition(range.end));
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
        if (this.vimStyle.GetMode() != VimMode.Normal) {
            // if insert mode, do nothing
            this.deleteNonCharLine();
            return;
        }
        if (vscode.window.activeTextEditor == undefined) {
            // do nothing
            return;
        }
        var s = vscode.window.activeTextEditor.selection;
        var p = vscode.window.activeTextEditor.selection.active;
        if (!s.start.isEqual(s.end)) {
            this.vimStyle.ApplyVisualMode();
            return;
        }
        if (p.character != 0 &&
            p.isEqual(vscode.window.activeTextEditor.document.lineAt(p.line).range.end)) {
            // if end of line, move prev position
            p = p.translate(0, -1);
        }
        this.showBlockCursor(p);
    }

    public ApplyNormalMode(p?: Position) {
        var vp: vscode.Position;
        if (p) {
            vp = tranceVSCodePosition(p);
        } else {
            vp = vscode.window.activeTextEditor.selection.active;
        }
        this.showBlockCursor(vp);
    }

    private showBlockCursor(end: vscode.Position, isEmptyLastLine?: boolean, isEmptyDocument?: boolean) {
        var doc = vscode.window.activeTextEditor.document;
        var start: vscode.Position;
        if (isEmptyDocument == undefined) {
            isEmptyDocument = (
                doc.lineCount == 1 &&
                doc.lineAt(end.line).range.end.character == 0
            );
        }
        if (isEmptyLastLine == undefined) {
            isEmptyLastLine = (
                doc.lineCount - 1 == end.line &&
                doc.lineAt(end.line).range.end.character == 0
            );
        }
        if (isEmptyDocument) {
            start = end.translate(0, 1);
            vscode.window.activeTextEditor.edit((editBuilder) => {
                editBuilder.insert(end, " ");
            });
        } else if (isEmptyLastLine) {
            start = selectNeiborPosition(doc, end, false);
        } else {
            start = selectNeiborPosition(doc, end, true);
        }
        var select = new vscode.Selection(start, end);
        this.selectionSetTime = new Date().getTime();
        vscode.window.activeTextEditor.selection = select;
        if (isEmptyDocument) {
            this.dummySpacePosition = end;
        }
    }

    public ApplyInsertMode(p?: Position) {
        this.deleteNonCharLine();
        var c: vscode.Position;
        if (p == undefined) {
            c = vscode.window.activeTextEditor.selection.active;
        } else {
            c = tranceVSCodePosition(p);
        }
        var s = new vscode.Selection(c, c);
        vscode.window.activeTextEditor.selection = s;
        this.selectionSetTime = new Date().getTime();
    }

    public ApplyVisualMode() {
    }

    public UpdateValidPosition(p: IPosition, isBlock?: boolean): IPosition {
        var cp = new Position();
        cp.Line = p.Line;
        cp.Char = p.Char;
        if (p.Line <= 0) {
            cp.Line = 0;
        } else {
            var lastLineNum = this.GetLastLineNum();
            if (lastLineNum < p.Line) {
                cp.Line = lastLineNum;
            }
        }
        if (cp.Char <= 0) {
            cp.Char = 0;
        } else {
            var line = this.ReadLine(cp.Line);
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
        var st = this.dummySpacePosition;
        var ed = new vscode.Position(st.line, st.character + 1);
        var r = new vscode.Range(st, ed);
        vscode.window.activeTextEditor.edit((editBuilder) => {
            editBuilder.delete(r);
        });
        this.dummySpacePosition = null;
    }
}

function tranceVimStylePosition(org: vscode.Position): IPosition {
    var p = new Position();
    p.Line = org.line;
    p.Char = org.character;
    return p;
}
function tranceVimStyleRange(org: vscode.Range): IRange {
    var r = new Range();
    r.start = tranceVimStylePosition(org.start);
    r.end = tranceVimStylePosition(org.end);
    return r;
}
function tranceVSCodePosition(org: IPosition): vscode.Position {
    return new vscode.Position(org.Line, org.Char);
}
function tranceVSCodeRange(org: IRange): vscode.Range {
    var start = tranceVSCodePosition(org.start);
    var end = tranceVSCodePosition(org.end);
    return new vscode.Range(start, end);
}
function selectNeiborPosition(doc: vscode.TextDocument, p: vscode.Position, toRight: boolean): vscode.Position {
    var np: vscode.Position;
    var offset = doc.offsetAt(p);
    var v = toRight ? 1 : -1;
    for (var i = 1; i < 4; i++) {
        np = doc.positionAt(offset + i * v);
        if (np.line != p.line || np.character != p.character) {
            return np;
        }
    }
}