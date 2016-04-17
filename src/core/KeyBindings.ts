class KeyBindings implements IKeyBindings {
    AtStart: { [key: string]: IVimStyleCommand };
    FirstNum: { [key: string]: IVimStyleCommand };
    RequireMotion: { [key: string]: IVimStyleCommand };
    RequireMotionNum: { [key: string]: IVimStyleCommand };
    SmallG: { [key: string]: IVimStyleCommand };
    SmallGForMotion: { [key: string]: IVimStyleCommand };
    VisualMode: { [key: string]: IVimStyleCommand };
    VisualLineMode: { [key: string]: IVimStyleCommand };
}

function applyKeyBindingsByEachState(dest: { [key: string]: IVimStyleCommand }, src: { [key: string]: IVimStyleCommand }) {
    let key: string;
    for (key in src) {
        dest[key] = src[key];
    }
}
function applyKeyBindings(dest: IKeyBindings, src: IKeyBindings) {
    if (dest.AtStart) {
        applyKeyBindingsByEachState(dest.AtStart, src.AtStart);
    }
    if (dest.FirstNum) {
        applyKeyBindingsByEachState(dest.FirstNum, src.FirstNum);
    }
    if (dest.RequireMotion) {
        applyKeyBindingsByEachState(dest.RequireMotion, src.RequireMotion);
    }
    if (dest.RequireMotionNum) {
        applyKeyBindingsByEachState(dest.RequireMotionNum, src.RequireMotionNum);
    }
    if (dest.SmallG) {
        applyKeyBindingsByEachState(dest.SmallG, src.SmallG);
    }
    if (dest.SmallGForMotion) {
        applyKeyBindingsByEachState(dest.SmallGForMotion, src.SmallGForMotion);
    }
    if (dest.VisualMode) {
        applyKeyBindingsByEachState(dest.VisualMode, src.VisualMode);
    }
    if (dest.VisualLineMode) {
        applyKeyBindingsByEachState(dest.VisualLineMode, src.VisualLineMode);
    }
}

