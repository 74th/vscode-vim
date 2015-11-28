import * as vscode from 'vscode';
import {VimStyle} from './VimStyle';
import {VSCodeEditor} from './VSCodeEditor'

export function activate(context: vscode.ExtensionContext) {

    var conf = vscode.workspace.getConfiguration('vimStyle');
    var isJisKeyboard = conf.get<boolean>('useJisKeyboard', false);
    var showMode = conf.get<boolean>('showMode', false);
    
    var editor = new VSCodeEditor({
        showMode: showMode
    });
    
    var vim = new VimStyle(editor);
    
    context.subscriptions.push(editor);
    
    var disposable = vscode.workspace.onDidChangeConfiguration(() => {
        var showMode = conf.get<boolean>('showMode', false);
        
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
        if (isJisKeyboard) {
            // JIS: TODO
            vim.PushKey(Key.GraveAccent);
        } else {
            // US :
            vim.PushKey(Key.GraveAccent);
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.SGA', () => {
        // JIS: Shift+^(~) Shift+@(`) BUG?
        //      Shift+^で到達（まぁ良い）
        // US :
        vim.PushKey(Key.Tilde);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.S1', () => {
        // JIS: Shift+1
        // US :
        vim.PushKey(Key.Exclamation);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.S2', () => {
        if (isJisKeyboard) {
            // JIS: BUG? 到達できない
            vim.PushKey(Key.Quotation);
        } else {
            // US :
            vim.PushKey(Key.AtMark);
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.S3', () => {
        // JIS: Shift+3
        // US :
        vim.PushKey(Key.Sharp);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.S4', () => {
        // JIS: Shift+4
        // US :
        vim.PushKey(Key.Doller);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.S5', () => {
        // JIS: Shift+5
        // US :
        vim.PushKey(Key.Percent);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.S6', () => {
        if (isJisKeyboard) {
            // JIS: Shift+6
            vim.PushKey(Key.Ampersand);
        } else {
            // US :
            vim.PushKey(Key.CircumflexAccent);
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.S7', () => {
        if (isJisKeyboard) {
            // JIS: BUG? ここに到達できない
            vim.PushKey(Key.Apostrophe);
        } else {
            // US :
            vim.PushKey(Key.Ampersand);
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.S8', () => {
        if (isJisKeyboard) {
            // JIS: Shift+8
            vim.PushKey(Key.LeftParenthesis);
        } else {
            // US :
            vim.PushKey(Key.Asterisk);
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.S9', () => {
        if (isJisKeyboard) {
            // JIS: Shift+9
            vim.PushKey(Key.RightParenthesis);
        } else {
            // US :
            vim.PushKey(Key.LeftParenthesis);
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.S0', () => {
        if (isJisKeyboard) {
            // JIS: Shift+0
            vim.PushKey(Key.n0);
        } else {
            // US :
            vim.PushKey(Key.RightParenthesis);
        }
    });
    disposable = vscode.commands.registerCommand('vim.Hy', () => {
        // JIS: -
        //      _(BUG!)
        // US :
        vim.PushKey(Key.Hyphen);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.SHp', () => {
        if (isJisKeyboard) {
            // JIS: Shift+_(BUG?)
            vim.PushKey(Key.Equals);
        } else {
            // US :
            vim.PushKey(Key.LowLine);
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.Eq', () => {
        if (isJisKeyboard) {
            // JIS: ^ BUG?
            vim.PushKey(Key.CircumflexAccent);
        } else {
            // US :
            vim.PushKey(Key.Equals);
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.SEq', () => {
        if (isJisKeyboard) {
            // JIS: Shift+-(=)
            //      Shift++(+) BUG?
            vim.PushKey(Key.Equals);
        } else {
            // US :
            vim.PushKey(Key.Plus);
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.LB', () => {
        if (isJisKeyboard) {
            // JIS: [
            //      @ BUG?
            vim.PushKey(Key.LeftSquareBracket);
        } else {
            // US :
            vim.PushKey(Key.LeftSquareBracket);
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.SLB', () => {
        if (isJisKeyboard) {
            // JIS: 到達しない
            vim.PushKey(Key.LeftCurlyBracket);
        } else {
            // US :
            vim.PushKey(Key.LeftCurlyBracket);
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.RB', () => {
        if (isJisKeyboard) {
            // JIS: ]
            vim.PushKey(Key.RightSquareBracket);
        } else {
            // US :
            vim.PushKey(Key.RightSquareBracket);
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.SRB', () => {
        if (isJisKeyboard) {
            // JIS: Shift+](})
            vim.PushKey(Key.RightCurlyBracket);
        } else {
            // US : 
            vim.PushKey(Key.RightCurlyBracket);
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.RS', () => {
        if (isJisKeyboard) {
            // JIS: 動作しない
            vim.PushKey(Key.ReverseSolidus);
        } else {
            vim.PushKey(Key.ReverseSolidus);
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.SRS', () => {
        if(isJisKeyboard){
            // JIS: 動作しない
            vim.PushKey(Key.VerticalLine);
        }else{
            vim.PushKey(Key.VerticalLine);
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.Sc', () => {
        // JIS: ;
        // US : 
        vim.PushKey(Key.Semicolon);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.SSc', () => {
        if (isJisKeyboard) {
            // JIS: 到達しない
            vim.PushKey(Key.Plus);
        } else {
            // US :
            vim.PushKey(Key.Colon);
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.Ap', () => {
        if (isJisKeyboard) {
            // JIS: 到達しない！
            vim.PushKey(Key.Apostrophe);
        } else {
            // US :
            vim.PushKey(Key.Apostrophe);
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.SAp', () => {
        if (isJisKeyboard) {
            // JIS: Shift+2(")
            //      SHift+7(') BUG?
            vim.PushKey(Key.Quotation);
        } else {
            // US :
            vim.PushKey(Key.Quotation);
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.Cm', () => {
        // JIS: ,
        // US :
        vim.PushKey(Key.Comma);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.LT', () => {
        // JIS: Shift+.(<)
        // US :
        vim.PushKey(Key.LessThan);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.Pd', () => {
        // JIS: .
        // US :
        vim.PushKey(Key.Period);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.SPd', () => {
        // JIS: Shift+.(>)
        // US :
        vim.PushKey(Key.GreaterThan);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.Sl', () => {
        // JIS: /
        // US :
        vim.PushKey(Key.Solidus);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.SSl', () => {
        // JIS: Shift+/(?)
        // US :
        vim.PushKey(Key.Question);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.Sp', () => {
        // JIS: 到達しない BUG!
        // US : 
        vim.PushKey(Key.Space);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.Ec', () => {
        // JIS: ESC
        // US :
        vim.PushEscKey();
        vscode.commands.executeCommand("hideSuggestWidget");
    });
    context.subscriptions.push(disposable);
}
