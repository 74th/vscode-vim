import * as vscode from 'vscode';
import {VimStyle} from './VimStyle';
import * as VimStyleEnums from './VimStyleEnums'
import {VSCodeEditor} from './VSCodeEditor'

export function activate(context: vscode.ExtensionContext) {

	var editor = new VSCodeEditor();
	var vim = new VimStyle(editor)
	vscode.commands.registerCommand('vim.a', () => {
		vim.PushKey(VimStyleEnums.Key.a);
	});
	vscode.commands.registerCommand('vim.b', () => {
		vim.PushKey(VimStyleEnums.Key.b);
	});
	vscode.commands.registerCommand('vim.c', () => {
		vim.PushKey(VimStyleEnums.Key.c);
	});
	vscode.commands.registerCommand('vim.d', () => {
		vim.PushKey(VimStyleEnums.Key.d);
	});
	vscode.commands.registerCommand('vim.e', () => {
		vim.PushKey(VimStyleEnums.Key.e);
	});
	vscode.commands.registerCommand('vim.f', () => {
		vim.PushKey(VimStyleEnums.Key.f);
	});
	vscode.commands.registerCommand('vim.g', () => {
		vim.PushKey(VimStyleEnums.Key.g);
	});
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
	vscode.commands.registerCommand('vim.m', () => {
		vim.PushKey(VimStyleEnums.Key.m);
	});
	vscode.commands.registerCommand('vim.n', () => {
		vim.PushKey(VimStyleEnums.Key.n);
	});
	vscode.commands.registerCommand('vim.o', () => {
		vim.PushKey(VimStyleEnums.Key.o);
	});
	vscode.commands.registerCommand('vim.p', () => {
		vim.PushKey(VimStyleEnums.Key.p);
	});
	vscode.commands.registerCommand('vim.q', () => {
		vim.PushKey(VimStyleEnums.Key.q);
	});
	vscode.commands.registerCommand('vim.r', () => {
		vim.PushKey(VimStyleEnums.Key.r);
	});
	vscode.commands.registerCommand('vim.s', () => {
		vim.PushKey(VimStyleEnums.Key.w);
	});
	vscode.commands.registerCommand('vim.t', () => {
		vim.PushKey(VimStyleEnums.Key.t);
	});
	vscode.commands.registerCommand('vim.u', () => {
		vim.PushKey(VimStyleEnums.Key.u);
	});
	vscode.commands.registerCommand('vim.v', () => {
		vim.PushKey(VimStyleEnums.Key.v);
	});
	vscode.commands.registerCommand('vim.w', () => {
		vim.PushKey(VimStyleEnums.Key.w);
	});
	vscode.commands.registerCommand('vim.x', () => {
		vim.PushKey(VimStyleEnums.Key.x);
	});
	vscode.commands.registerCommand('vim.y', () => {
		vim.PushKey(VimStyleEnums.Key.y);
	});
	vscode.commands.registerCommand('vim.z', () => {
		vim.PushKey(VimStyleEnums.Key.z);
	});
	vscode.commands.registerCommand('vim.A', () => {
		vim.PushKey(VimStyleEnums.Key.A);
	});
	vscode.commands.registerCommand('vim.B', () => {
		vim.PushKey(VimStyleEnums.Key.B);
	});
	vscode.commands.registerCommand('vim.C', () => {
		vim.PushKey(VimStyleEnums.Key.C);
	});
	vscode.commands.registerCommand('vim.D', () => {
		vim.PushKey(VimStyleEnums.Key.D);
	});
	vscode.commands.registerCommand('vim.E', () => {
		vim.PushKey(VimStyleEnums.Key.E);
	});
	vscode.commands.registerCommand('vim.F', () => {
		vim.PushKey(VimStyleEnums.Key.F);
	});
	vscode.commands.registerCommand('vim.G', () => {
		vim.PushKey(VimStyleEnums.Key.G);
	});
	vscode.commands.registerCommand('vim.H', () => {
		vim.PushKey(VimStyleEnums.Key.H);
	});
	vscode.commands.registerCommand('vim.I', () => {
		vim.PushKey(VimStyleEnums.Key.I);
	});
	vscode.commands.registerCommand('vim.J', () => {
		vim.PushKey(VimStyleEnums.Key.J);
	});
	vscode.commands.registerCommand('vim.K', () => {
		vim.PushKey(VimStyleEnums.Key.K);
	});
	vscode.commands.registerCommand('vim.L', () => {
		vim.PushKey(VimStyleEnums.Key.L);
	});
	vscode.commands.registerCommand('vim.M', () => {
		vim.PushKey(VimStyleEnums.Key.M);
	});
	vscode.commands.registerCommand('vim.N', () => {
		vim.PushKey(VimStyleEnums.Key.N);
	});
	vscode.commands.registerCommand('vim.O', () => {
		vim.PushKey(VimStyleEnums.Key.O);
	});
	vscode.commands.registerCommand('vim.P', () => {
		vim.PushKey(VimStyleEnums.Key.P);
	});
	vscode.commands.registerCommand('vim.Q', () => {
		vim.PushKey(VimStyleEnums.Key.Q);
	});
	vscode.commands.registerCommand('vim.R', () => {
		vim.PushKey(VimStyleEnums.Key.R);
	});
	vscode.commands.registerCommand('vim.S', () => {
		vim.PushKey(VimStyleEnums.Key.W);
	});
	vscode.commands.registerCommand('vim.T', () => {
		vim.PushKey(VimStyleEnums.Key.T);
	});
	vscode.commands.registerCommand('vim.U', () => {
		vim.PushKey(VimStyleEnums.Key.U);
	});
	vscode.commands.registerCommand('vim.V', () => {
		vim.PushKey(VimStyleEnums.Key.V);
	});
	vscode.commands.registerCommand('vim.W', () => {
		vim.PushKey(VimStyleEnums.Key.W);
	});
	vscode.commands.registerCommand('vim.X', () => {
		vim.PushKey(VimStyleEnums.Key.X);
	});
	vscode.commands.registerCommand('vim.Y', () => {
		vim.PushKey(VimStyleEnums.Key.Y);
	});
	vscode.commands.registerCommand('vim.Z', () => {
		vim.PushKey(VimStyleEnums.Key.Z);
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
	vscode.commands.registerCommand('vim.doller', () => {
		vim.PushKey(VimStyleEnums.Key.doller);
	});
	var disposable = vscode.commands.registerCommand('vim.esc', () => {
		vim.PushEscKey();
		vscode.commands.executeCommand("hideSuggestWidget");
	});
	context.subscriptions.push(disposable);
}