const DefaultKeyBindings: IKeyBindings = {
    AtStart: {
        "a": {
            cmd: VimCommand.appendCurrentPositionAction
        },
        "A": {
            cmd: VimCommand.appendEndAction
        },
        "b": {
            cmd: VimCommand.moveBackWordAction,
            isReverse: true
        },
        "B": {
            cmd: VimCommand.moveBackWORDAction,
            isReverse: true
        },
        "c": {
            state: StateName.RequireMotion,
            cmd: VimCommand.changeAction
        },
        "C": {
            cmd: VimCommand.changeToEndAction
        },
        "d": {
            cmd: VimCommand.deleteAction,
            state: StateName.RequireMotion
        },
        "D": {
            cmd: VimCommand.deleteToEndAction
        },
        "e" : {
            cmd: VimCommand.moveWordEndAction
        },
        "E": {
            cmd: VimCommand.moveWORDEndAction
        },
        "f": {
            cmd: VimCommand.moveFindCharacterAction,
            state: StateName.RequireCharForMotion
        },
        "F": {
            cmd: VimCommand.moveFindCharacterAction,
            isReverse: true,
            state: StateName.RequireCharForMotion
        },
        "g": {
            cmd: VimCommand.nothing,
            state: StateName.SmallG
        },
        "G": {
            cmd: VimCommand.moveLastLineAction,
        },
        "h": {
            cmd: VimCommand.moveRightAction,
            isReverse: true
        },
        // H no function
        "i": {
            cmd: VimCommand.insertCurrentPositionAction
        },
        "I": {
            cmd: VimCommand.insertHomeAction
        },
        "j": {
            cmd: VimCommand.moveLineAction
        },
        // J
        "k": {
            cmd: VimCommand.moveLineAction,
            isReverse: true
        },
        // K no function
        "l": {
            cmd: VimCommand.moveRightAction
        },
        // L no function
        "o": {
            cmd: VimCommand.insertLineBelowAction
        },
        "O": {
            cmd: VimCommand.insertLineBelowAction,
            isReverse: true
        },
        "p": {
            cmd: VimCommand.pasteBelowAction
        },
        "P": {
            cmd: VimCommand.pasteBelowAction,
            isReverse: true
        },
        // q low priority
        // Q never support
        // r
        // R low priority
        "s": {
            cmd: VimCommand.changeCharacterAction
        },
        "S": {
            cmd: VimCommand.changeLineAction
        },
        "t": {
            cmd: VimCommand.moveTillCharacterAction,
            state: StateName.RequireCharForMotion
        },
        "T": {
            cmd: VimCommand.moveTillCharacterAction,
            isReverse: true,
            state: StateName.RequireCharForMotion
        },
        // u low priority
        // U low priority
        "v": {
            cmd: VimCommand.enterVisualModeAction
        },
        "V": {
            cmd: VimCommand.enterVisualLineModeAction
        },
        "w": {
            cmd: VimCommand.moveWordAction
        },
        "W": {
            cmd: VimCommand.moveWORDAction
        },
        "x": {
            cmd: VimCommand.deleteCharacterAction
        },
        "X": {
            cmd: VimCommand.deleteCharacterAction,
            isReverse: true
        },
        "y": {
            cmd: VimCommand.yancAction,
            state: StateName.RequireMotion
        },
        "Y": {
            cmd: VimCommand.yancToEndAction
        },
        // z never suppoer
        // Z no function
        "0": {
            cmd: VimCommand.moveHomeAction
        },
        "1": {
            cmd: VimCommand.stackNumber,
            state: StateName.FirstNum
        },
        "2": {
            cmd: VimCommand.stackNumber,
            state: StateName.FirstNum
        },
        "3": {
            cmd: VimCommand.stackNumber,
            state: StateName.FirstNum
        },
        "4": {
            cmd: VimCommand.stackNumber,
            state: StateName.FirstNum
        },
        "5": {
            cmd: VimCommand.stackNumber,
            state: StateName.FirstNum
        },
        "6": {
            cmd: VimCommand.stackNumber,
            state: StateName.FirstNum
        },
        "7": {
            cmd: VimCommand.stackNumber,
            state: StateName.FirstNum
        },
        "8": {
            cmd: VimCommand.stackNumber,
            state: StateName.FirstNum
        },
        "9": {
            cmd: VimCommand.stackNumber,
            state: StateName.FirstNum
        },
        "$": {
            cmd: VimCommand.moveEndAction
        },
        "^": {
            cmd: VimCommand.moveFirstNonBlankCharAction
        },
        ".": {
            cmd: VimCommand.repeat
        }
    },

    // Nx
    FirstNum: {
        // Na low priority
        // NA low priority
        "b": {
            cmd: VimCommand.moveBackWordAction
        },
        "B": {
            cmd: VimCommand.moveBackWORDAction
        },
        // B
        // Nc low priority
        // NC low priority
        "d": {
            cmd: VimCommand.deleteAction,
            state: StateName.RequireMotion
        },
        // ND low priority
        "e": {
            cmd: VimCommand.moveWordEndAction
        },
        "E": {
            cmd: VimCommand.moveWORDEndAction
        },
        "f": {
            cmd: VimCommand.moveFindCharacterAction,
            state: StateName.RequireCharForMotion
        },
        "F": {
            cmd: VimCommand.moveFindCharacterAction,
            isReverse: true,
            state: StateName.RequireCharForMotion
        },
        // Ng
        "G": {
            cmd: VimCommand.moveGotoLineAction
        },
        "h": {
            cmd: VimCommand.moveRightAction,
            isReverse: true
        },
        // NH no function
        // Ni low priority
        // NI low priority
        "j": {
            cmd: VimCommand.moveLineAction
        },
        // NJ
        "k": {
            cmd: VimCommand.moveLineAction,
            isReverse: true
        },
        // K no function
        "l": {
            cmd: VimCommand.moveRightAction
        },
        // L no function
        // No low priority
        // NO low priority
        // Np low priority
        // NP low priotity
        // Nq low priority
        // NQ never support
        // Nr
        // NR low priority
        // Ns low priority
        // NS low priority
        "t": {
            cmd: VimCommand.moveTillCharacterAction,
            state: StateName.RequireCharForMotion
        },
        "T": {
            cmd: VimCommand.moveTillCharacterAction,
            isReverse: true,
            state: StateName.RequireCharForMotion
        },
        // u low priority
        // U low priority
        // Nv?
        // NV?
        "w": {
            cmd: VimCommand.moveWordAction
        },
        "W": {
            cmd: VimCommand.moveWORDAction
        },
        "x": {
            cmd: VimCommand.deleteCharacterAction
        },
        // NX
        "y": {
            cmd: VimCommand.yancAction,
            state: StateName.RequireMotion
        },
        "Y": {
            cmd: VimCommand.yancToEndAction
        },
        // Nz never support
        // NZ no function
        "0": {
            cmd: VimCommand.stackNumber,
            state: StateName.FirstNum
        },
        "1": {
            cmd: VimCommand.stackNumber,
            state: StateName.FirstNum
        },
        "2": {
            cmd: VimCommand.stackNumber,
            state: StateName.FirstNum
        },
        "3": {
            cmd: VimCommand.stackNumber,
            state: StateName.FirstNum
        },
        "4": {
            cmd: VimCommand.stackNumber,
            state: StateName.FirstNum
        },
        "5": {
            cmd: VimCommand.stackNumber,
            state: StateName.FirstNum
        },
        "6": {
            cmd: VimCommand.stackNumber,
            state: StateName.FirstNum
        },
        "7": {
            cmd: VimCommand.stackNumber,
            state: StateName.FirstNum
        },
        "8": {
            cmd: VimCommand.stackNumber,
            state: StateName.FirstNum
        },
        "9": {
            cmd: VimCommand.stackNumber,
            state: StateName.FirstNum
        },
        // $ ?
    },

    // cm
    RequireMotion: {
        // da
        // dA
        "b": {
            cmd: VimCommand.wordMotion,
            isReverse: true
        },
        "B": {
            cmd: VimCommand.WORDMotion,
            isReverse: true
        },
        "c": {
            cmd: VimCommand.doActionAtCurrentLine
        },
        // C no command
        "d": {
            cmd: VimCommand.doActionAtCurrentLine
        },
        // D no command
        "e": {
            cmd: VimCommand.wordEndMotion
        },
        "E": {
            cmd: VimCommand.WORDEndMotion
        },
        "f": {
            cmd: VimCommand.findCharacterMotion,
            state: StateName.RequireCharForMotion
        },
        "F": {
            cmd: VimCommand.findCharacterMotion,
            isReverse: true,
            state: StateName.RequireCharForMotion
        },
        "g": {
            cmd: VimCommand.nothing,
            state: StateName.SmallGForMotion
        },
        "G": {
            cmd: VimCommand.lastLineMotion,
        },
        "h": {
            cmd: VimCommand.rightMotion,
            isReverse: true
        },
        // H no function
        // i
        // I
        "j": {
            cmd: VimCommand.lineMotion
        },
        // J
        "k": {
            cmd: VimCommand.lineMotion,
            isReverse: true
        },
        // K no function
        "l": {
            cmd: VimCommand.rightMotion
        },
        // L no function
        // o never support
        // O no function
        // p never support
        // P no function
        // q no function
        // Q no function
        // r no function
        // R low priority
        // s ?
        // S ?
        "t": {
            cmd: VimCommand.tillCharacterMotion,
            state: StateName.RequireCharForMotion
        },
        "T": {
            cmd: VimCommand.tillCharacterMotion,
            isReverse: true,
            state: StateName.RequireCharForMotion
        },
        // u low priority
        // U low priority
        // v low priority
        // V low priority
        "w": {
            cmd: VimCommand.wordMotion
        },
        "W": {
            cmd: VimCommand.WORDMotion
        },
        // x no function
        // X no function
        "y": {
            cmd: VimCommand.doActionAtCurrentLine
        },
        "Y": {
            cmd: VimCommand.yancToEndAction
        },
        // z never suppoer
        // Z no function
        "0": {
            cmd: VimCommand.homeMotion
        },
        "1": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "2": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "3": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "4": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "5": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "6": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "7": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "8": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "9": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "$": {
            cmd: VimCommand.endMotion
        },
        "^": {
            cmd: VimCommand.firstNonBlankCharMotion
        }
    },

    // cNm
    RequireMotionNum: {
        // da
        // dA
        "b": {
            cmd: VimCommand.wordMotion,
            isReverse: true
        },
        // B
        "c": {
            cmd: VimCommand.doActionAtCurrentLine
        },
        // C no command
        "d": {
            cmd: VimCommand.doActionAtCurrentLine
        },
        // D no command
        // e
        // E
        "f": {
            cmd: VimCommand.findCharacterMotion,
            state: StateName.RequireCharForMotion
        },
        "F": {
            cmd: VimCommand.findCharacterMotion,
            isReverse: true,
            state: StateName.RequireCharForMotion
        },
        // g
        "G": {
            cmd: VimCommand.gotoLineMotion
        },
        "h": {
            cmd: VimCommand.rightMotion,
            isReverse: true
        },
        // H no function
        // i
        // I
        "j": {
            cmd: VimCommand.lineMotion
        },
        // J
        "k": {
            cmd: VimCommand.lineMotion,
            isReverse: true
        },
        // K no function
        "l": {
            cmd: VimCommand.rightMotion
        },
        // L no function
        // o never support
        // O no function
        // p never support
        // P no function
        // q no function
        // Q no function
        // r no function
        // R low priority
        // s ?
        // S ?
        "t": {
            cmd: VimCommand.findCharacterMotion,
            state: StateName.RequireCharForMotion
        },
        "T": {
            cmd: VimCommand.tillCharacterMotion,
            isReverse: true,
            state: StateName.RequireCharForMotion
        },
        // u low priority
        // U low priority
        // v low priority
        // V low priority
        "w": {
            cmd: VimCommand.wordMotion
        },
        // W
        // x no function
        // X no function
        "y": {
            cmd: VimCommand.doActionAtCurrentLine
        },
        // Y ?
        // z never suppoer
        // Z no function
        "0": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "1": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "2": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "3": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "4": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "5": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "6": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "7": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "8": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "9": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        // $?
    },

    // g
    SmallG: {
        "g": {
            cmd: VimCommand.moveFirstLineAction
        }
    },

    // cg
    SmallGForMotion: {
        "g": {
            cmd: VimCommand.firstLineMotion
        }
    },

    // v
    VisualMode: {
        // v..a
        // v..A
        "b": {
            cmd: VimCommand.wordMotion,
            isReverse: true
        },
        // v..B
        "c": {
            cmd: VimCommand.changeSelectionAction
        },
        // C no command
        "d": {
            cmd: VimCommand.deleteSelectionAction
        },
        // D no command
        // v..e
        // V..E
        "f": {
            cmd: VimCommand.findCharacterMotion,
            state: StateName.RequireCharForMotion
        },
        "F": {
            cmd: VimCommand.findCharacterMotion,
            isReverse: true,
            state: StateName.RequireCharForMotion
        },
        "g": {
            cmd: VimCommand.nothing,
            state: StateName.SmallGForMotion
        },
        "G": {
            cmd: VimCommand.lastLineMotion,
        },
        "h": {
            cmd: VimCommand.rightMotion,
            isReverse: true
        },
        // H no function
        // v..i
        // v..I
        "j": {
            cmd: VimCommand.lineMotion
        },
        // J?
        "k": {
            cmd: VimCommand.lineMotion,
            isReverse: true
        },
        // K no function
        "l": {
            cmd: VimCommand.rightMotion
        },
        // l no function
        // o never support
        // O no function
        // p never support
        // P no function
        // q no function
        // Q no function
        // r no function
        // R low priority
        // s ?
        // S ?
        "t": {
            cmd: VimCommand.tillCharacterMotion,
            state: StateName.RequireCharForMotion
        },
        "T": {
            cmd: VimCommand.tillCharacterMotion,
            isReverse: true,
            state: StateName.RequireCharForMotion
        },
        // u low priority
        // U low priority
        // v low priority
        // V low priority
        "w": {
            cmd: VimCommand.wordMotion
        },
        // W
        // x no function
        // X no function
        "y": {
            cmd: VimCommand.yancSelectionAction
        },
        "0": {
            cmd: VimCommand.homeMotion
        },
        "1": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "2": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "3": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "4": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "5": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "6": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "7": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "8": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "9": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "$": {
            cmd: VimCommand.endMotion
        }
    },

    // V
    VisualLineMode: {
        // V..a
        // V..A
        "b": {
            cmd: VimCommand.wordMotion,
            isReverse: true
        },
        // V..B
        "c": {
            cmd: VimCommand.changeLineSelectionAction
        },
        // V..C no command
        "d": {
            cmd: VimCommand.deleteLineSelectionAction
        },
        // V..D no command
        // V..e
        // V..E
        // V..f
        // V..F
        "g": {
            cmd: VimCommand.nothing,
            state: StateName.SmallGForMotion
        },
        "G": {
            cmd: VimCommand.lastLineMotion,
        },
        // V..h
        // V..H no function
        // V..i
        // V..I
        "j": {
            cmd: VimCommand.lineMotion
        },
        // V..J?
        "k": {
            cmd: VimCommand.lineMotion,
            isReverse: true
        },
        // V..K no function
        // V..l
        // V..L no function
        // V..o never support
        // V..O no function
        // V..p never support
        // V..P no function
        // V..q no function
        // V..Q no function
        // V..r no function
        // V..R low priority
        // V..s ?
        // V..S ?
        // V..t ?
        // V..T ?
        // u low priority
        // U low priority
        // V..v low priority
        // V..V back to normal mode
        // V..w
        // v..W
        // x no function
        // X no function
        "y": {
            cmd: VimCommand.yancLineSelectionAction
        },
        "0": {
            cmd: VimCommand.homeMotion
        },
        "1": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "2": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "3": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "4": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "5": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "6": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "7": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "8": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        "9": {
            cmd: VimCommand.stackNumber,
            state: StateName.RequireMotionNum
        },
        // V..$
    },
};

