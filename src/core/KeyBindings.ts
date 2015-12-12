
export enum Command {

    // single action
    insertCurrentPositionAction,
    appendCurrentPositionAction,
    insertHomeAction,
    appendEndAction,
    insertLineBelowAction,
    deleteCharacterAction,
    changeCharacterAction,
    changeLineAction,
    pasteBelowAction,

    // move action
    moveRightAction,
    moveLineAction,
    moveWordAction,
    moveHomeAction,
    moveEndAction,
    moveFindCharacterAction,
    moveTillCharacterAction,
    moveGotoLineAction,
    moveLastLineAction,
    moveFirstLineAction,

    // motion
    rightMotion,
    lineMotion,
    wordMotion,
    homeMotion,
    endMotion,
    findCharacterMotion,
    tillCharacterMotion,
    gotoLineMotion,
    lastLineMotion,
    firstLineMotion,

    // delete, yanc, change action
    changeAction,
    deleteAction,
    yancAction,
    changeToEndAction,
    deleteToEndAction,
    yancToEndAction,
    doActionAtCurrentLine,

    // other
    stackNumber,
    nothing
}

export enum State {
    AtStart,
    FirstNum,
    RequireMotion,
    RequireMotionNum,
    RequireCharForMotion,
    SmallG,
    SmallGForMotion,
    Panic
}

export interface IVimStyleCommand {
    state?: State;
    isReverse?: boolean;
    cmd: Command;
}

export namespace KeyBindings {
    export let AtStart: { [key: string]: IVimStyleCommand } = {
        "a": {
            cmd: Command.appendCurrentPositionAction
        },
        "A": {
            cmd: Command.appendEndAction
        },
        "b": {
            cmd: Command.moveWordAction,
            isReverse: true
        },
        // B
        "c": {
            state: State.RequireMotion,
            cmd: Command.changeAction
        },
        "C": {
            cmd: Command.changeToEndAction
        },
        "d": {
            cmd: Command.deleteAction,
            state: State.RequireMotion
        },
        "D": {
            cmd: Command.deleteToEndAction
        },
        // e
        // E
        "f": {
            cmd: Command.moveFindCharacterAction,
            state: State.RequireCharForMotion
        },
        "F": {
            cmd: Command.moveFindCharacterAction,
            isReverse: true,
            state: State.RequireCharForMotion
        },
        "g": {
            cmd: Command.nothing,
            state: State.SmallG
        },
        "G": {
            cmd: Command.moveLastLineAction,
        },
        "h": {
            cmd: Command.moveRightAction,
            isReverse: true
        },
        // H no function
        "i": {
            cmd: Command.insertCurrentPositionAction
        },
        "I": {
            cmd: Command.insertHomeAction
        },
        "j": {
            cmd: Command.moveLineAction
        },
        // J
        "k": {
            cmd: Command.moveLineAction,
            isReverse: true
        },
        // K no function
        "l": {
            cmd: Command.moveRightAction
        },
        // L no function
        "o": {
            cmd: Command.insertLineBelowAction
        },
        "O": {
            cmd: Command.insertLineBelowAction,
            isReverse: true
        },
        "p": {
            cmd: Command.pasteBelowAction
        },
        "P": {
            cmd: Command.pasteBelowAction,
            isReverse: true
        },
        // q low priority
        // Q never support
        // r
        // R low priority
        "s": {
            cmd: Command.changeCharacterAction
        },
        "S": {
            cmd: Command.changeLineAction
        },
        "t": {
            cmd: Command.moveTillCharacterAction,
            state: State.RequireCharForMotion
        },
        "T": {
            cmd: Command.moveTillCharacterAction,
            isReverse: true,
            state: State.RequireCharForMotion
        },
        // u low priority
        // U low priority
        // v low priority
        // V low priority
        "w": {
            cmd: Command.moveWordAction
        },
        // W
        "x": {
            cmd: Command.deleteCharacterAction
        },
        "X": {
            cmd: Command.deleteCharacterAction,
            isReverse: true
        },
        "y": {
            cmd: Command.yancAction,
            state: State.RequireMotion
        },
        "Y": {
            cmd: Command.yancToEndAction
        },
        // z never suppoer
        // Z no function
        "0": {
            cmd: Command.moveHomeAction
        },
        "1": {
            cmd: Command.stackNumber,
            state: State.FirstNum
        },
        "2": {
            cmd: Command.stackNumber,
            state: State.FirstNum
        },
        "3": {
            cmd: Command.stackNumber,
            state: State.FirstNum
        },
        "4": {
            cmd: Command.stackNumber,
            state: State.FirstNum
        },
        "5": {
            cmd: Command.stackNumber,
            state: State.FirstNum
        },
        "6": {
            cmd: Command.stackNumber,
            state: State.FirstNum
        },
        "7": {
            cmd: Command.stackNumber,
            state: State.FirstNum
        },
        "8": {
            cmd: Command.stackNumber,
            state: State.FirstNum
        },
        "9": {
            cmd: Command.stackNumber,
            state: State.FirstNum
        },
        "$": {
            cmd: Command.moveEndAction
        }
    };

