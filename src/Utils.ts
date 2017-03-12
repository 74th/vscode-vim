
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

/**
 * isNumber: Check if value is a number, including
 * the number 0.
 */
export function isNumber(val) {
    let res = parseInt(val, 10);
    return isNaN ? null : res;
}

export function KeyToNum(key: Key): number {
    let num = key.charCodeAt(0) - 0x30;
    if (num < 0 || 9 < num) {
        return NaN;
    }
    return num;
}

export function GetKeyType(key: Key): VimKeyType {
    let charCode = key.charCodeAt(0);
    if (charCode <= 0x2F) {
        // ! - /
        return VimKeyType.Mark;
    }
    if (charCode <= 0x39) {
        // 0 - 9
        return VimKeyType.Number;
    }
    if (charCode <= 0x40) {
        // : - @
        return VimKeyType.Number;
    }
    if (charCode <= 0x5A) {
        // A - Z
        return VimKeyType.Charactor;
    }
    if (charCode <= 0x60) {
        // [ - `
        return VimKeyType.Mark;
    }
    if (charCode <= 0x7A) {
        // a - z
        return VimKeyType.Charactor;
    }
    return VimKeyType.Mark;
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
    if (charCode <= 0x5D) {
        // [ - ^
        return CharGroup.Marks;
    }
    if (charCode === 0x5F) {
        // _
        return CharGroup.AlphabetAndNumber;
    }
    if (charCode === 0x60) {
        // `
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
    for (let char of text) {
        if (char === "\t") {
            tabCount++;
        } else {
            break;
        }
    }
    return (tabSize - 1) * tabCount + systemPosition;
}

export function CalcSystemPosition(visualPosition: number, text: string, tabSize: number): number {
    let tabCount = 0;
    for (let char of text) {
        if (char === "\t") {
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