// move a cursur by jkl; keys
const ErgonomicKeyBindings: IKeyBindings = {
    AtStart: {
        "j": DefaultKeyBindings.AtStart["h"],
        "k": DefaultKeyBindings.AtStart["j"],
        "l": DefaultKeyBindings.AtStart["k"],
        ";": DefaultKeyBindings.AtStart["l"]
    },
    FirstNum: null,
    RequireMotion: {
        "j": DefaultKeyBindings.RequireMotion["h"],
        "k": DefaultKeyBindings.RequireMotion["j"],
        "l": DefaultKeyBindings.RequireMotion["k"],
        ";": DefaultKeyBindings.RequireMotion["l"]
    },
    RequireMotionNum: null,
    SmallG: null,
    SmallGForMotion: null,
    VisualMode: {
        "j": DefaultKeyBindings.VisualMode["h"],
        "k": DefaultKeyBindings.VisualMode["j"],
        "l": DefaultKeyBindings.VisualMode["k"],
        ";": DefaultKeyBindings.VisualMode["l"]
    },
    VisualLineMode: {
        "j": DefaultKeyBindings.VisualMode["h"],
        "k": DefaultKeyBindings.VisualMode["j"],
        "l": DefaultKeyBindings.VisualMode["k"],
        ";": DefaultKeyBindings.VisualMode["l"]
    },
};

export function LoadKeyBindings(opts: IVimStyleOptions): IKeyBindings {
    let bindings: IKeyBindings = {
        AtStart: {},
        FirstNum: {},
        RequireMotion: {},
        RequireMotionNum: {},
        SmallG: {},
        SmallGForMotion: {},
        VisualMode: {},
        VisualLineMode: {}
    };
    let key: string;
    applyKeyBindings(bindings, DefaultKeyBindings);
    if (opts.useErgonomicKeyForMotion) {
        applyKeyBindings(bindings, ErgonomicKeyBindings);
    }
    return bindings;
}