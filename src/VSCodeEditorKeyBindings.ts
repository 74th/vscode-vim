import { EditorCommand } from "./action/CallEditorCommandAction";
export const VSCodeEditorKeyBindngs: IKeyBindings = {
    AtStart: {
        "u": {
            CreateActionWithArguments: EditorCommand,
            argument: "undo",
        },
        ":": {
            CreateActionWithArguments: EditorCommand,
            argument: "workbench.action.showCommands",
        },
        "/": {
            CreateActionWithArguments: EditorCommand,
            argument: "actions.find",
        },
        "n": {
            CreateActionWithArguments: EditorCommand,
            argument: "editor.action.nextMatchFindAction",
        },
        "N": {
            CreateActionWithArguments: EditorCommand,
            argument: "editor.action.previousMatchFindAction",
        },
        ">": {
            CreateActionWithArguments: EditorCommand,
            argument: "editor.action.indentLines",
        },
        "<": {
            CreateActionWithArguments: EditorCommand,
            argument: "editor.action.outdentLines",
        },
        "%": {
            CreateActionWithArguments: EditorCommand,
            argument: "editor.action.jumpToBracket",
        },
    },
    FirstNum: {
    },
    RequireMotion: {
    },
    RequireMotionNum: {
    },
    RequireBrancketForLeftBrancket: {
    },
    RequireBrancketForLeftBrancketMotion: {
    },
    RequireBrancketForRightBrancket: {
    },
    RequireBrancketForRightBrancketMotion: {
    },
    SmallG: {
    },
    SmallGForMotion: {
    },
    VisualMode: {
        "u": {
            CreateActionWithArguments: EditorCommand,
            argument: "undo",
        },
        ":": {
            CreateActionWithArguments: EditorCommand,
            argument: "workbench.action.showCommands",
        },
        "/": {
            CreateActionWithArguments: EditorCommand,
            argument: "actions.find",
        },
        "n": {
            CreateActionWithArguments: EditorCommand,
            argument: "editor.action.nextMatchFindAction",
        },
        "N": {
            CreateActionWithArguments: EditorCommand,
            argument: "editor.action.previousMatchFindAction",
        },
        ">": {
            CreateActionWithArguments: EditorCommand,
            argument: "editor.action.indentLines",
        },
        "<": {
            CreateActionWithArguments: EditorCommand,
            argument: "editor.action.outdentLines",
        },
        "%": {
            CreateActionWithArguments: EditorCommand,
            argument: "editor.action.jumpToBracket",
        },
    },
    VisualModeNum: {},
    VisualLineMode: {
        "u": {
            CreateActionWithArguments: EditorCommand,
            argument: "undo",
        },
        ":": {
            CreateActionWithArguments: EditorCommand,
            argument: "workbench.action.showCommands",
        },
        "/": {
            CreateActionWithArguments: EditorCommand,
            argument: "actions.find",
        },
        "n": {
            CreateActionWithArguments: EditorCommand,
            argument: "editor.action.nextMatchFindAction",
        },
        "N": {
            CreateActionWithArguments: EditorCommand,
            argument: "editor.action.previousMatchFindAction",
        },
        ">": {
            CreateActionWithArguments: EditorCommand,
            argument: "editor.action.indentLines",
        },
        "<": {
            CreateActionWithArguments: EditorCommand,
            argument: "editor.action.outdentLines",
        },
        "%": {
            CreateActionWithArguments: EditorCommand,
            argument: "editor.action.jumpToBracket",
        },
    },
};
