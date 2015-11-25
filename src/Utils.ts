import * as Enums from "./VimStyleEnums"

export function KeyToNum(key: Enums.Key): number {
    switch (key) {
        case Enums.Key.n0:
            return 0;
        case Enums.Key.n1:
            return 1;
        case Enums.Key.n2:
            return 2;
        case Enums.Key.n3:
            return 3;
        case Enums.Key.n4:
            return 4;
        case Enums.Key.n5:
            return 5;
        case Enums.Key.n6:
            return 6;
        case Enums.Key.n7:
            return 7;
        case Enums.Key.n8:
            return 8;
        case Enums.Key.n9:
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
    console.log('testing val', val);
    var res = parseInt(val, 10);
    return isNaN ? null : res;
} 

export function KeyToChar(key: Enums.Key): string {
    switch (key) {
        case Enums.Key.a:
            return "a";
        case Enums.Key.b:
            return "b";
        case Enums.Key.c:
            return "c";
        case Enums.Key.d:
            return "d";
        case Enums.Key.e:
            return "e";
        case Enums.Key.f:
            return "f";
        case Enums.Key.g:
            return "g";
        case Enums.Key.h:
            return "h";
        case Enums.Key.i:
            return "i";
        case Enums.Key.j:
            return "j";
        case Enums.Key.k:
            return "k";
        case Enums.Key.l:
            return "l";
        case Enums.Key.m:
            return "m";
        case Enums.Key.n:
            return "n";
        case Enums.Key.o:
            return "o";
        case Enums.Key.p:
            return "p";
        case Enums.Key.q:
            return "q";
        case Enums.Key.r:
            return "r";
        case Enums.Key.s:
            return "s";
        case Enums.Key.t:
            return "t";
        case Enums.Key.u:
            return "u";
        case Enums.Key.v:
            return "v";
        case Enums.Key.w:
            return "w";
        case Enums.Key.x:
            return "x";
        case Enums.Key.y:
            return "y";
        case Enums.Key.z:
            return "z";
        case Enums.Key.A:
            return "A";
        case Enums.Key.B:
            return "B";
        case Enums.Key.C:
            return "C";
        case Enums.Key.D:
            return "D";
        case Enums.Key.E:
            return "E";
        case Enums.Key.F:
            return "F";
        case Enums.Key.G:
            return "G";
        case Enums.Key.A:
            return "H";
        case Enums.Key.I:
            return "I";
        case Enums.Key.J:
            return "J";
        case Enums.Key.K:
            return "K";
        case Enums.Key.L:
            return "L";
        case Enums.Key.M:
            return "M";
        case Enums.Key.N:
            return "N";
        case Enums.Key.O:
            return "O";
        case Enums.Key.P:
            return "P";
        case Enums.Key.Q:
            return "Q";
        case Enums.Key.R:
            return "R";
        case Enums.Key.S:
            return "S";
        case Enums.Key.T:
            return "T";
        case Enums.Key.U:
            return "U";
        case Enums.Key.V:
            return "V";
        case Enums.Key.W:
            return "W";
        case Enums.Key.X:
            return "X";
        case Enums.Key.Y:
            return "Y";
        case Enums.Key.Z:
            return "Z";
        case Enums.Key.n0:
            return "0";
        case Enums.Key.n1:
            return "1";
        case Enums.Key.n2:
            return "2";
        case Enums.Key.n3:
            return "3";
        case Enums.Key.n4:
            return "4";
        case Enums.Key.n5:
            return "5";
        case Enums.Key.n6:
            return "6";
        case Enums.Key.n7:
            return "7";
        case Enums.Key.n8:
            return "8";
        case Enums.Key.n9:
            return "9";
        case Enums.Key.Space:
            return " ";
        case Enums.Key.Exclamation:
            return "!";
        case Enums.Key.Quotation:
            return '"';
        case Enums.Key.Doller:
            return "$";
        case Enums.Key.Sharp:
            return "#";
        case Enums.Key.Percent:
            return "%";
        case Enums.Key.Ampersand:
            return "&";
        case Enums.Key.Apostrophe:
            return "'";
        case Enums.Key.LeftParenthesis:
            return "(";
        case Enums.Key.RightParenthesis:
            return ")";
        case Enums.Key.Asterisk:
            return "*";
        case Enums.Key.Plus:
            return "*";
        case Enums.Key.Comma:
            return ",";
        case Enums.Key.Hyphen:
            return "-";
        case Enums.Key.Period:
            return ".";
        case Enums.Key.Solidus:
            return "/";
        case Enums.Key.Colon:
            return ":";
        case Enums.Key.Semicolon:
            return ";";
        case Enums.Key.LessThan:
            return "<";
        case Enums.Key.Equals:
            return "=";
        case Enums.Key.GreaterThan:
            return ">";
        case Enums.Key.Question:
            return "?";
        case Enums.Key.AtMark:
            return "@";
        case Enums.Key.LeftSquareBracket:
            return "[";
        case Enums.Key.ReverseSolidus:
            return "\\";
        case Enums.Key.RightSquareBracket:
            return "]";
        case Enums.Key.CircumflexAccent:
            return "^";
        case Enums.Key.LowLine:
            return "_";
        case Enums.Key.GraveAccent:
            return "`";
        case Enums.Key.LeftCurlyBracket:
            return "{";
        case Enums.Key.VerticalLine:
            return "|";
        case Enums.Key.RightCurlyBracket:
            return "}";
        case Enums.Key.Tilde:
            return "~";
    }
}

export function GetKeyType(key: Enums.Key): Enums.KeyType {
    switch (key) {
        case Enums.Key.n0:
        case Enums.Key.n1:
        case Enums.Key.n2:
        case Enums.Key.n3:
        case Enums.Key.n4:
        case Enums.Key.n5:
        case Enums.Key.n6:
        case Enums.Key.n7:
        case Enums.Key.n8:
        case Enums.Key.n9:
            return Enums.KeyType.Number;
        case Enums.Key.a:
        case Enums.Key.b:
        case Enums.Key.c:
        case Enums.Key.d:
        case Enums.Key.e:
        case Enums.Key.f:
        case Enums.Key.g:
        case Enums.Key.a:
        case Enums.Key.i:
        case Enums.Key.j:
        case Enums.Key.k:
        case Enums.Key.l:
        case Enums.Key.m:
        case Enums.Key.n:
        case Enums.Key.o:
        case Enums.Key.p:
        case Enums.Key.q:
        case Enums.Key.r:
        case Enums.Key.s:
        case Enums.Key.t:
        case Enums.Key.u:
        case Enums.Key.v:
        case Enums.Key.w:
        case Enums.Key.x:
        case Enums.Key.y:
        case Enums.Key.z:
        case Enums.Key.A:
        case Enums.Key.B:
        case Enums.Key.C:
        case Enums.Key.D:
        case Enums.Key.E:
        case Enums.Key.F:
        case Enums.Key.G:
        case Enums.Key.A:
        case Enums.Key.I:
        case Enums.Key.J:
        case Enums.Key.K:
        case Enums.Key.L:
        case Enums.Key.M:
        case Enums.Key.N:
        case Enums.Key.O:
        case Enums.Key.P:
        case Enums.Key.Q:
        case Enums.Key.R:
        case Enums.Key.S:
        case Enums.Key.T:
        case Enums.Key.U:
        case Enums.Key.V:
        case Enums.Key.W:
        case Enums.Key.X:
        case Enums.Key.Y:
        case Enums.Key.Z:
            return Enums.KeyType.Charactor;
        default:
            return Enums.KeyType.Mark;
    }
}

export function GetCharClass(charCode: number): Enums.CharGroup {
    if (charCode <= 0x20) {
        // Space,Tab,LF...
        return Enums.CharGroup.Spaces;
    }
    if (charCode <= 0x2F) {
        // ! - /
        return Enums.CharGroup.Marks;
    }
    if (charCode <= 0x39) {
        // 0 - 9
        return Enums.CharGroup.AlphabetAndNumber;
    }
    if (charCode <= 0x40) {
        // : - @
        return Enums.CharGroup.Marks;
    }
    if (charCode <= 0x5A) {
        // A - Z
        return Enums.CharGroup.AlphabetAndNumber;
    }
    if (charCode <= 0x60) {
        // [ - `
        return Enums.CharGroup.Marks;
    }
    if (charCode <= 0x7A) {
        // a - z
        return Enums.CharGroup.AlphabetAndNumber;
    }
    if (charCode <= 0x7E) {
        // { - ~
        return Enums.CharGroup.Marks;
    }
    if (charCode == 0x7F) {
        // DEL
        return Enums.CharGroup.Spaces;
    }
    if (charCode < 0x3000) {
        // 漢字とか
        return Enums.CharGroup.Other;
    }
    if (charCode == 0x3000) {
        // 全角スペース
        return Enums.CharGroup.Spaces;
    }
    if (charCode <= 0x303F) {
        // 全角記号
        return Enums.CharGroup.Marks;
    }
    if (charCode <= 0x309F) {
        // 平仮名
        return Enums.CharGroup.Hiragana;
    }
    if (charCode <= 0x30FF) {
        // 片仮名
        return Enums.CharGroup.Katakana;
    }
    return Enums.CharGroup.Other;
}