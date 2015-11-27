import * as vscode from 'vscode';
import {VimStyle} from './VimStyle';
import * as Enums from './VimStyleEnums'
import {VSCodeEditor} from './VSCodeEditor'

export function activate(context: vscode.ExtensionContext) {

    var editor = new VSCodeEditor();
    var vim = new VimStyle(editor);
    var isJisKeyboard: boolean;
    var conf = vscode.workspace.getConfiguration('vimStyle');
    isJisKeyboard = conf.get<boolean>("useJisKeyboard");
    
    var disposable = vscode.commands.registerCommand('vim.a', () => {
        vim.PushKey(Enums.Key.a);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.b', () => {
        vim.PushKey(Enums.Key.b);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.c', () => {
        vim.PushKey(Enums.Key.c);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.d', () => {
        vim.PushKey(Enums.Key.d);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.e', () => {
        vim.PushKey(Enums.Key.e);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.f', () => {
        vim.PushKey(Enums.Key.f);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.g', () => {
        vim.PushKey(Enums.Key.g);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.h', () => {
        vim.PushKey(Enums.Key.h);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.i', () => {
        vim.PushKey(Enums.Key.i);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.j', () => {
        vim.PushKey(Enums.Key.j);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.k', () => {
        vim.PushKey(Enums.Key.k);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.l', () => {
        vim.PushKey(Enums.Key.l);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.m', () => {
        vim.PushKey(Enums.Key.m);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.n', () => {
        vim.PushKey(Enums.Key.n);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.o', () => {
        vim.PushKey(Enums.Key.o);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.p', () => {
        vim.PushKey(Enums.Key.p);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.q', () => {
        vim.PushKey(Enums.Key.q);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.r', () => {
        vim.PushKey(Enums.Key.r);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.s', () => {
        vim.PushKey(Enums.Key.s);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.t', () => {
        vim.PushKey(Enums.Key.t);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.u', () => {
        vim.PushKey(Enums.Key.u);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.v', () => {
        vim.PushKey(Enums.Key.v);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.w', () => {
        vim.PushKey(Enums.Key.w);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.x', () => {
        vim.PushKey(Enums.Key.x);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.y', () => {
        vim.PushKey(Enums.Key.y);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.z', () => {
        vim.PushKey(Enums.Key.z);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.A', () => {
        vim.PushKey(Enums.Key.A);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.B', () => {
        vim.PushKey(Enums.Key.B);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.C', () => {
        vim.PushKey(Enums.Key.C);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.D', () => {
        vim.PushKey(Enums.Key.D);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.E', () => {
        vim.PushKey(Enums.Key.E);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.F', () => {
        vim.PushKey(Enums.Key.F);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.G', () => {
        vim.PushKey(Enums.Key.G);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.H', () => {
        vim.PushKey(Enums.Key.H);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.I', () => {
        vim.PushKey(Enums.Key.I);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.J', () => {
        vim.PushKey(Enums.Key.J);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.K', () => {
        vim.PushKey(Enums.Key.K);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.L', () => {
        vim.PushKey(Enums.Key.L);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.M', () => {
        vim.PushKey(Enums.Key.M);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.N', () => {
        vim.PushKey(Enums.Key.N);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.O', () => {
        vim.PushKey(Enums.Key.O);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.P', () => {
        vim.PushKey(Enums.Key.P);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.Q', () => {
        vim.PushKey(Enums.Key.Q);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.R', () => {
        vim.PushKey(Enums.Key.R);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.S', () => {
        vim.PushKey(Enums.Key.S);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.T', () => {
        vim.PushKey(Enums.Key.T);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.U', () => {
        vim.PushKey(Enums.Key.U);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.V', () => {
        vim.PushKey(Enums.Key.V);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.W', () => {
        vim.PushKey(Enums.Key.W);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.X', () => {
        vim.PushKey(Enums.Key.X);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.Y', () => {
        vim.PushKey(Enums.Key.Y);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.Z', () => {
        vim.PushKey(Enums.Key.Z);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.n0', () => {
        vim.PushKey(Enums.Key.n0);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.n1', () => {
        vim.PushKey(Enums.Key.n1);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.n2', () => {
        vim.PushKey(Enums.Key.n2);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.n3', () => {
        vim.PushKey(Enums.Key.n3);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.n4', () => {
        vim.PushKey(Enums.Key.n4);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.n5', () => {
        vim.PushKey(Enums.Key.n5);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.n6', () => {
        vim.PushKey(Enums.Key.n6);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.n7', () => {
        vim.PushKey(Enums.Key.n7);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.n8', () => {
        vim.PushKey(Enums.Key.n8);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.n9', () => {
        vim.PushKey(Enums.Key.n9);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.GA', () => {
        if (isJisKeyboard) {
            // JIS: TODO
            vim.PushKey(Enums.Key.GraveAccent);
        } else {
            // US :
            vim.PushKey(Enums.Key.GraveAccent);
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.SGA', () => {
        // JIS: Shift+^(~) Shift+@(`) BUG?
        //      Shift+^で到達（まぁ良い）
        // US :
        vim.PushKey(Enums.Key.Tilde);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.S1', () => {
        // JIS: Shift+1
        // US :
        vim.PushKey(Enums.Key.Exclamation);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.S2', () => {
        if (isJisKeyboard) {
            // JIS: BUG? 到達できない
            vim.PushKey(Enums.Key.Quotation);
        } else {
            // US :
            vim.PushKey(Enums.Key.AtMark);
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.S3', () => {
        // JIS: Shift+3
        // US :
        vim.PushKey(Enums.Key.Sharp);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.S4', () => {
        // JIS: Shift+4
        // US :
        vim.PushKey(Enums.Key.Doller);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.S5', () => {
        // JIS: Shift+5
        // US :
        vim.PushKey(Enums.Key.Percent);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.S6', () => {
        if (isJisKeyboard) {
            // JIS: Shift+6
            vim.PushKey(Enums.Key.Ampersand);
        } else {
            // US :
            vim.PushKey(Enums.Key.CircumflexAccent);
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.S7', () => {
        if (isJisKeyboard) {
            // JIS: BUG? ここに到達できない
            vim.PushKey(Enums.Key.Apostrophe);
        } else {
            // US :
            vim.PushKey(Enums.Key.Ampersand);
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.S8', () => {
        if (isJisKeyboard) {
            // JIS: Shift+8
            vim.PushKey(Enums.Key.LeftParenthesis);
        } else {
            // US :
            vim.PushKey(Enums.Key.Asterisk);
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.S9', () => {
        if (isJisKeyboard) {
            // JIS: Shift+9
            vim.PushKey(Enums.Key.RightParenthesis);
        } else {
            // US :
            vim.PushKey(Enums.Key.LeftParenthesis);
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.S0', () => {
        if (isJisKeyboard) {
            // JIS: Shift+0
            vim.PushKey(Enums.Key.n0);
        } else {
            // US :
            vim.PushKey(Enums.Key.RightParenthesis);
        }
    });
    disposable = vscode.commands.registerCommand('vim.Hy', () => {
        // JIS: -
        //      _(BUG!)
        // US :
        vim.PushKey(Enums.Key.Hyphen);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.SHp', () => {
        if (isJisKeyboard) {
            // JIS: Shift+_(BUG?)
            vim.PushKey(Enums.Key.Equals);
        } else {
            // US :
            vim.PushKey(Enums.Key.LowLine);
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.Eq', () => {
        if (isJisKeyboard) {
            // JIS: ^ BUG?
            vim.PushKey(Enums.Key.CircumflexAccent);
        } else {
            // US :
            vim.PushKey(Enums.Key.Equals);
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.SEq', () => {
        if (isJisKeyboard) {
            // JIS: Shift+-(=)
            //      Shift++(+) BUG?
            vim.PushKey(Enums.Key.Equals);
        } else {
            // US :
            vim.PushKey(Enums.Key.Plus);
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.LB', () => {
        if (isJisKeyboard) {
            // JIS: [
            //      @ BUG?
            vim.PushKey(Enums.Key.LeftSquareBracket);
        } else {
            // US :
            vim.PushKey(Enums.Key.LeftSquareBracket);
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.SLB', () => {
        if (isJisKeyboard) {
            // JIS: 到達しない
            vim.PushKey(Enums.Key.LeftCurlyBracket);
        } else {
            // US :
            vim.PushKey(Enums.Key.LeftCurlyBracket);
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.RB', () => {
        if (isJisKeyboard) {
            // JIS: ]
            vim.PushKey(Enums.Key.RightSquareBracket);
        } else {
            // US :
            vim.PushKey(Enums.Key.RightSquareBracket);
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.SRB', () => {
        if (isJisKeyboard) {
            // JIS: Shift+](})
            vim.PushKey(Enums.Key.RightCurlyBracket);
        } else {
            // US : 
            vim.PushKey(Enums.Key.RightCurlyBracket);
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.RS', () => {
        if (isJisKeyboard) {
            // JIS: 動作しない
            vim.PushKey(Enums.Key.ReverseSolidus);
        } else {
            vim.PushKey(Enums.Key.ReverseSolidus);
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.SRS', () => {
        if(isJisKeyboard){
            // JIS: 動作しない
            vim.PushKey(Enums.Key.VerticalLine);
        }else{
            vim.PushKey(Enums.Key.VerticalLine);
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.Sc', () => {
        // JIS: ;
        // US : 
        vim.PushKey(Enums.Key.Semicolon);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.SSc', () => {
        if (isJisKeyboard) {
            // JIS: 到達しない
            vim.PushKey(Enums.Key.Plus);
        } else {
            // US :
            vim.PushKey(Enums.Key.Colon);
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.Ap', () => {
        if (isJisKeyboard) {
            // JIS: 到達しない！
            vim.PushKey(Enums.Key.Apostrophe);
        } else {
            // US :
            vim.PushKey(Enums.Key.Apostrophe);
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.SAp', () => {
        if (isJisKeyboard) {
            // JIS: Shift+2(")
            //      SHift+7(') BUG?
            vim.PushKey(Enums.Key.Quotation);
        } else {
            // US :
            vim.PushKey(Enums.Key.Quotation);
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.Cm', () => {
        // JIS: ,
        // US :
        vim.PushKey(Enums.Key.Comma);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.LT', () => {
        // JIS: Shift+.(<)
        // US :
        vim.PushKey(Enums.Key.LessThan);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.Pd', () => {
        // JIS: .
        // US :
        vim.PushKey(Enums.Key.Period);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.SPd', () => {
        // JIS: Shift+.(>)
        // US :
        vim.PushKey(Enums.Key.GreaterThan);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.Sl', () => {
        // JIS: /
        // US :
        vim.PushKey(Enums.Key.Solidus);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.SSl', () => {
        // JIS: Shift+/(?)
        // US :
        vim.PushKey(Enums.Key.Question);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.Sp', () => {
        // JIS: 到達しない BUG!
        // US : 
        vim.PushKey(Enums.Key.Space);
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
