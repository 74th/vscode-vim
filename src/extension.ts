import * as vscode from 'vscode';
import {VimStyle} from './VimStyle';
import * as VimStyleEnums from './VimStyleEnums'
import {VSCodeEditor} from './VSCodeEditor'

export function activate(context: vscode.ExtensionContext) {

    var editor = new VSCodeEditor();
    var vim = new VimStyle(editor);
    var isJisKeyboard: boolean;
    var conf = vscode.workspace.getConfiguration('vimStyle');
    isJisKeyboard = conf.get<boolean>("useJisKeyboard");
    
    var disposable = vscode.commands.registerCommand('vim.a', () => {
        vim.PushKey(VimStyleEnums.Key.a);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.b', () => {
        vim.PushKey(VimStyleEnums.Key.b);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.c', () => {
        vim.PushKey(VimStyleEnums.Key.c);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.d', () => {
        vim.PushKey(VimStyleEnums.Key.d);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.e', () => {
        vim.PushKey(VimStyleEnums.Key.e);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.f', () => {
        vim.PushKey(VimStyleEnums.Key.f);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.g', () => {
        vim.PushKey(VimStyleEnums.Key.g);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.h', () => {
        vim.PushKey(VimStyleEnums.Key.h);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.i', () => {
        vim.PushKey(VimStyleEnums.Key.i);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.j', () => {
        vim.PushKey(VimStyleEnums.Key.j);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.k', () => {
        vim.PushKey(VimStyleEnums.Key.k);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.l', () => {
        vim.PushKey(VimStyleEnums.Key.l);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.m', () => {
        vim.PushKey(VimStyleEnums.Key.m);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.n', () => {
        vim.PushKey(VimStyleEnums.Key.n);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.o', () => {
        vim.PushKey(VimStyleEnums.Key.o);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.p', () => {
        vim.PushKey(VimStyleEnums.Key.p);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.q', () => {
        vim.PushKey(VimStyleEnums.Key.q);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.r', () => {
        vim.PushKey(VimStyleEnums.Key.r);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.s', () => {
        vim.PushKey(VimStyleEnums.Key.s);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.t', () => {
        vim.PushKey(VimStyleEnums.Key.t);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.u', () => {
        vim.PushKey(VimStyleEnums.Key.u);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.v', () => {
        vim.PushKey(VimStyleEnums.Key.v);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.w', () => {
        vim.PushKey(VimStyleEnums.Key.w);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.x', () => {
        vim.PushKey(VimStyleEnums.Key.x);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.y', () => {
        vim.PushKey(VimStyleEnums.Key.y);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.z', () => {
        vim.PushKey(VimStyleEnums.Key.z);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.A', () => {
        vim.PushKey(VimStyleEnums.Key.A);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.B', () => {
        vim.PushKey(VimStyleEnums.Key.B);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.C', () => {
        vim.PushKey(VimStyleEnums.Key.C);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.D', () => {
        vim.PushKey(VimStyleEnums.Key.D);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.E', () => {
        vim.PushKey(VimStyleEnums.Key.E);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.F', () => {
        vim.PushKey(VimStyleEnums.Key.F);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.G', () => {
        vim.PushKey(VimStyleEnums.Key.G);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.H', () => {
        vim.PushKey(VimStyleEnums.Key.H);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.I', () => {
        vim.PushKey(VimStyleEnums.Key.I);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.J', () => {
        vim.PushKey(VimStyleEnums.Key.J);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.K', () => {
        vim.PushKey(VimStyleEnums.Key.K);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.L', () => {
        vim.PushKey(VimStyleEnums.Key.L);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.M', () => {
        vim.PushKey(VimStyleEnums.Key.M);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.N', () => {
        vim.PushKey(VimStyleEnums.Key.N);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.O', () => {
        vim.PushKey(VimStyleEnums.Key.O);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.P', () => {
        vim.PushKey(VimStyleEnums.Key.P);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.Q', () => {
        vim.PushKey(VimStyleEnums.Key.Q);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.R', () => {
        vim.PushKey(VimStyleEnums.Key.R);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.S', () => {
        vim.PushKey(VimStyleEnums.Key.S);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.T', () => {
        vim.PushKey(VimStyleEnums.Key.T);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.U', () => {
        vim.PushKey(VimStyleEnums.Key.U);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.V', () => {
        vim.PushKey(VimStyleEnums.Key.V);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.W', () => {
        vim.PushKey(VimStyleEnums.Key.W);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.X', () => {
        vim.PushKey(VimStyleEnums.Key.X);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.Y', () => {
        vim.PushKey(VimStyleEnums.Key.Y);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.Z', () => {
        vim.PushKey(VimStyleEnums.Key.Z);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.n0', () => {
        vim.PushKey(VimStyleEnums.Key.n0);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.n1', () => {
        vim.PushKey(VimStyleEnums.Key.n1);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.n2', () => {
        vim.PushKey(VimStyleEnums.Key.n2);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.n3', () => {
        vim.PushKey(VimStyleEnums.Key.n3);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.n4', () => {
        vim.PushKey(VimStyleEnums.Key.n4);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.n5', () => {
        vim.PushKey(VimStyleEnums.Key.n5);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.n6', () => {
        vim.PushKey(VimStyleEnums.Key.n6);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.n7', () => {
        vim.PushKey(VimStyleEnums.Key.n7);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.n8', () => {
        vim.PushKey(VimStyleEnums.Key.n8);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.n9', () => {
        vim.PushKey(VimStyleEnums.Key.n9);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.GA', () => {
        if (isJisKeyboard) {
            // JIS: TODO
            vim.PushKey(VimStyleEnums.Key.GraveAccent);
        } else {
            // US :
            vim.PushKey(VimStyleEnums.Key.GraveAccent);
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.SGA', () => {
        // JIS: Shift+^(~) Shift+@(`) BUG?
        //      Shift+^で到達（まぁ良い）
        // US :
        vim.PushKey(VimStyleEnums.Key.Tilde);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.S1', () => {
        // JIS: Shift+1
        // US :
        vim.PushKey(VimStyleEnums.Key.Exclamation);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.S2', () => {
        if (isJisKeyboard) {
            // JIS: BUG? 到達できない
            vim.PushKey(VimStyleEnums.Key.Quotation);
        } else {
            // US :
            vim.PushKey(VimStyleEnums.Key.AtMark);
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.S3', () => {
        // JIS: Shift+3
        // US :
        vim.PushKey(VimStyleEnums.Key.Sharp);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.S4', () => {
        // JIS: Shift+4
        // US :
        vim.PushKey(VimStyleEnums.Key.Doller);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.S5', () => {
        // JIS: Shift+5
        // US :
        vim.PushKey(VimStyleEnums.Key.Percent);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.S6', () => {
        if (isJisKeyboard) {
            // JIS: Shift+6
            vim.PushKey(VimStyleEnums.Key.Ampersand);
        } else {
            // US :
            vim.PushKey(VimStyleEnums.Key.CircumflexAccent);
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.S7', () => {
        if (isJisKeyboard) {
            // JIS: BUG? ここに到達できない
            vim.PushKey(VimStyleEnums.Key.Apostrophe);
        } else {
            // US :
            vim.PushKey(VimStyleEnums.Key.Ampersand);
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.S8', () => {
        if (isJisKeyboard) {
            // JIS: Shift+8
            vim.PushKey(VimStyleEnums.Key.LeftParenthesis);
        } else {
            // US :
            vim.PushKey(VimStyleEnums.Key.Asterisk);
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.S9', () => {
        if (isJisKeyboard) {
            // JIS: Shift+9
            vim.PushKey(VimStyleEnums.Key.RightParenthesis);
        } else {
            // US :
            vim.PushKey(VimStyleEnums.Key.LeftParenthesis);
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.S0', () => {
        if (isJisKeyboard) {
            // JIS: Shift+0
            vim.PushKey(VimStyleEnums.Key.n0);
        } else {
            // US :
            vim.PushKey(VimStyleEnums.Key.RightParenthesis);
        }
    });
    disposable = vscode.commands.registerCommand('vim.Hy', () => {
        // JIS: -
        //      _(BUG!)
        // US :
        vim.PushKey(VimStyleEnums.Key.Hyphen);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.SHp', () => {
        if (isJisKeyboard) {
            // JIS: Shift+_(BUG?)
            vim.PushKey(VimStyleEnums.Key.Equals);
        } else {
            // US :
            vim.PushKey(VimStyleEnums.Key.LowLine);
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.Eq', () => {
        if (isJisKeyboard) {
            // JIS: ^ BUG?
            vim.PushKey(VimStyleEnums.Key.CircumflexAccent);
        } else {
            // US :
            vim.PushKey(VimStyleEnums.Key.Equals);
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.SEq', () => {
        if (isJisKeyboard) {
            // JIS: Shift+-(=)
            //      Shift++(+) BUG?
            vim.PushKey(VimStyleEnums.Key.Equals);
        } else {
            // US :
            vim.PushKey(VimStyleEnums.Key.Plus);
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.LB', () => {
        if (isJisKeyboard) {
            // JIS: [
            //      @ BUG?
            vim.PushKey(VimStyleEnums.Key.LeftSquareBracket);
        } else {
            // US :
            vim.PushKey(VimStyleEnums.Key.LeftSquareBracket);
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.SLB', () => {
        if (isJisKeyboard) {
            // JIS: 到達しない
            vim.PushKey(VimStyleEnums.Key.LeftCurlyBracket);
        } else {
            // US :
            vim.PushKey(VimStyleEnums.Key.LeftCurlyBracket);
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.RB', () => {
        if (isJisKeyboard) {
            // JIS: ]
            vim.PushKey(VimStyleEnums.Key.RightSquareBracket);
        } else {
            // US :
            vim.PushKey(VimStyleEnums.Key.RightSquareBracket);
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.SRB', () => {
        if (isJisKeyboard) {
            // JIS: Shift+](})
            vim.PushKey(VimStyleEnums.Key.RightCurlyBracket);
        } else {
            // US : 
            vim.PushKey(VimStyleEnums.Key.RightCurlyBracket);
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.RS', () => {
        if (isJisKeyboard) {
            // JIS: 動作しない
            vim.PushKey(VimStyleEnums.Key.ReverseSolidus);
        } else {
            vim.PushKey(VimStyleEnums.Key.ReverseSolidus);
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.SRS', () => {
        if(isJisKeyboard){
            // JIS: 動作しない
            vim.PushKey(VimStyleEnums.Key.VerticalLine);
        }else{
            vim.PushKey(VimStyleEnums.Key.VerticalLine);
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.Sc', () => {
        // JIS: ;
        // US : 
        vim.PushKey(VimStyleEnums.Key.Semicolon);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.SSc', () => {
        if (isJisKeyboard) {
            // JIS: 到達しない
            vim.PushKey(VimStyleEnums.Key.Plus);
        } else {
            // US :
            vim.PushKey(VimStyleEnums.Key.Colon);
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.Ap', () => {
        if (isJisKeyboard) {
            // JIS: 到達しない！
            vim.PushKey(VimStyleEnums.Key.Apostrophe);
        } else {
            // US :
            vim.PushKey(VimStyleEnums.Key.Apostrophe);
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.SAp', () => {
        if (isJisKeyboard) {
            // JIS: Shift+2(")
            //      SHift+7(') BUG?
            vim.PushKey(VimStyleEnums.Key.Quotation);
        } else {
            // US :
            vim.PushKey(VimStyleEnums.Key.Quotation);
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.Cm', () => {
        // JIS: ,
        // US :
        vim.PushKey(VimStyleEnums.Key.Comma);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.LT', () => {
        // JIS: Shift+.(<)
        // US :
        vim.PushKey(VimStyleEnums.Key.LessThan);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.Pd', () => {
        // JIS: .
        // US :
        vim.PushKey(VimStyleEnums.Key.Period);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.SPd', () => {
        // JIS: Shift+.(>)
        // US :
        vim.PushKey(VimStyleEnums.Key.GreaterThan);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.Sl', () => {
        // JIS: /
        // US :
        vim.PushKey(VimStyleEnums.Key.Solidus);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.SSl', () => {
        // JIS: Shift+/(?)
        // US :
        vim.PushKey(VimStyleEnums.Key.Question);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('vim.Sp', () => {
        // JIS: 到達しない BUG!
        // US : 
        vim.PushKey(VimStyleEnums.Key.Space);
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
