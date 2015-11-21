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
	vscode.commands.registerCommand('vim.n0', () => {
		vim.PushKey(VimStyleEnums.Key.n0);
	});
	vscode.commands.registerCommand('vim.n1', () => {
		vim.PushKey(VimStyleEnums.Key.n1);
	});
	vscode.commands.registerCommand('vim.n2', () => {
		vim.PushKey(VimStyleEnums.Key.n2);
	});
	vscode.commands.registerCommand('vim.n3', () => {
		vim.PushKey(VimStyleEnums.Key.n3);
	});
	vscode.commands.registerCommand('vim.n4', () => {
		vim.PushKey(VimStyleEnums.Key.n4);
	});
	vscode.commands.registerCommand('vim.n5', () => {
		vim.PushKey(VimStyleEnums.Key.n5);
	});
	vscode.commands.registerCommand('vim.n6', () => {
		vim.PushKey(VimStyleEnums.Key.n6);
	});
	vscode.commands.registerCommand('vim.n7', () => {
		vim.PushKey(VimStyleEnums.Key.n7);
	});
	vscode.commands.registerCommand('vim.n8', () => {
		vim.PushKey(VimStyleEnums.Key.n8);
	});
	vscode.commands.registerCommand('vim.n9', () => {
		vim.PushKey(VimStyleEnums.Key.n9);
	});
	var disposable = vscode.commands.registerCommand('vim.esc', () => {
		vim.PushEscKey();
		vscode.commands.executeCommand("hideSuggestWidget");
	});
	context.subscriptions.push(disposable);
}