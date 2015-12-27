class KeyBindings implements IKeyBindings {
    AtStart: { [key: string]: IVimStyleCommand };
    FirstNum: { [key: string]: IVimStyleCommand };
    RequireMotion: { [key: string]: IVimStyleCommand };
    RequireMotionNum: { [key: string]: IVimStyleCommand };
    SmallG: { [key: string]: IVimStyleCommand };
    SmallGForMotion: { [key: string]: IVimStyleCommand };
    VisualMode: { [key: string]: IVimStyleCommand };
}

function applyKeyBindingsByEachState(dest: { [key: string]: IVimStyleCommand }, src: { [key: string]: IVimStyleCommand }) {
    var key: string;
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
            cmd: CommandName.moveWordAction,
            isReverse: true
        },
        // B
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
        // e
        // E
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
        // V low priority
        "w": {
            cmd: CommandName.moveWordAction
        },
        // W
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
        }
    },

    // Nx
    FirstNum: {
        // Na low priority
        // NA low priority
        "b": {
            cmd: CommandName.moveWordAction,
            isReverse: true
        },
        // B
        // Nc low priority
        // NC low priority
        "d": {
            cmd: CommandName.deleteAction,
            state: StateName.RequireMotion
        },
        // ND low priority
        // Ne
        // NE
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
        // W
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
        "c": {
            cmd: CommandName.changeAction
        },
        "d": {
            cmd: CommandName.deleteAction
        },
        "h": {
            cmd: CommandName.moveRightAction,
            isReverse: true
        },
        "j": {
            cmd: CommandName.moveLineAction
        },
        "k": {
            cmd: CommandName.moveLineAction,
            isReverse: true
        },
        // K no function
        "l": {
            cmd: CommandName.moveRightAction
        },
        "y": {
            cmd: CommandName.yancAction
        }
    }
}

// move a cursur by jkl; keys
const ErgonomicKeyBindings: IKeyBindings = {
    AtStart: {
        'j': DefaultKeyBindings.AtStart['h'],
        'k': DefaultKeyBindings.AtStart['j'],
        'l': DefaultKeyBindings.AtStart['k'],
        ';': DefaultKeyBindings.AtStart['l']
    },
    FirstNum: null,
    RequireMotion: {
        'j': DefaultKeyBindings.RequireMotion['h'],
        'k': DefaultKeyBindings.RequireMotion['j'],
        'l': DefaultKeyBindings.RequireMotion['k'],
        ';': DefaultKeyBindings.RequireMotion['l']
    },
    RequireMotionNum: null,
    SmallG: null,
    SmallGForMotion: null,
    VisualMode: null
}

export function LoadKeyBindings(opts: IVimStyleOptions): IKeyBindings {
    var bindings: IKeyBindings = {
        AtStart: {},
        FirstNum: {},
        RequireMotion: {},
        RequireMotionNum: {},
        SmallG: {},
        SmallGForMotion: {},
        VisualMode: {}
    }
    var key: string;
    applyKeyBindings(bindings, DefaultKeyBindings);
    if (opts.useErgonomicKeyForMotion) {
        applyKeyBindings(bindings, ErgonomicKeyBindings);
    }
    return bindings;
}