    // Nx
    export let FirstNum: { [key: string]: IVimStyleCommand } = {
        // Na low priority
        // NA low priority
        "b": {
            cmd: Command.moveWordAction,
            isReverse: true
        },
        // B
        // Nc low priority
        // NC low priority
        "d": {
            cmd: Command.deleteAction,
            state: State.RequireMotion
        },
        // ND low priority
        // Ne
        // NE
        "f": {
            cmd: Command.moveFindCharacterAction,
            state: State.RequireCharForMotion
        },
        "F": {
            cmd: Command.moveFindCharacterAction,
            isReverse: true,
            state: State.RequireCharForMotion
        },
        // Ng
        "G": {
            cmd: Command.moveGotoLineAction
        },
        "h": {
            cmd: Command.moveRightAction,
            isReverse: true
        },
        // NH no function
        // Ni low priority
        // NI low priority
        "j": {
            cmd: Command.moveLineAction
        },
        // NJ
        "k": {
            cmd: Command.moveLineAction,
            isReverse: true
        },
        // K no function
        "l": {
            cmd: Command.moveRightAction
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
            cmd: Command.moveTillCharacterAction,
            state: State.RequireCharForMotion
        },
        "T": {
            cmd: Command.moveTillCharacterAction,
            isReverse: true,
            state: State.RequireCharForMotion
        },
        // u low priority
        // U low priority
        // Nv?
        // NV?
        "w": {
            cmd: Command.moveWordAction
        },
        "x": {
            cmd: Command.deleteCharacterAction
        },
        // NX
        "y": {
            cmd: Command.yancAction,
            state: State.RequireMotion
        },
        "Y": {
            cmd: Command.yancToEndAction
        },
        // Nz never support
        // NZ no function
        "0": {
            cmd: Command.stackNumber,
            state: State.FirstNum
        },
        "1": {
            cmd: Command.stackNumber,
            state: State.FirstNum
        },
        "2": {
            cmd: Command.stackNumber,
            state: State.FirstNum
        },
        "3": {
            cmd: Command.stackNumber,
            state: State.FirstNum
        },
        "4": {
            cmd: Command.stackNumber,
            state: State.FirstNum
        },
        "5": {
            cmd: Command.stackNumber,
            state: State.FirstNum
        },
        "6": {
            cmd: Command.stackNumber,
            state: State.FirstNum
        },
        "7": {
            cmd: Command.stackNumber,
            state: State.FirstNum
        },
        "8": {
            cmd: Command.stackNumber,
            state: State.FirstNum
        },
        "9": {
            cmd: Command.stackNumber,
            state: State.FirstNum
        },
        // $ ?
    };

