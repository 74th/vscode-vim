import * as vscode from 'vscode';
import {VimStyle} from './VimStyle';
import {VSCodeEditor} from './VSCodeEditor'

export function activate(context: vscode.ExtensionContext) {

    var conf = vscode.workspace.getConfiguration('vimStyle');
    var isWinJisKeyboard = conf.get<boolean>('useWinJisKeyboard', false);
    var showMode = conf.get<boolean>('showMode', false);

    var editor = new VSCodeEditor({
        showMode: showMode
    });

    var vim = new VimStyle(editor);

    context.subscriptions.push(editor);

    var disposable = vscode.workspace.onDidChangeConfiguration(() => {
        conf = vscode.workspace.getConfiguration('vimStyle');
        showMode = conf.get<boolean>('showMode', false);

        editor.SetModeStatusVisibility(showMode);
    });

    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand('vim.a', () => {
        vim.PushKey(Key.a);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.b', () => {
        vim.PushKey(Key.b);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.c', () => {
        vim.PushKey(Key.c);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.d', () => {
        vim.PushKey(Key.d);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.e', () => {
        vim.PushKey(Key.e);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.f', () => {
        vim.PushKey(Key.f);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.g', () => {
        vim.PushKey(Key.g);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.h', () => {
        vim.PushKey(Key.h);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.i', () => {
        vim.PushKey(Key.i);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.j', () => {
        vim.PushKey(Key.j);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.k', () => {
        vim.PushKey(Key.k);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.l', () => {
        vim.PushKey(Key.l);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.m', () => {
        vim.PushKey(Key.m);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.n', () => {
        vim.PushKey(Key.n);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.o', () => {
        vim.PushKey(Key.o);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.p', () => {
        vim.PushKey(Key.p);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.q', () => {
        vim.PushKey(Key.q);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.r', () => {
        vim.PushKey(Key.r);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.s', () => {
        vim.PushKey(Key.s);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.t', () => {
        vim.PushKey(Key.t);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.u', () => {
        vim.PushKey(Key.u);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.v', () => {
        vim.PushKey(Key.v);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.w', () => {
        vim.PushKey(Key.w);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.x', () => {
        vim.PushKey(Key.x);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.y', () => {
        vim.PushKey(Key.y);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.z', () => {
        vim.PushKey(Key.z);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.A', () => {
        vim.PushKey(Key.A);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.B', () => {
        vim.PushKey(Key.B);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.C', () => {
        vim.PushKey(Key.C);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.D', () => {
        vim.PushKey(Key.D);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.E', () => {
        vim.PushKey(Key.E);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.F', () => {
        vim.PushKey(Key.F);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.G', () => {
        vim.PushKey(Key.G);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.H', () => {
        vim.PushKey(Key.H);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.I', () => {
        vim.PushKey(Key.I);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.J', () => {
        vim.PushKey(Key.J);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.K', () => {
        vim.PushKey(Key.K);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.L', () => {
        vim.PushKey(Key.L);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.M', () => {
        vim.PushKey(Key.M);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.N', () => {
        vim.PushKey(Key.N);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.O', () => {
        vim.PushKey(Key.O);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.P', () => {
        vim.PushKey(Key.P);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.Q', () => {
        vim.PushKey(Key.Q);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.R', () => {
        vim.PushKey(Key.R);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.S', () => {
        vim.PushKey(Key.S);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.T', () => {
        vim.PushKey(Key.T);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.U', () => {
        vim.PushKey(Key.U);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.V', () => {
        vim.PushKey(Key.V);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.W', () => {
        vim.PushKey(Key.W);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.X', () => {
        vim.PushKey(Key.X);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.Y', () => {
        vim.PushKey(Key.Y);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.Z', () => {
        vim.PushKey(Key.Z);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.n0', () => {
        vim.PushKey(Key.n0);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.n1', () => {
        vim.PushKey(Key.n1);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.n2', () => {
        vim.PushKey(Key.n2);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.n3', () => {
        vim.PushKey(Key.n3);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.n4', () => {
        vim.PushKey(Key.n4);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.n5', () => {
        vim.PushKey(Key.n5);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.n6', () => {
        vim.PushKey(Key.n6);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.n7', () => {
        vim.PushKey(Key.n7);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.n8', () => {
        vim.PushKey(Key.n8);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.n9', () => {
        vim.PushKey(Key.n9);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.GA', () => {
        if (isWinJisKeyboard) {
            // @
            vim.PushKey(Key.AtMark);
        } else {
            // ^
            vim.PushKey(Key.GraveAccent);
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.SGA', () => {
        if (isWinJisKeyboard) {
            // `
            vim.PushKey(Key.GraveAccent);
        } else {
            // ~
            vim.PushKey(Key.Tilde);
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.S1', () => {
        // !
        vim.PushKey(Key.Exclamation);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.S2', () => {
        if (isWinJisKeyboard) {
            // "
            vim.PushKey(Key.Quotation);
        } else {
            // @
            vim.PushKey(Key.AtMark);
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.S3', () => {
        // #
        vim.PushKey(Key.Sharp);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.S4', () => {
        // $
        vim.PushKey(Key.Doller);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.S5', () => {
        // %
        vim.PushKey(Key.Percent);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.S6', () => {
        if (isWinJisKeyboard) {
            // &
            vim.PushKey(Key.Ampersand);
        } else {
            // ^
            vim.PushKey(Key.CircumflexAccent);
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.S7', () => {
        if (isWinJisKeyboard) {
            // '
            vim.PushKey(Key.Apostrophe);
        } else {
            // &
            vim.PushKey(Key.Ampersand);
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.S8', () => {
        if (isWinJisKeyboard) {
            // (
            vim.PushKey(Key.LeftParenthesis);
        } else {
            // @
            vim.PushKey(Key.Asterisk);
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.S9', () => {
        if (isWinJisKeyboard) {
            // )
            vim.PushKey(Key.RightParenthesis);
        } else {
            // (
            vim.PushKey(Key.LeftParenthesis);
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.S0', () => {
        if (isWinJisKeyboard) {
            // _
            vim.PushKey(Key.LowLine);
        } else {
            // )
            vim.PushKey(Key.RightParenthesis);
        }
    });
    disposable = vscode.commands.registerCommand('vim.Hy', () => {
        // -
        vim.PushKey(Key.Hyphen);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.SHp', () => {
        if (isWinJisKeyboard) {
            // =
            vim.PushKey(Key.Equals);
        } else {
            // _
            vim.PushKey(Key.LowLine);
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.Eq', () => {
        if (isWinJisKeyboard) {
            // ;
            vim.PushKey(Key.Semicolon);
        } else {
            // =
            vim.PushKey(Key.Equals);
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.SEq', () => {
        // +
        vim.PushKey(Key.Plus);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.LB', () => {
        // [
        vim.PushKey(Key.LeftSquareBracket);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.SLB', () => {
        // {
        vim.PushKey(Key.LeftCurlyBracket);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.RB', () => {
        // ]
        vim.PushKey(Key.RightSquareBracket);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.SRB', () => {
        // ]
        vim.PushKey(Key.RightCurlyBracket);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.RS', () => {
        // \
        vim.PushKey(Key.ReverseSolidus);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.SRS', () => {
        // |
        vim.PushKey(Key.VerticalLine);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.Sc', () => {
        if (isWinJisKeyboard) {
            // :
            vim.PushKey(Key.Colon);
        } else {
            // ;
            vim.PushKey(Key.Semicolon);
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.SSc', () => {
        if (isWinJisKeyboard) {
            // *
            vim.PushKey(Key.Asterisk);
        } else {
            // :
            vim.PushKey(Key.Colon);
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.Ap', () => {
        if (isWinJisKeyboard) {
            // ^
            vim.PushKey(Key.CircumflexAccent);
        } else {
            // '
            vim.PushKey(Key.Apostrophe);
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.SAp', () => {
        if (isWinJisKeyboard) {
            // ~
            vim.PushKey(Key.Tilde);
        } else {
            // "
            vim.PushKey(Key.Quotation);
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.Cm', () => {
        // ,
        vim.PushKey(Key.Comma);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.LT', () => {
        // <
        vim.PushKey(Key.LessThan);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.Pd', () => {
        // .
        vim.PushKey(Key.Period);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.SPd', () => {
        // >
        vim.PushKey(Key.GreaterThan);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.Sl', () => {
        // /
        vim.PushKey(Key.Solidus);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.SSl', () => {
        // ?
        vim.PushKey(Key.Question);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.Sp', () => {
        // " "
        vim.PushKey(Key.Space);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.Ec', () => {
        vim.PushEscKey();
        vscode.commands.executeCommand("hideSuggestWidget");
    });
    context.subscriptions.push(disposable);
}
