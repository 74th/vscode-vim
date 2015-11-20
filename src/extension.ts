import * as vscode from 'vscode';
import * as vim from "./vim";

export function activate(context: vscode.ExtensionContext) {

	var driver = new Driver();
	var main = new vim.Vim(driver);
	var v = vscode;
	var disposable = vscode.commands.registerCommand('vim.h', () => {
		main.pushKey(vim.Key.h);
	});
	var disposable = vscode.commands.registerCommand('vim.i', () => {
		main.pushKey(vim.Key.i);
	});
	var disposable = vscode.commands.registerCommand('vim.j', () => {
		main.pushKey(vim.Key.j);
	});
	var disposable = vscode.commands.registerCommand('vim.k', () => {
		main.pushKey(vim.Key.k);
	});
	var disposable = vscode.commands.registerCommand('vim.l', () => {
		main.pushKey(vim.Key.l);
	});
	var disposable = vscode.commands.registerCommand('vim.esc', () => {
		main.pushKey(vim.Key.esc);
	});
	context.subscriptions.push(disposable);
}

export class Driver {
	public insertTextCurrentPosition(text:string) {
		var editor = vscode.window.activeTextEditor.edit((editBuilder) => {
			editBuilder.insert(vscode.window.activeTextEditor.selection.active,text);
		})
		vscode.commands.executeCommand("editor.action.triggerSuggest");
	}
	public moveLeft(){
		vscode.commands.executeCommand("cursorLeft");	
	}
	public moveRight(){
		vscode.commands.executeCommand("cursorRight");	
	}
	public moveUp(){
		vscode.commands.executeCommand("cursorUp");	
	}
	public moveDown(){
		vscode.commands.executeCommand("cursorDown");	
	}
}