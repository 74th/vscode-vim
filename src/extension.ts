import * as vscode from 'vscode';
import * as likevi from "./likevi";

export function activate(context: vscode.ExtensionContext) {

	var driver = new Driver();
	var main = new likevi.Likevi(driver);
	var v = vscode;

	var disposable = vscode.commands.registerCommand('likevi.j', () => {
		main.pushKey(likevi.Key.j);
	});
	var disposable = vscode.commands.registerCommand('likevi.k', () => {
		main.pushKey(likevi.Key.k);
	});
	var disposable = vscode.commands.registerCommand('likevi.i', () => {
		main.pushKey(likevi.Key.i);
	});
	var disposable = vscode.commands.registerCommand('likevi.esc', () => {
		main.pushKey(likevi.Key.esc);
	});
	context.subscriptions.push(disposable);
}

export class Driver {
	public getInsertTextCurrentPosition(text:string) {
		vscode.window.activeTextEditor.edit((editBuilder) => {
			var p = vscode.window.activeTextEditor.selection.active;
			editBuilder.insert(p,text);
		})
	}
}