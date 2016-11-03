import * as vscode from "vscode";
import {VimStyle} from "./VimStyle";
import {VSCodeEditor, IVSCodeEditorOptions} from "./VSCodeEditor";
import {VSCodeEditorKeyBindngs} from "./VSCodeEditorKeyBindings";

function checkImapAction(bindkey: string): boolean {
    let p = vscode.window.activeTextEditor.selection.active;
    let line = vscode.window.activeTextEditor.document.lineAt(p.line).text;
    if (p.character < bindkey.length - 1) {
        return false;
    }
    for (let i = 0; i < bindkey.length - 1; i++) {
        if (line[p.character - (bindkey.length - 1) + i] != bindkey[i]) {
            return false;
        }
    }
    // delete bindKey[0:-1] character
    if (bindkey.length > 1) {
        let deleteRange = new vscode.Range(new vscode.Position(p.line, p.character - (bindkey.length - 1)), p);
        vscode.window.activeTextEditor.edit((editBuilder) => {
            editBuilder.delete(deleteRange);
        });
    }
    // set position
    let np = new vscode.Position(p.line,p.character-(bindkey.length-1))
    vscode.window.activeTextEditor.selection = new vscode.Selection(np, np);
    return true;
}

export function activate(context: vscode.ExtensionContext) {
    if (vscode.workspace.getConfiguration("vimStyle").get<boolean>("enabled", true)) {
        activateVimStyle(context);
    }
}

function activateVimStyle(context: vscode.ExtensionContext) {
    let editorOpt: IVSCodeEditorOptions;
    let vimOpt: IVimStyleOptions;
    function loadConfiguration() {
        let conf = vscode.workspace.getConfiguration("vimStyle");
        editorOpt = {
            showMode: conf.get<boolean>("showMode", true),
            changeCursorStyle: conf.get<boolean>("changeCursorStyle", true),
            defaultMode: conf.get<string>("defaultMode", "normal"),
            imapEsc: conf.get<string>("imapEsc", "")
        };
        vimOpt = {
            useErgonomicKeyForMotion: conf.get<boolean>("useErgonomicKeyForMotion", false),
            editorKeyBindings: VSCodeEditorKeyBindngs,
            vimrc: conf.get<string[]>("vimrc", null),
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

    let imapEscPointer = 0;
    context.subscriptions.push(vscode.commands.registerCommand("type", (args) => {
        if (!vscode.window.activeTextEditor) {
            return;
        }
        if (vim.GetMode() === VimMode.Insert) {
            if (editorOpt.imapEsc.length == 0) {
                vscode.commands.executeCommand("default:type", args);
                return;
            }
            if (editorOpt.imapEsc[imapEscPointer] == args.text) {
                imapEscPointer++;
                if (editorOpt.imapEsc.length == imapEscPointer) {
                    if (checkImapAction(editorOpt.imapEsc)) {
                        imapEscPointer = 0;
                        vim.PushEscKey();
                        return;
                    }
                } else {
                    vscode.commands.executeCommand("default:type", args);
                    return;
                }
            } else if (editorOpt.imapEsc[0] == args.text) {
                imapEscPointer = 1;
                vscode.commands.executeCommand("default:type", args);
                return;
            }
            imapEscPointer = 0;
            vscode.commands.executeCommand("default:type", args);
        }
        vim.PushKey(args.text);
    }));
    context.subscriptions.push(vscode.commands.registerCommand("vim.Esc", () => {
        vim.PushEscKey();
    }));

    let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890`~!@#$%^&*()-=_+[]\\{}|,./<>?";
    let addTypeVim = (c: string) => {
        context.subscriptions.push(vscode.commands.registerCommand("vim.type-" + c, () => {
            vim.PushKey(c);
        }));
    }
    for (let i = 0; i < chars.length; i++) {
        addTypeVim(chars[i]);
    }

    vscode.commands.executeCommand('setContext', "vim.enabled", true);

    setTimeout(() => {
        if (editorOpt.defaultMode === "insert") {
            vim.PushKey("i")
        } else {
            vim.PushEscKey();
        }
    }, 1000);
}
