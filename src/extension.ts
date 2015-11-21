import * as vscode from 'vscode';
import {VimStyle} from './VimStyle';
import * as VimStyleEnums from './VimStyleEnums'
import {VSCodeEditor} from './VSCodeEditor'

export function activate(context: vscode.ExtensionContext) {

	var editor = new VSCodeEditor();
	var vim = new VimStyle(editor)
	vscode.commands.registerCommand('vim.h', () => {
		vim.PushKey(VimStyleEnums.Key.h);
	});
	vscode.commands.registerCommand('vim.i', () => {
		vim.PushKey(VimStyleEnums.Key.i);
	});
	vscode.commands.registerCommand('vim.j', () => {
		vim.PushKey(VimStyleEnums.Key.j);
	});
	vscode.commands.registerCommand('vim.k', () => {
		vim.PushKey(VimStyleEnums.Key.k);
	});
	vscode.commands.registerCommand('vim.l', () => {
		vim.PushKey(VimStyleEnums.Key.l);
	});
	var disposable = vscode.commands.registerCommand('vim.esc', () => {
		vim.PushEscKey();
	});
	context.subscriptions.push(disposable);
}

export class Driver {
	public insertTextCurrentPosition(text:string) {
		vscode.window.activeTextEditor.edit((editBuilder) => {
			editBuilder.insert(vscode.window.activeTextEditor.selection.active,text);
		})
		vscode.commands.executeCommand("editor.action.triggerSuggest");
	}
	public moveLeft(){
		var p = vscode.window.activeTextEditor.selection.active;
		var p2 = p.translate(0,-1);
		var s = new vscode.Selection(p2,p2);
		vscode.window.activeTextEditor.selection = s;
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
	public hideSuggest(){
		vscode.commands.executeCommand("hideSuggestWidget");
	}
}