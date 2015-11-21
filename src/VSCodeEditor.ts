import {IEditor} from "./IEditor"
import {Position, Range} from "./VimStyle"
import * as vscode from "vscode"

export class VSCodeEditor implements IEditor {
	public CloseStatus() {
		vscode.window.setStatusBarMessage("")
	}
	public ShowStatus(text: string) {
		vscode.window.setStatusBarMessage(text);
	}
	public InsertTextAtCurrentPosition(text: string) {
		vscode.window.activeTextEditor.edit((editBuilder) => {
			editBuilder.insert(vscode.window.activeTextEditor.selection.active, text);
		})
		vscode.commands.executeCommand("editor.action.triggerSuggest");
	}
	public GetLine(line: number): string {
		if (vscode.window.activeTextEditor.document.lineCount > line) {
			return vscode.window.activeTextEditor.document.lineAt(line).text;
		}
		return null;
	}
	public GetLineAtCurrentPosition(): string {
		return vscode.window.activeTextEditor.document.lineAt(vscode.window.activeTextEditor.selection.active.line).text;
	}
	public GetCurrentPosition(): Position {
		return tranceVimStylePosition(vscode.window.activeTextEditor.selection.active);
	}
	public SetPosition(p: Position) {
		var cp = tranceVSCodePosition(p);
		var s = new vscode.Selection(cp,cp);
		vscode.window.activeTextEditor.selection = s;
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