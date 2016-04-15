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
            cmd: CommandName.appendCurrentPositionAction
        },
        "A": {
            cmd: CommandName.appendEndAction
        },
        "b": {
            cmd: CommandName.moveBackWordAction,
            isReverse: true
        },
        "B": {
            cmd: CommandName.moveBackWORDAction,
            isReverse: true
        },
        "c": {
            state: StateName.RequireMotion,
            cmd: CommandName.changeAction
        },
        "C": {
            cmd: CommandName.changeToEndAction
        },
        "d": {
            cmd: CommandName.deleteAction,
            state: StateName.RequireMotion
        },
        "D": {
            cmd: CommandName.deleteToEndAction
        },
        "e" : {
            cmd: CommandName.moveWordEndAction
        },
        "E": {
            cmd: CommandName.moveWORDEndAction
        },
        "f": {
            cmd: CommandName.moveFindCharacterAction,
            state: StateName.RequireCharForMotion
        },
        "F": {
            cmd: CommandName.moveFindCharacterAction,
            isReverse: true,
            state: StateName.RequireCharForMotion
        },
        "g": {
            cmd: CommandName.nothing,
            state: StateName.SmallG
        },
        "G": {
            cmd: CommandName.moveLastLineAction,
        },
        "h": {
            cmd: CommandName.moveRightAction,
            isReverse: true
        },
        // H no function
        "i": {
            cmd: CommandName.insertCurrentPositionAction
        },
        "I": {
            cmd: CommandName.insertHomeAction
        },
        "j": {
            cmd: CommandName.moveLineAction
        },
        // J
        "k": {
            cmd: CommandName.moveLineAction,
            isReverse: true
        },
        // K no function
        "l": {
            cmd: CommandName.moveRightAction
        },
        // L no function
        "o": {
            cmd: CommandName.insertLineBelowAction
        },
        "O": {
            cmd: CommandName.insertLineBelowAction,
            isReverse: true
        },
        "p": {
            cmd: CommandName.pasteBelowAction
        },
        "P": {
            cmd: CommandName.pasteBelowAction,
            isReverse: true
        },
        // q low priority
        // Q never support
        // r
        // R low priority
        "s": {
            cmd: CommandName.changeCharacterAction
        },
        "S": {
            cmd: CommandName.changeLineAction
        },
        "t": {
            cmd: CommandName.moveTillCharacterAction,
            state: StateName.RequireCharForMotion
        },
        "T": {
            cmd: CommandName.moveTillCharacterAction,
            isReverse: true,
            state: StateName.RequireCharForMotion
        },
        // u low priority
        // U low priority
        "v": {
            cmd: CommandName.enterVisualModeAction
        },
        "V": {
            cmd: CommandName.enterVisualLineModeAction
        },
        "w": {
            cmd: CommandName.moveWordAction
        },
        "W": {
            cmd: CommandName.moveWORDAction
        },
        "x": {
            cmd: CommandName.deleteCharacterAction
        },
        "X": {
            cmd: CommandName.deleteCharacterAction,
            isReverse: true
        },
        "y": {
            cmd: CommandName.yancAction,
            state: StateName.RequireMotion
        },
        "Y": {
            cmd: CommandName.yancToEndAction
        },
        // z never suppoer
        // Z no function
        "0": {
            cmd: CommandName.moveHomeAction
        },
        "1": {
            cmd: CommandName.stackNumber,
            state: StateName.FirstNum
        },
        "2": {
            cmd: CommandName.stackNumber,
            state: StateName.FirstNum
        },
        "3": {
            cmd: CommandName.stackNumber,
            state: StateName.FirstNum
        },
        "4": {
            cmd: CommandName.stackNumber,
            state: StateName.FirstNum
        },
        "5": {
            cmd: CommandName.stackNumber,
            state: StateName.FirstNum
        },
        "6": {
            cmd: CommandName.stackNumber,
            state: StateName.FirstNum
        },
        "7": {
            cmd: CommandName.stackNumber,
            state: StateName.FirstNum
        },
        "8": {
            cmd: CommandName.stackNumber,
            state: StateName.FirstNum
        },
        "9": {
            cmd: CommandName.stackNumber,
            state: StateName.FirstNum
        },
        "$": {
            cmd: CommandName.moveEndAction
        },
        "^": {
            cmd: CommandName.moveFirstNonBlankCharAction
        },
        ".": {
            cmd: CommandName.repeat
        }
    },

    // Nx
    FirstNum: {
        // Na low priority
        // NA low priority
        "b": {
            cmd: CommandName.moveBackWordAction
        },
        "B": {
            cmd: CommandName.moveBackWORDAction
        },
        // B
        // Nc low priority
        // NC low priority
        "d": {
            cmd: CommandName.deleteAction,
            state: StateName.RequireMotion
        },
        // ND low priority
        "e": {
            cmd: CommandName.moveWordEndAction
        },
        "E": {
            cmd: CommandName.moveWORDEndAction
        },
        "f": {
            cmd: CommandName.moveFindCharacterAction,
            state: StateName.RequireCharForMotion
        },
        "F": {
            cmd: CommandName.moveFindCharacterAction,
            isReverse: true,
            state: StateName.RequireCharForMotion
        },
        // Ng
        "G": {
            cmd: CommandName.moveGotoLineAction
        },
        "h": {
            cmd: CommandName.moveRightAction,
            isReverse: true
        },
        // NH no function
        // Ni low priority
        // NI low priority
        "j": {
            cmd: CommandName.moveLineAction
        },
        // NJ
        "k": {
            cmd: CommandName.moveLineAction,
            isReverse: true
        },
        // K no function
        "l": {
            cmd: CommandName.moveRightAction
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
            cmd: CommandName.moveTillCharacterAction,
            state: StateName.RequireCharForMotion
        },
        "T": {
            cmd: CommandName.moveTillCharacterAction,
            isReverse: true,
            state: StateName.RequireCharForMotion
        },
        // u low priority
        // U low priority
        // Nv?
        // NV?
        "w": {
            cmd: CommandName.moveWordAction
        },
        "W": {
            cmd: CommandName.moveWORDAction
        },
        "x": {
            cmd: CommandName.deleteCharacterAction
        },
        // NX
        "y": {
            cmd: CommandName.yancAction,
            state: StateName.RequireMotion
        },
        "Y": {
            cmd: CommandName.yancToEndAction
        },
        // Nz never support
        // NZ no function
        "0": {
            cmd: CommandName.stackNumber,
            state: StateName.FirstNum
        },
        "1": {
            cmd: CommandName.stackNumber,
            state: StateName.FirstNum
        },
        "2": {
            cmd: CommandName.stackNumber,
            state: StateName.FirstNum
        },
        "3": {
            cmd: CommandName.stackNumber,
            state: StateName.FirstNum
        },
        "4": {
            cmd: CommandName.stackNumber,
            state: StateName.FirstNum
        },
        "5": {
            cmd: CommandName.stackNumber,
            state: StateName.FirstNum
        },
        "6": {
            cmd: CommandName.stackNumber,
            state: StateName.FirstNum
        },
        "7": {
            cmd: CommandName.stackNumber,
            state: StateName.FirstNum
        },
        "8": {
            cmd: CommandName.stackNumber,
            state: StateName.FirstNum
        },
        "9": {
            cmd: CommandName.stackNumber,
            state: StateName.FirstNum
        },
        // $ ?
    },

    // cm
    RequireMotion: {
        // da
        // dA
        "b": {
            cmd: CommandName.wordMotion,
            isReverse: true
        },
        "B": {
            cmd: CommandName.WORDMotion,
            isReverse: true
        },
        "c": {
            cmd: CommandName.doActionAtCurrentLine
        },
        // C no command
        "d": {
            cmd: CommandName.doActionAtCurrentLine
        },
        // D no command
        "e": {
            cmd: CommandName.wordEndMotion
        },
        "E": {
            cmd: CommandName.WORDEndMotion
        },
        "f": {
            cmd: CommandName.findCharacterMotion,
            state: StateName.RequireCharForMotion
        },
        "F": {
            cmd: CommandName.findCharacterMotion,
            isReverse: true,
            state: StateName.RequireCharForMotion
        },
        "g": {
            cmd: CommandName.nothing,
            state: StateName.SmallGForMotion
        },
        "G": {
            cmd: CommandName.lastLineMotion,
        },
        "h": {
            cmd: CommandName.rightMotion,
            isReverse: true
        },
        // H no function
        // i
        // I
        "j": {
            cmd: CommandName.lineMotion
        },
        // J
        "k": {
            cmd: CommandName.lineMotion,
            isReverse: true
        },
        // K no function
        "l": {
            cmd: CommandName.rightMotion
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
            cmd: CommandName.tillCharacterMotion,
            state: StateName.RequireCharForMotion
        },
        "T": {
            cmd: CommandName.tillCharacterMotion,
            isReverse: true,
            state: StateName.RequireCharForMotion
        },
        // u low priority
        // U low priority
        // v low priority
        // V low priority
        "w": {
            cmd: CommandName.wordMotion
        },
        "W": {
            cmd: CommandName.WORDMotion
        },
        // x no function
        // X no function
        "y": {
            cmd: CommandName.doActionAtCurrentLine
        },
        "Y": {
            cmd: CommandName.yancToEndAction
        },
        // z never suppoer
        // Z no function
        "0": {
            cmd: CommandName.homeMotion
        },
        "1": {
            cmd: CommandName.stackNumber,
            state: StateName.RequireMotionNum
        },
        "2": {
            cmd: CommandName.stackNumber,
            state: StateName.RequireMotionNum
        },
        "3": {
            cmd: CommandName.stackNumber,
            state: StateName.RequireMotionNum
        },
        "4": {
            cmd: CommandName.stackNumber,
            state: StateName.RequireMotionNum
        },
        "5": {
            cmd: CommandName.stackNumber,
            state: StateName.RequireMotionNum
        },
        "6": {
            cmd: CommandName.stackNumber,
            state: StateName.RequireMotionNum
        },
        "7": {
            cmd: CommandName.stackNumber,
            state: StateName.RequireMotionNum
        },
        "8": {
            cmd: CommandName.stackNumber,
            state: StateName.RequireMotionNum
        },
        "9": {
            cmd: CommandName.stackNumber,
            state: StateName.RequireMotionNum
        },
        "$": {
            cmd: CommandName.endMotion
        },
        "^": {
            cmd: CommandName.firstNonBlankCharMotion
        }
    },

    // cNm
    RequireMotionNum: {
        // da
        // dA
        "b": {
            cmd: CommandName.wordMotion,
            isReverse: true
        },
        // B
        "c": {
            cmd: CommandName.doActionAtCurrentLine
        },
        // C no command
        "d": {
            cmd: CommandName.doActionAtCurrentLine
        },
        // D no command
        // e
        // E
        "f": {
            cmd: CommandName.findCharacterMotion,
            state: StateName.RequireCharForMotion
        },
        "F": {
            cmd: CommandName.findCharacterMotion,
            isReverse: true,
            state: StateName.RequireCharForMotion
        },
        // g
        "G": {
            cmd: CommandName.gotoLineMotion
        },
        "h": {
            cmd: CommandName.rightMotion,
            isReverse: true
        },
        // H no function
        // i
        // I
        "j": {
            cmd: CommandName.lineMotion
        },
        // J
        "k": {
            cmd: CommandName.lineMotion,
            isReverse: true
        },
        // K no function
        "l": {
            cmd: CommandName.rightMotion
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
            cmd: CommandName.findCharacterMotion,
            state: StateName.RequireCharForMotion
        },
        "T": {
            cmd: CommandName.tillCharacterMotion,
            isReverse: true,
            state: StateName.RequireCharForMotion
        },
        // u low priority
        // U low priority
        // v low priority
        // V low priority
        "w": {
            cmd: CommandName.wordMotion
        },
        // W
        // x no function
        // X no function
        "y": {
            cmd: CommandName.doActionAtCurrentLine
        },
        // Y ?
        // z never suppoer
        // Z no function
        "0": {
            cmd: CommandName.stackNumber,
            state: StateName.RequireMotionNum
        },
        "1": {
            cmd: CommandName.stackNumber,
            state: StateName.RequireMotionNum
        },
        "2": {
            cmd: CommandName.stackNumber,
            state: StateName.RequireMotionNum
        },
        "3": {
            cmd: CommandName.stackNumber,
            state: StateName.RequireMotionNum
        },
        "4": {
            cmd: CommandName.stackNumber,
            state: StateName.RequireMotionNum
        },
        "5": {
            cmd: CommandName.stackNumber,
            state: StateName.RequireMotionNum
        },
        "6": {
            cmd: CommandName.stackNumber,
            state: StateName.RequireMotionNum
        },
        "7": {
            cmd: CommandName.stackNumber,
            state: StateName.RequireMotionNum
        },
        "8": {
            cmd: CommandName.stackNumber,
            state: StateName.RequireMotionNum
        },
        "9": {
            cmd: CommandName.stackNumber,
            state: StateName.RequireMotionNum
        },
        // $?
    },

    // g
    SmallG: {
        "g": {
            cmd: CommandName.moveFirstLineAction
        }
    },

    // cg
    SmallGForMotion: {
        "g": {
            cmd: CommandName.firstLineMotion
        }
    },

    // v
    VisualMode: {
        // v..a
        // v..A
        "b": {
            cmd: CommandName.wordMotion,
            isReverse: true
        },
        // v..B
        "c": {
            cmd: CommandName.changeSelectionAction
        },
        // C no command
        "d": {
            cmd: CommandName.deleteSelectionAction
        },
        // D no command
        // v..e
        // V..E
        "f": {
            cmd: CommandName.findCharacterMotion,
            state: StateName.RequireCharForMotion
        },
        "F": {
            cmd: CommandName.findCharacterMotion,
            isReverse: true,
            state: StateName.RequireCharForMotion
        },
        "g": {
            cmd: CommandName.nothing,
            state: StateName.SmallGForMotion
        },
        "G": {
            cmd: CommandName.lastLineMotion,
        },
        "h": {
            cmd: CommandName.rightMotion,
            isReverse: true
        },
        // H no function
        // v..i
        // v..I
        "j": {
            cmd: CommandName.lineMotion
        },
        // J?
        "k": {
            cmd: CommandName.lineMotion,
            isReverse: true
        },
        // K no function
        "l": {
            cmd: CommandName.rightMotion
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
            cmd: CommandName.tillCharacterMotion,
            state: StateName.RequireCharForMotion
        },
        "T": {
            cmd: CommandName.tillCharacterMotion,
            isReverse: true,
            state: StateName.RequireCharForMotion
        },
        // u low priority
        // U low priority
        // v low priority
        // V low priority
        "w": {
            cmd: CommandName.wordMotion
        },
        // W
        // x no function
        // X no function
        "y": {
            cmd: CommandName.yancSelectionAction
        },
        "0": {
            cmd: CommandName.homeMotion
        },
        "1": {
            cmd: CommandName.stackNumber,
            state: StateName.RequireMotionNum
        },
        "2": {
            cmd: CommandName.stackNumber,
            state: StateName.RequireMotionNum
        },
        "3": {
            cmd: CommandName.stackNumber,
            state: StateName.RequireMotionNum
        },
        "4": {
            cmd: CommandName.stackNumber,
            state: StateName.RequireMotionNum
        },
        "5": {
            cmd: CommandName.stackNumber,
            state: StateName.RequireMotionNum
        },
        "6": {
            cmd: CommandName.stackNumber,
            state: StateName.RequireMotionNum
        },
        "7": {
            cmd: CommandName.stackNumber,
            state: StateName.RequireMotionNum
        },
        "8": {
            cmd: CommandName.stackNumber,
            state: StateName.RequireMotionNum
        },
        "9": {
            cmd: CommandName.stackNumber,
            state: StateName.RequireMotionNum
        },
        "$": {
            cmd: CommandName.endMotion
        }
    },

    // V
    VisualLineMode: {
        // V..a
        // V..A
        "b": {
            cmd: CommandName.wordMotion,
            isReverse: true
        },
        // V..B
        "c": {
            cmd: CommandName.changeLineSelectionAction
        },
        // V..C no command
        "d": {
            cmd: CommandName.deleteLineSelectionAction
        },
        // V..D no command
        // V..e
        // V..E
        // V..f
        // V..F
        "g": {
            cmd: CommandName.nothing,
            state: StateName.SmallGForMotion
        },
        "G": {
            cmd: CommandName.lastLineMotion,
        },
        // V..h
        // V..H no function
        // V..i
        // V..I
        "j": {
            cmd: CommandName.lineMotion
        },
        // V..J?
        "k": {
            cmd: CommandName.lineMotion,
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
            cmd: CommandName.yancLineSelectionAction
        },
        "0": {
            cmd: CommandName.homeMotion
        },
        "1": {
            cmd: CommandName.stackNumber,
            state: StateName.RequireMotionNum
        },
        "2": {
            cmd: CommandName.stackNumber,
            state: StateName.RequireMotionNum
        },
        "3": {
            cmd: CommandName.stackNumber,
            state: StateName.RequireMotionNum
        },
        "4": {
            cmd: CommandName.stackNumber,
            state: StateName.RequireMotionNum
        },
        "5": {
            cmd: CommandName.stackNumber,
            state: StateName.RequireMotionNum
        },
        "6": {
            cmd: CommandName.stackNumber,
            state: StateName.RequireMotionNum
        },
        "7": {
            cmd: CommandName.stackNumber,
            state: StateName.RequireMotionNum
        },
        "8": {
            cmd: CommandName.stackNumber,
            state: StateName.RequireMotionNum
        },
        "9": {
            cmd: CommandName.stackNumber,
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