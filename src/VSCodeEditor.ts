import * as vscode from "vscode"
import {Position} from "./VimStyle";
import * as Utils from "./Utils";

export class VSCodeEditor implements IEditor {
    private modeStatusBarItem: vscode.StatusBarItem;
    private commandStatusBarItem: vscode.StatusBarItem;

    public constructor(options: IVSCodeEditorOptions) {
        options = options || {
            showMode: false
        };

        this.modeStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
        this.SetModeStatusVisibility(options.showMode);

        this.commandStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
        this.commandStatusBarItem.show();
    }
    
    // Status
    public CloseCommandStatus() {
        this.commandStatusBarItem.text = "";
    }
    public ShowCommandStatus(text: string) {
        this.commandStatusBarItem.text = text;
    }

    public ShowModeStatus(mode: Mode) {
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
        if (0x41 <= charCode && charCode <= 0x5A) { // A-Z
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
        var s = new vscode.Selection(cp, cp);
        vscode.window.activeTextEditor.selection = s;
        vscode.window.activeTextEditor.revealRange(s, vscode.TextEditorRevealType.Default);
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