    // cm
    export let RequireMotion: { [key: string]: IVimStyleCommand } = {
        // da
        // dA
        "b": {
            cmd: Command.wordMotion,
            isReverse: true
        },
        // B
        "c": {
            cmd: Command.doActionAtCurrentLine
        },
        // C no command
        "d": {
            cmd: Command.doActionAtCurrentLine
        },
        // D no command
        // e
        // E
        "f": {
            cmd: Command.findCharacterMotion,
            state: State.RequireCharForMotion
        },
        "F": {
            cmd: Command.findCharacterMotion,
            isReverse: true,
            state: State.RequireCharForMotion
        },
        "g": {
            cmd: Command.nothing,
            state: State.SmallGForMotion
        },
        "G": {
            cmd: Command.lastLineMotion,
        },
        "h": {
            cmd: Command.rightMotion,
            isReverse: true
        },
        // H no function
        // i
        // I
        "j": {
            cmd: Command.lineMotion
        },
        // J
        "k": {
            cmd: Command.lineMotion,
            isReverse: true
        },
        // K no function
        "l": {
            cmd: Command.rightMotion
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
            cmd: Command.tillCharacterMotion,
            state: State.RequireCharForMotion
        },
        "T": {
            cmd: Command.tillCharacterMotion,
            isReverse: true,
            state: State.RequireCharForMotion
        },
        // u low priority
        // U low priority
        // v low priority
        // V low priority
        "w": {
            cmd: Command.wordMotion
        },
        // W
        // x no function
        // X no function
        "y": {
            cmd: Command.doActionAtCurrentLine
        },
        "Y": {
            cmd: Command.yancToEndAction
        },
        // z never suppoer
        // Z no function
        "0": {
            cmd: Command.homeMotion
        },
        "1": {
            cmd: Command.stackNumber,
            state: State.RequireMotionNum
        },
        "2": {
            cmd: Command.stackNumber,
            state: State.RequireMotionNum
        },
        "3": {
            cmd: Command.stackNumber,
            state: State.RequireMotionNum
        },
        "4": {
            cmd: Command.stackNumber,
            state: State.RequireMotionNum
        },
        "5": {
            cmd: Command.stackNumber,
            state: State.RequireMotionNum
        },
        "6": {
            cmd: Command.stackNumber,
            state: State.RequireMotionNum
        },
        "7": {
            cmd: Command.stackNumber,
            state: State.RequireMotionNum
        },
        "8": {
            cmd: Command.stackNumber,
            state: State.RequireMotionNum
        },
        "9": {
            cmd: Command.stackNumber,
            state: State.RequireMotionNum
        },
        "$": {
            cmd: Command.endMotion
        }
    };

    // cNm
    export let RequireMotionNum: { [key: string]: IVimStyleCommand } = {
        // da
        // dA
        "b": {
            cmd: Command.wordMotion,
            isReverse: true
        },
        // B
        "c": {
            cmd: Command.doActionAtCurrentLine
        },
        // C no command
        "d": {
            cmd: Command.doActionAtCurrentLine
        },
        // D no command
        // e
        // E
        "f": {
            cmd: Command.findCharacterMotion,
            state: State.RequireCharForMotion
        },
        "F": {
            cmd: Command.findCharacterMotion,
            isReverse: true,
            state: State.RequireCharForMotion
        },
        // g
        "G": {
            cmd: Command.gotoLineMotion
        },
        "h": {
            cmd: Command.rightMotion,
            isReverse: true
        },
        // H no function
        // i
        // I
        "j": {
            cmd: Command.lineMotion
        },
        // J
        "k": {
            cmd: Command.lineMotion,
            isReverse: true
        },
        // K no function
        "l": {
            cmd: Command.rightMotion
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
            cmd: Command.findCharacterMotion,
            state: State.RequireCharForMotion
        },
        "T": {
            cmd: Command.tillCharacterMotion,
            isReverse: true,
            state: State.RequireCharForMotion
        },
        // u low priority
        // U low priority
        // v low priority
        // V low priority
        "w": {
            cmd: Command.wordMotion
        },
        // W
        // x no function
        // X no function
        "y": {
            cmd: Command.doActionAtCurrentLine
        },
        // Y ?
        // z never suppoer
        // Z no function
        "0": {
            cmd: Command.stackNumber,
            state: State.RequireMotionNum
        },
        "1": {
            cmd: Command.stackNumber,
            state: State.RequireMotionNum
        },
        "2": {
            cmd: Command.stackNumber,
            state: State.RequireMotionNum
        },
        "3": {
            cmd: Command.stackNumber,
            state: State.RequireMotionNum
        },
        "4": {
            cmd: Command.stackNumber,
            state: State.RequireMotionNum
        },
        "5": {
            cmd: Command.stackNumber,
            state: State.RequireMotionNum
        },
        "6": {
            cmd: Command.stackNumber,
            state: State.RequireMotionNum
        },
        "7": {
            cmd: Command.stackNumber,
            state: State.RequireMotionNum
        },
        "8": {
            cmd: Command.stackNumber,
            state: State.RequireMotionNum
        },
        "9": {
            cmd: Command.stackNumber,
            state: State.RequireMotionNum
        },
        // $?
    };

    // g
    export let SmallG: { [key: string]: IVimStyleCommand } = {
        "g": {
            cmd: Command.moveFirstLineAction
        }
    };

    // cg
    export let SmallGForMotion: { [key: string]: IVimStyleCommand } = {
        "g": {
            cmd: Command.firstLineMotion
        }
    };
}