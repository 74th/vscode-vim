import * as vscode from "vscode"
import {Position} from "./VimStyle";
import * as Utils from "./Utils";

export class VSCodeEditor implements IEditor {
    private modeStatusBarItem: vscode.StatusBarItem;
    private commandStatusBarItem: vscode.StatusBarItem;
    private vimStyle: IVimStyle;

    private selectionSetTime: number;
    private nonCharLinePosition: vscode.Position;

    public constructor(options: IVSCodeEditorOptions) {
        options = options || {
            showMode: false
        };

        this.modeStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
        this.SetModeStatusVisibility(options.showMode);

        this.commandStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
        this.commandStatusBarItem.show();
        this.selectionSetTime = 0;
        this.nonCharLinePosition = null;
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
        // if only alphabet, show suggestion
        var charCode = char.charCodeAt(0);
        var isShowSuggestion = false;
        if (0x41 <= charCode && charCode <= 0x5A) {
            // A-Z
            isShowSuggestion = true;
        } else if (0x61 <= charCode && charCode <= 0x7A) {
            // a-z
            isShowSuggestion = true;
        } else if (0x2E == charCode) {
            // .
            isShowSuggestion = true;
        }
        if (isShowSuggestion) {
            vscode.commands.executeCommand("editor.action.triggerSuggest");
        }
    }
    public Insert(position: IPosition, text: string) {
        vscode.window.activeTextEditor.edit((editBuilder) => {
            editBuilder.insert(tranceVSCodePosition(position), text);
        });
    }
    public DeleteRange(range: IRange) {
        vscode.window.activeTextEditor.edit((editBuilder) => {
            editBuilder.delete(tranceVSCodeRange(range));
        })
    }
    public ReplaceRange(range: IRange, text: string) {
        vscode.window.activeTextEditor.edit((editBuilder) => {
            editBuilder.replace(tranceVSCodeRange(range), text);
        })
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
        return tranceVimStylePosition(vscode.window.activeTextEditor.selection.active);
    }
    public SetPosition(p: IPosition) {
        var cp = tranceVSCodePosition(p);
        this.showNormalMode(cp);
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
            return;
        }
        var p = vscode.window.activeTextEditor.selection.active;
        this.showNormalMode(p);
    }

    public ApplyNormalMode() {
        var p = vscode.window.activeTextEditor.selection.active;
        this.showNormalMode(p);
    }

    private showNormalMode(p: vscode.Position) {
        this.deleteNonCharLine();

        var line = vscode.window.activeTextEditor.document.lineAt(p.line).text;
        var np: vscode.Position;
        if (line.length == 0) {
            // none charactor line
            this.appendNonCharLine(p);
            np = p;
        } else if (p.character == line.length) {
            // end of line
            np = new vscode.Position(p.line, p.character - 1);
        } else {
            np = p;
        }
        var sp = new vscode.Position(np.line, np.character + 1);
        var s = new vscode.Selection(sp, np);
        this.selectionSetTime = new Date().getTime();
        vscode.window.activeTextEditor.selection = s;
    }

    public ApplyInsertMode(p: Position) {
        this.deleteNonCharLine();
        var c = tranceVSCodePosition(p);
        var s = new vscode.Selection(c, c);
        vscode.window.activeTextEditor.selection = s;
        this.selectionSetTime = new Date().getTime();
    }

    private appendNonCharLine(p: vscode.Position) {
        vscode.window.activeTextEditor.edit((editBuilder) => {
            editBuilder.insert(p, " ");
        });
        this.nonCharLinePosition = p;
    }

    private deleteNonCharLine() {
        if (this.nonCharLinePosition == null) {
            return;
        }
        var st = this.nonCharLinePosition;
        var ed = new vscode.Position(st.line, st.character + 1);
        var r = new vscode.Range(st, ed);
        vscode.window.activeTextEditor.edit((editBuilder) => {
            editBuilder.delete(r);
        });
        this.nonCharLinePosition = null;
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