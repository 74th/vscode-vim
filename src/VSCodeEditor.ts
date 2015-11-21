import {IEditor} from "./IEditor"
import {Position, Range} from "./VimStyle"
import * as vscode from "vscode"

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
        })
        vscode.commands.executeCommand("editor.action.triggerSuggest");
    }
    public DeleteRange(range: Range) {
        vscode.window.activeTextEditor.edit((editBuilder) => {
            editBuilder.delete(tranceVSCodeRange(range));
        })
    }
    public ReplaceRange(range: Range, text: string) {
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
    public ReadRange(range: Range):string {
        return vscode.window.activeTextEditor.document.getText(tranceVSCodeRange(range));
    }
    
    // Position
    public GetCurrentPosition(): Position {
        return tranceVimStylePosition(vscode.window.activeTextEditor.selection.active);
    }
    public SetPosition(p: Position) {
        var cp = tranceVSCodePosition(p);
        var s = new vscode.Selection(cp, cp);
        vscode.window.activeTextEditor.selection = s;
    }
    
    // Document Info
    public GetLineCount(): number {
        return vscode.window.activeTextEditor.document.lineCount;
    }

}

function tranceVimStylePosition(org: vscode.Position): Position {
    var p = new Position();
    p.line = org.line;
    p.char = org.character;
    return p;
}
function tranceVSCodePosition(org: Position): vscode.Position {
    return new vscode.Position(org.line, org.char);
}
function tranceVSCodeRange(org: Range): vscode.Range {
    var start = tranceVSCodePosition(org.start);
    var end = tranceVSCodePosition(org.end);
    return new vscode.Range(start, end);
}