import * as vscode from "vscode";
import {VimStyle} from "./VimStyle";
import {VSCodeEditor, IVSCodeEditorOptions} from "./VSCodeEditor";

export function activate(context: vscode.ExtensionContext) {

    let editorOpt: IVSCodeEditorOptions;
    let vimOpt: IVimStyleOptions;
    function loadConfiguration() {
        let conf = vscode.workspace.getConfiguration("vimStyle");
        editorOpt = {
            isWinJisKeyboard: conf.get<boolean>("useWinJisKeyboard", false),
            isMacJisKeyboard: conf.get<boolean>("useMacJisKeyboard", false),
            showMode: conf.get<boolean>("showMode", false)
        };
        vimOpt = {
            useErgonomicKeyForMotion: conf.get<boolean>("useErgonomicKeyForMotion", false)
        };
    }
    loadConfiguration();

    let editor = new VSCodeEditor(editorOpt);
    context.subscriptions.push(editor);
    let vim = new VimStyle(editor, vimOpt);

    let disposable = vscode.workspace.onDidChangeConfiguration(() => {
        loadConfiguration();
        vim.ApplyOptions(vimOpt);
        editor.ApplyOptions(editorOpt);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.window.onDidChangeActiveTextEditor((textEditor) => {
        editor.ChangePositionByUser();
    });
    context.subscriptions.push(disposable);
    disposable = vscode.window.onDidChangeTextEditorSelection((textEditor) => {
        editor.ChangePositionByUser();
    });
    context.subscriptions.push(disposable);

    context.subscriptions.push(vscode.commands.registerCommand("type", (args) => {
        if (!vscode.window.activeTextEditor) {
            return;
        }
        console.log(args.text);
        vim.PushKey(args.text);
    }));
    context.subscriptions.push(vscode.commands.registerCommand("vim.Esc", () => {
        vim.PushEscKey();
    }));

    vim.PushEscKey();
}
