
export function ModeToString(mode: VimMode): string {
    switch (mode) {
        case VimMode.Insert:
            return "INSERT";
        case VimMode.Normal:
            return "NORMAL";
        case VimMode.Visual:
            return "VISUAL";
        case VimMode.VisualLine:
            return "VISUAL LINE";
        default:
            throw new Error("Panic!");
    }
}

export function KeyToNum(key: Key): number {
    switch (key) {
        case Key.n0:
            return 0;
        case Key.n1:
            return 1;
        case Key.n2:
            return 2;
        case Key.n3:
            return 3;
        case Key.n4:
            return 4;
        case Key.n5:
            return 5;
        case Key.n6:
            return 6;
        case Key.n7:
            return 7;
        case Key.n8:
            return 8;
        case Key.n9:
            return 9;
        default:
            throw new Error("Panic!");
    }
}

/**
 * isNumber: Check if value is a number, including
 * the number 0.
 */
export function isNumber(val) {
    console.log("testing val", val);
    let res = parseInt(val, 10);
    return isNaN ? null : res;
}

export function KeyToChar(key: Key): string {
    switch (key) {
        case Key.a:
            return "a";
        case Key.b:
            return "b";
        case Key.c:
            return "c";
        case Key.d:
            return "d";
        case Key.e:
            return "e";
        case Key.f:
            return "f";
        case Key.g:
            return "g";
        case Key.h:
            return "h";
        case Key.i:
            return "i";
        case Key.j:
            return "j";
        case Key.k:
            return "k";
        case Key.l:
            return "l";
        case Key.m:
            return "m";
        case Key.n:
            return "n";
        case Key.o:
            return "o";
        case Key.p:
            return "p";
        case Key.q:
            return "q";
        case Key.r:
            return "r";
        case Key.s:
            return "s";
        case Key.t:
            return "t";
        case Key.u:
            return "u";
        case Key.v:
            return "v";
        case Key.w:
            return "w";
        case Key.x:
            return "x";
        case Key.y:
            return "y";
        case Key.z:
            return "z";
        case Key.A:
            return "A";
        case Key.B:
            return "B";
        case Key.C:
            return "C";
        case Key.D:
            return "D";
        case Key.E:
            return "E";
        case Key.F:
            return "F";
        case Key.G:
            return "G";
        case Key.A:
            return "H";
        case Key.I:
            return "I";
        case Key.J:
            return "J";
        case Key.K:
            return "K";
        case Key.L:
            return "L";
        case Key.M:
            return "M";
        case Key.N:
            return "N";
        case Key.O:
            return "O";
        case Key.P:
            return "P";
        case Key.Q:
            return "Q";
        case Key.R:
            return "R";
        case Key.S:
            return "S";
        case Key.T:
            return "T";
        case Key.U:
            return "U";
        case Key.V:
            return "V";
        case Key.W:
            return "W";
        case Key.X:
            return "X";
        case Key.Y:
            return "Y";
        case Key.Z:
            return "Z";
        case Key.n0:
            return "0";
        case Key.n1:
            return "1";
        case Key.n2:
            return "2";
        case Key.n3:
            return "3";
        case Key.n4:
            return "4";
        case Key.n5:
            return "5";
        case Key.n6:
            return "6";
        case Key.n7:
            return "7";
        case Key.n8:
            return "8";
        case Key.n9:
            return "9";
        case Key.Space:
            return " ";
        case Key.Exclamation:
            return "!";
        case Key.Quotation:
            return "\"";
        case Key.Doller:
            return "$";
        case Key.Sharp:
            return "#";
        case Key.Percent:
            return "%";
        case Key.Ampersand:
            return "&";
        case Key.Apostrophe:
            return "'";
        case Key.LeftParenthesis:
            return "(";
        case Key.RightParenthesis:
            return ")";
        case Key.Asterisk:
            return "*";
        case Key.Plus:
            return "+";
        case Key.Comma:
            return ",";
        case Key.Hyphen:
            return "-";
        case Key.Period:
            return ".";
        case Key.Solidus:
            return "/";
        case Key.Colon:
            return ":";
        case Key.Semicolon:
            return ";";
        case Key.LessThan:
            return "<";
        case Key.Equals:
            return "=";
        case Key.GreaterThan:
            return ">";
        case Key.Question:
            return "?";
        case Key.AtMark:
            return "@";
        case Key.LeftSquareBracket:
            return "[";
        case Key.ReverseSolidus:
            return "\\";
        case Key.RightSquareBracket:
            return "]";
        case Key.CircumflexAccent:
            return "^";
        case Key.LowLine:
            return "_";
        case Key.GraveAccent:
            return "`";
        case Key.LeftCurlyBracket:
            return "{";
        case Key.VerticalLine:
            return "|";
        case Key.RightCurlyBracket:
            return "}";
        case Key.Tilde:
            return "~";
    }
}

