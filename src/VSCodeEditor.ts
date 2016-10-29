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
    changeCursorStyle: boolean;
    defaultMode: string;
    imapEsc: string;
}

export class VSCodeEditor implements IEditor {
    private modeStatusBarItem: vscode.StatusBarItem;
    private commandStatusBarItem: vscode.StatusBarItem;
    private vimStyle: IVimStyle;

    private visualLineModeStartLine: number;
    private visualLineModeEndLine: number;
    private visualLineModeFocusPosition: IPosition;
    private inNormalModeContext: ContextKey;
    private inInsertModeContext: ContextKey;
    private inVisualModeContext: ContextKey;

    private latestPosition: IPosition;
    private latestPositionTimestamp: number;

    public Options: IVSCodeEditorOptions;

    public constructor(options: IVSCodeEditorOptions) {
        this.modeStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
        this.commandStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
        this.commandStatusBarItem.show();
        this.ApplyOptions(options);

        this.inNormalModeContext = new ContextKey('vim.inNormalMode');
        this.inInsertModeContext = new ContextKey('vim.inInsertMode');
        this.inVisualModeContext = new ContextKey('vim.inVisualMode');
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
            editBuilder.delete(tranceVSCodeRange(range));
            if (this.vimStyle.GetMode() === VimMode.Normal) {
                this.showBlockCursor();
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
        if (vscode.window.activeTextEditor.document.lineCount > line) {
            return vscode.window.activeTextEditor.document.lineAt(line).text;
        }
        return null;
    }
    public ReadLineAtCurrentPosition(): string {
        return vscode.window.activeTextEditor.document.lineAt(vscode.window.activeTextEditor.selection.active.line).text;
    }

    // Read Range
    public ReadRange(range: IRange): string {
        return vscode.window.activeTextEditor.document.getText(tranceVSCodeRange(range));
    }

    // Position
    public GetCurrentPosition(): IPosition {
        if (this.latestPosition) {
            let now = new Date().getTime();
            if (now < this.latestPositionTimestamp + 400) {
                return this.latestPosition;
            }
        }
        return tranceVimStylePosition(vscode.window.activeTextEditor.selection.active);
    }
    public SetPosition(p: IPosition) {
        let cp = tranceVSCodePosition(p);
        vscode.window.activeTextEditor.selection = new vscode.Selection(cp, cp);
        vscode.window.activeTextEditor.revealRange(vscode.window.activeTextEditor.selection, vscode.TextEditorRevealType.Default);
        this.showBlockCursor();
        this.latestPositionTimestamp = new Date().getTime();
        this.latestPosition = p;
    }
    public GetLastPosition(): IPosition {
        let end = vscode.window.activeTextEditor.document.lineAt(vscode.window.activeTextEditor.document.lineCount - 1).range.end;
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
        if (this.vimStyle.GetMode() === VimMode.Insert) {
            // do nothing
            return;
        }
        if (this.vimStyle.GetMode() === VimMode.VisualLine) {
            // do nothing
            return;
        }
        if (vscode.window.activeTextEditor === undefined) {
            // do nothing
            return;
        }
        let s = vscode.window.activeTextEditor.selection;
        if (!s.start.isEqual(s.end)) {
            this.vimStyle.ApplyVisualMode();
            return;
        }
    }

    public ApplyNormalMode(p?: Position) {
        let vp: vscode.Position;
        if (p) {
            vp = tranceVSCodePosition(p);
            vscode.window.activeTextEditor.selection = new vscode.Selection(vp, vp);
        }
        this.showBlockCursor();

        this.inInsertModeContext.set(false);
        this.inNormalModeContext.set(true);
        this.inVisualModeContext.set(false);
    }

    public ApplyInsertMode(p?: Position) {
        if (p) {
            let c = tranceVSCodePosition(p);
            vscode.window.activeTextEditor.selection = new vscode.Selection(c, c);
        }
        this.showLineCursor();

        this.inInsertModeContext.set(true);
        this.inNormalModeContext.set(false);
        this.inVisualModeContext.set(false);
    }

    public ShowVisualMode(range: IRange, focusPosition?: IPosition) {
        let s = new vscode.Selection(tranceVSCodePosition(range.start), tranceVSCodePosition(range.end));
        vscode.window.activeTextEditor.selection = s;
        if (focusPosition !== undefined) {
            let p = tranceVSCodePosition(focusPosition);
            let r = new vscode.Range(p, p);
            vscode.window.activeTextEditor.revealRange(r, vscode.TextEditorRevealType.Default);
        }
        this.showLineCursor();

        this.inInsertModeContext.set(false);
        this.inNormalModeContext.set(false);
        this.inVisualModeContext.set(true);
    }

    public GetCurrentVisualModeSelection(): IRange {
        return tranceVimStyleRange(vscode.window.activeTextEditor.selection);
    }

    public ShowVisualLineMode(startLine: number, endLine: number, focusPosition: IPosition) {

        this.visualLineModeStartLine = startLine;
        this.visualLineModeEndLine = endLine;
        this.visualLineModeFocusPosition = focusPosition;

        let start: vscode.Position, end: vscode.Position;
        let line: string;
        if (startLine <= endLine) {
            start = new vscode.Position(startLine, 0);
            line = vscode.window.activeTextEditor.document.lineAt(endLine).text;
            end = new vscode.Position(endLine, line.length);
        } else if (endLine < startLine) {
            line = vscode.window.activeTextEditor.document.lineAt(startLine).text;
            start = new vscode.Position(startLine, line.length);
            end = new vscode.Position(endLine, 0);
        }
        let v = new vscode.Selection(start, end);
        vscode.window.activeTextEditor.selection = v;

        let fc = tranceVSCodePosition(focusPosition);
        let rc = new vscode.Range(fc, fc);
        vscode.window.activeTextEditor.revealRange(rc);

        this.showBlockCursor();

        this.inInsertModeContext.set(false);
        this.inNormalModeContext.set(false);
        this.inVisualModeContext.set(true);
    }
    public GetCurrentVisualLineModeSelection(): IVisualLineModeSelectionInfo {
        return {
            startLine: this.visualLineModeStartLine,
            endLine: this.visualLineModeEndLine,
            focusPosition: this.visualLineModeFocusPosition
        };
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
                if (line.length === 0) {
                    cp.Char = 0;
                } else if (cp.Char >= line.length) {
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

    public GetTabSize(): number {
        let n = vscode.window.activeTextEditor.options.tabSize;
        let ntype = typeof n;
        if (ntype === "number") {
            return n as number;
        } else if (ntype === "string") {
            let ns = parseInt(n as string, 10);
            if (ns !== NaN) {
                return ns;
            }
        }
        return 4;
    }

    private showLineCursor() {
        if (this.Options.changeCursorStyle) {
            let opt = vscode.window.activeTextEditor.options;
            opt.cursorStyle = vscode.TextEditorCursorStyle.Line;
            vscode.window.activeTextEditor.options = opt;
        }
    }

    private showBlockCursor() {
        if (this.Options.changeCursorStyle) {
            let opt = vscode.window.activeTextEditor.options;
            opt.cursorStyle = vscode.TextEditorCursorStyle.Block;
            vscode.window.activeTextEditor.options = opt;
        }
    }

    public CallEditorCommand(argument: string) {
        vscode.commands.executeCommand(argument, null);
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

class ContextKey {
    private _name: string;
    private _lastValue: boolean;

    constructor(name: string) {
        this._name = name;
    }

    public set(value: boolean): void {
        if (this._lastValue === value) {
            return;
        }
        this._lastValue = value;
        vscode.commands.executeCommand('setContext', this._name, this._lastValue);
    }
}