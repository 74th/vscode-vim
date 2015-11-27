import * as vscode from "vscode"
import {Position} from "./VimStyle";

export class VSCodeEditor implements IEditor {
    
    // Status
    public CloseStatus() {
        vscode.window.setStatusBarMessage("")
    }
    public ShowStatus(text: string) {
        vscode.window.setStatusBarMessage(text);
    }
    
    // Edit
    public InsertTextAtCurrentPosition(text: string) {
        vscode.window.activeTextEditor.edit((editBuilder) => {
            editBuilder.insert(vscode.window.activeTextEditor.selection.active, text);
        });
        if (text.length == 1) {
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
        return vscode.window.activeTextEditor.document.lineCount -1;
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