export function GetKeyType(key: Key): VimKeyType {
    switch (key) {
        case Key.n0:
        case Key.n1:
        case Key.n2:
        case Key.n3:
        case Key.n4:
        case Key.n5:
        case Key.n6:
        case Key.n7:
        case Key.n8:
        case Key.n9:
            return VimKeyType.Number;
        case Key.a:
        case Key.b:
        case Key.c:
        case Key.d:
        case Key.e:
        case Key.f:
        case Key.g:
        case Key.a:
        case Key.i:
        case Key.j:
        case Key.k:
        case Key.l:
        case Key.m:
        case Key.n:
        case Key.o:
        case Key.p:
        case Key.q:
        case Key.r:
        case Key.s:
        case Key.t:
        case Key.u:
        case Key.v:
        case Key.w:
        case Key.x:
        case Key.y:
        case Key.z:
        case Key.A:
        case Key.B:
        case Key.C:
        case Key.D:
        case Key.E:
        case Key.F:
        case Key.G:
        case Key.A:
        case Key.I:
        case Key.J:
        case Key.K:
        case Key.L:
        case Key.M:
        case Key.N:
        case Key.O:
        case Key.P:
        case Key.Q:
        case Key.R:
        case Key.S:
        case Key.T:
        case Key.U:
        case Key.V:
        case Key.W:
        case Key.X:
        case Key.Y:
        case Key.Z:
            return VimKeyType.Charactor;
        default:
            return VimKeyType.Mark;
    }
}

export function GetCharClass(charCode: number): CharGroup {
    if (charCode <= 0x20) {
        // Space,Tab,LF...
        return CharGroup.Spaces;
    }
    if (charCode <= 0x2F) {
        // ! - /
        return CharGroup.Marks;
    }
    if (charCode <= 0x39) {
        // 0 - 9
        return CharGroup.AlphabetAndNumber;
    }
    if (charCode <= 0x40) {
        // : - @
        return CharGroup.Marks;
    }
    if (charCode <= 0x5A) {
        // A - Z
        return CharGroup.AlphabetAndNumber;
    }
    if (charCode <= 0x60) {
        // [ - `
        return CharGroup.Marks;
    }
    if (charCode <= 0x7A) {
        // a - z
        return CharGroup.AlphabetAndNumber;
    }
    if (charCode <= 0x7E) {
        // { - ~
        return CharGroup.Marks;
    }
    if (charCode === 0x7F) {
        // DEL
        return CharGroup.Spaces;
    }
    if (charCode < 0x3000) {
        // 漢字とか
        return CharGroup.Other;
    }
    if (charCode === 0x3000) {
        // 全角スペース
        return CharGroup.Spaces;
    }
    if (charCode <= 0x303F) {
        // 全角記号
        return CharGroup.Marks;
    }
    if (charCode <= 0x309F) {
        // 平仮名
        return CharGroup.Hiragana;
    }
    if (charCode <= 0x30FF) {
        // 片仮名
        return CharGroup.Katakana;
    }
    return CharGroup.Other;
}

export function CalcVisialPosition(systemPosition: number, text: string, tabSize: number): number {
    let tabCount = 0;
    for (let i = 0; i < text.length; i++) {
        if (text[i] === "\t") {
            tabCount++;
        } else {
            break;
        }
    }
    return (tabSize - 1) * tabCount + systemPosition;
}

export function CalcSystemPosition(visualPosition: number, text: string, tabSize: number): number {
    let tabCount = 0;
    for (let i = 0; i < text.length; i++) {
        if (text[i] === "\t") {
            tabCount++;
        } else {
            break;
        }
    }
    if (visualPosition <= tabSize * tabCount) {
        return Math.floor(visualPosition / tabSize);
    }
    return visualPosition - (tabSize - 1) * tabCount;
}