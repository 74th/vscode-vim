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

export class VSCodeEditor implements IEditor {
    private modeStatusBarItem: vscode.StatusBarItem;
    private commandStatusBarItem: vscode.StatusBarItem;
    private vimStyle: IVimStyle;

    private selectionSetTime: number;
    private dummySpacePosition: vscode.Position;

    public constructor(options: IVSCodeEditorOptions) {
        options = options || {
            showMode: false
        };

        this.modeStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
        this.SetModeStatusVisibility(options.showMode);

        this.commandStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
        this.commandStatusBarItem.show();
        this.selectionSetTime = 0;
        this.dummySpacePosition = null;
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

    public SetModeStatusVisibility(visible: boolean) {
        visible ? this.modeStatusBarItem.show() : this.modeStatusBarItem.hide();
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
            var lineEndPos = doc.lineAt(vsRange.end.line).range.end;
            if (this.vimStyle.GetMode() == VimMode.Normal &&
                lineEndPos.isEqual(vsRange.end) &&
                vsRange.start.character == 0 &&
                vsRange.contains(vsPos) &&
                vsRange.start.character == 0) {
                // Conditions that require a dummy
                // * Normal mode
                // * delete to line end
                // * delete from line home
                // * delete range contains next position
                // * delete from home of line
                needDummy = true;
            }

            var cursor: vscode.Selection;
            this.selectionSetTime = Date.now();
            if (needDummy) {
                cursor = new vscode.Selection(vsRange.end, vsRange.start);
                this.dummySpacePosition = vsRange.start;
                vscode.window.activeTextEditor.selection = cursor;
                editBuilder.replace(vsRange, " ");
            } else {
                var endoffset = doc.offsetAt(vsPos);
                var nextPos = doc.positionAt(endoffset + 1);
                if (vsRange.contains(nextPos)) {
                    // if position contained delete range
                    endoffset = doc.offsetAt(vsRange.end);
                    nextPos = doc.positionAt(endoffset + 1);
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
        var isNonCharLine = vscode.window.activeTextEditor.document.lineAt(p.line).text.length == 0;
        var isLastLine = this.GetLastLineNum() == p.line;
        this.showBlockCursor(cp, isNonCharLine, isLastLine);
        vscode.window.activeTextEditor.revealRange(vscode.window.activeTextEditor.selection, vscode.TextEditorRevealType.Default);
    }
    public GetLastPosition(): IPosition {
        var end = vscode.window.activeTextEditor.document.lineAt(vscode.window.activeTextEditor.document.lineCount - 1).range.end;
        return tranceVimStylePosition(end);
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
        if (this.selectionSetTime + 200 >= new Date().getTime()) {
            // resrict event loop
            return;
        }
        if (this.vimStyle.GetMode() == VimMode.Insert) {
            // if insert mode, do nothing
            this.deleteNonCharLine();
            return;
        }
        var p = vscode.window.activeTextEditor.selection.active;
        var isNonCharLine = vscode.window.activeTextEditor.document.lineAt(p.line).text.length == 0;
        var isLastLine = this.GetLastLineNum() == p.line;
        this.showBlockCursor(p, isNonCharLine, isLastLine);
    }

    public ApplyNormalMode(p?: Position, isNonCharLine?: boolean, isLastLine?: boolean) {
        var vp: vscode.Position;
        if (p) {
            vp = tranceVSCodePosition(p);
        } else {
            vp = vscode.window.activeTextEditor.selection.active;
        }
        var needDummySpace = false;
        if (isNonCharLine == undefined) {
            // check line 
            var line = vscode.window.activeTextEditor.document.lineAt(vp.line).text;
            isNonCharLine = line.length == 0;
            isLastLine = this.GetLastLineNum() == vp.line;
            if (!isNonCharLine && vp.character >= line.length) {
                // end of line
                vp = new vscode.Position(vp.line, vp.character - 1);
            }
        }
        this.showBlockCursor(vp, isNonCharLine, isLastLine);
    }

    private showBlockCursor(end: vscode.Position, isNonCharLine?: boolean, isLastLine?: boolean) {
        if (isNonCharLine) {
            vscode.window.activeTextEditor.edit((edit) => {
                edit.insert(end, " ");
            });
        }
        var start = new vscode.Position(end.line, end.character + 1);
        var select = new vscode.Selection(start, end);
        this.selectionSetTime = new Date().getTime();
        vscode.window.activeTextEditor.selection = select;
        this.deleteNonCharLine();
        if (isNonCharLine) {
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

    public UpdateValidPosition(p: IPosition, isBlock?: boolean): IPosition {
        var cp = new Position();
        cp.line = p.line;
        cp.char = p.char;
        if (p.line <= 0) {
            cp.line = 0;
        } else {
            var lastLineNum = this.GetLastLineNum();
            if (lastLineNum < p.line) {
                cp.line = lastLineNum;
            }
        }
        if (cp.char <= 0) {
            cp.char = 0;
        } else {
            var line = this.ReadLine(cp.line);
            if (isBlock) {
                if (cp.char >= line.length) {
                    cp.char = line.length - 1;
                }
            } else {
                if (cp.char > line.length) {
                    cp.char = line.length;
                }
            }
        }
        return cp;
    }

    private appendDummySpace(p: vscode.Position) {
        vscode.window.activeTextEditor.edit((editBuilder) => {
            editBuilder.insert(p, " ");
        });
        this.dummySpacePosition = p;
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
    p.line = org.line;
    p.char = org.character;
    return p;
}
function tranceVSCodePosition(org: IPosition): vscode.Position {
    return new vscode.Position(org.line, org.char);
}
function tranceVSCodeRange(org: IRange): vscode.Range {
    var start = tranceVSCodePosition(org.start);
    var end = tranceVSCodePosition(org.end);
    return new vscode.Range(start, end);
}