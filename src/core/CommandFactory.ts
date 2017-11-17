import { CallEditorCommandAction } from "../action/CallEditorCommandAction";
import { ExpandHighlightedLineAction } from "../action/ExpandHighlightedLineAction";
import { ExpandHighlightedTextAction } from "../action/ExpandHighlightedTextAction";
import { GoAction } from "../action/GoAction";
import { InsertTextAction } from "../action/InsertTextAction";
import { OpenNewLineAndAppendTextAction } from "../action/OpenNewLineAndAppendTextAction";
import { PutRegisterAction } from "../action/PutRegisterAction";
import { RepeatLastChangeAction } from "../action/RepeatLastChangeAction";
import { ReplaceCharacterAction } from "../action/ReplaceCharacterAction";
import { ReplaceCharacterOfSelectedTextAction } from "../action/ReplaceCharacterOfSelecetdTextAction";
import { StartVisualLineModeAction } from "../action/StartVisualLineModeAction";
import { StartVisualModeAction } from "../action/StartVisualModeAction";
import { DownMotion } from "../motion/DownMotion";
import * as FirstCharacterMotion from "../motion/FirstCharacterMotion";
import { LastCharacterInLineMotion } from "../motion/LastCharacterInLineMotion";
import { MoveWordMotion } from "../motion/MoveWordMotion";
import { RightMotion } from "../motion/RightMotion";
import { WordMotion } from "../motion/WordMotion";
import * as Utils from "../Utils";

// command factory
export class CommandFactory implements ICommandFactory {

    public Nmap: { [key: string]: string };
    public Nnoremap: { [key: string]: string };
    public KeyBindings: IKeyBindings;

    private state: StateName;
    private action: IAction;
    private motion: IRequireCharacterMotion;
    private stackedKey: string;
    private num: number;
    private registerCharCode: number;
    private commandString: string;

    constructor() {
        this.Clear();
        this.Nmap = {};
        this.Nnoremap = {};
    }

    public PushKey(orgKeyStroke: string, mode: VimMode, remap: boolean): IAction[] {
        let keyStroke = orgKeyStroke;
        let actionList: IAction[] = [];
        while (keyStroke.length > 0) {
            let keyChar = keyStroke.substring(0, 1);
            keyStroke = keyStroke.substring(1);
            if (keyChar === "<") {
                if (keyStroke.substring(0, 4) === "Up>") {
                    keyChar = "<Up>";
                    keyStroke = keyStroke.substring(3);
                } else if (keyStroke.substring(0, 6) === "Down>") {
                    keyChar = "<Down>";
                    keyStroke = keyStroke.substring(5);
                } else if (keyStroke.substring(0, 7) === "Right>") {
                    keyChar = "<Right>";
                    keyStroke = keyStroke.substring(6);
                } else if (keyStroke.substring(0, 6) === "Left>") {
                    keyChar = "<Left>";
                    keyStroke = keyStroke.substring(5);
                }
            }
            this.commandString += keyChar;

            if (remap && mode === VimMode.Normal && this.Nmap[this.commandString] !== undefined) {
                keyStroke += this.Nmap[this.commandString];
                this.ClearState();
                continue;
            }

            if (remap && mode === VimMode.Normal && this.Nnoremap[this.commandString] !== undefined) {
                let newCommandString = this.Nnoremap[this.commandString];
                this.ClearState();
                actionList = actionList.concat(this.PushKey(newCommandString, mode, false));
            } else {
                let action = this.pushKey(keyChar, mode);
                if (action !== null) {
                    actionList.push(action);
                }
            }
        }
        return actionList;
    }
    public pushKey(keyChar: string, mode: VimMode): IAction {
        let command: IVimStyleCommand;
        if (mode === VimMode.Normal) {
            switch (this.state) {
                case StateName.AtStart:
                    command = this.KeyBindings.AtStart[keyChar];
                    break;
                case StateName.FirstNum:
                    command = this.KeyBindings.FirstNum[keyChar];
                    break;
                case StateName.RequireMotion:
                    command = this.KeyBindings.RequireMotion[keyChar];
                    break;
                case StateName.RequireMotionNum:
                    command = this.KeyBindings.RequireMotionNum[keyChar];
                    break;
                case StateName.RequireCharForMotion:
                    return this.pushKeyAtRequireCharForMotion(keyChar);
                case StateName.RequireCharForAction:
                    return this.pushKeyAtRequireCharForAction(keyChar);
                case StateName.RequireCharForRegister:
                    return this.pushKeyAtRequireCharForRegister(keyChar);
                case StateName.RequireBrancketForLeftBrancket:
                    command = this.KeyBindings.RequireBrancketForLeftBrancket[keyChar];
                    break;
                case StateName.RequireBrancketForLeftBrancketMotion:
                    command = this.KeyBindings.RequireBrancketForLeftBrancketMotion[keyChar];
                    break;
                case StateName.RequireBrancketForRightBrancket:
                    command = this.KeyBindings.RequireBrancketForRightBrancket[keyChar];
                    break;
                case StateName.RequireBrancketForRightBrancketMotion:
                    command = this.KeyBindings.RequireBrancketForRightBrancketMotion[keyChar];
                    break;
                case StateName.RequireInnerTextObject:
                    command = this.KeyBindings.RequireInnerTextObject[keyChar];
                    break;
                case StateName.RequireOuterTextObject:
                    command = this.KeyBindings.RequireOuterTextObject[keyChar];
                    break;
                case StateName.SmallG:
                    command = this.KeyBindings.SmallG[keyChar];
                    break;
                case StateName.SmallGForMotion:
                    command = this.KeyBindings.SmallGForMotion[keyChar];
                    break;
            }
        } else if (mode === VimMode.Visual) {
            switch (this.state) {
                case StateName.AtStart:
                    this.action = new ExpandHighlightedTextAction();
                    command = this.KeyBindings.VisualMode[keyChar];
                    break;
                case StateName.VisualModeNum:
                    this.action = new ExpandHighlightedTextAction();
                    command = this.KeyBindings.VisualModeNum[keyChar];
                    break;
                case StateName.RequireMotionNum:
                    command = this.KeyBindings.RequireMotionNum[keyChar];
                    break;
                case StateName.RequireCharForMotion:
                    return this.pushKeyAtRequireCharForMotion(keyChar);
                case StateName.RequireCharForAction:
                    return this.pushKeyAtRequireCharForAction(keyChar);
                case StateName.RequireCharForRegister:
                    return this.pushKeyAtRequireCharForRegister(keyChar);
                case StateName.RequireBrancketForLeftBrancketMotion:
                    command = this.KeyBindings.RequireBrancketForLeftBrancketMotion[keyChar];
                    break;
                case StateName.RequireBrancketForRightBrancketMotion:
                    command = this.KeyBindings.RequireBrancketForRightBrancketMotion[keyChar];
                    break;
                case StateName.SmallGForMotion:
                    command = this.KeyBindings.SmallGForMotion[keyChar];
                    break;
            }
        } else if (mode === VimMode.VisualLine) {
            switch (this.state) {
                case StateName.AtStart:
                    this.action = new ExpandHighlightedLineAction();
                    command = this.KeyBindings.VisualLineMode[keyChar];
                    break;
                case StateName.RequireMotionNum:
                    command = this.KeyBindings.RequireMotionNum[keyChar];
                    break;
                case StateName.RequireCharForMotion:
                    return this.pushKeyAtRequireCharForMotion(keyChar);
                case StateName.RequireBrancketForLeftBrancketMotion:
                    command = this.KeyBindings.RequireBrancketForLeftBrancketMotion[keyChar];
                    break;
                case StateName.RequireBrancketForRightBrancketMotion:
                    command = this.KeyBindings.RequireBrancketForRightBrancketMotion[keyChar];
                    break;
                case StateName.SmallGForMotion:
                    command = this.KeyBindings.SmallGForMotion[keyChar];
                    break;
            }
        }
        if (command === undefined) {
            this.Clear();
            return null;
        }
        this.createVimStyleCommand(keyChar, command);
        if (command.state === StateName.Panic) {
            this.Clear();
            return null;
        }
        if (command.state === undefined) {
            return this.action;
        }
        this.stackedKey = keyChar;
        this.state = command.state;
        return null;
    }

    public Clear() {
        this.ClearState();
        this.commandString = "";
    }

    public ClearState() {
        this.state = StateName.AtStart;
        this.action = null;
        this.stackedKey = null;
        this.num = 0;
    }

    public GetCommandString(): string {
        return this.commandString;
    }

    private createVimStyleCommand(key: string, command: IVimStyleCommand) {

        if (command.CreateAction) {
            this.action = command.CreateAction(this.num);
            return;
        }
        if (command.AddMotion) {
            command.AddMotion(this.num, this.action);
            return;
        }
        if (command.CreateActionWithArguments) {
            this.action = command.CreateActionWithArguments(command);
            return;
        }

        switch (command.cmd) {

            // ** other **
            case VimCommand.stackNumber:
                this.stackNumber(key);
            case VimCommand.nothing:
                return;
        }
    }

    private pushKeyAtRequireCharForMotion(key: string): IAction {
        const a = this.action as IRequireMotionAction;
        const m = a.Motion as IRequireCharacterMotion;
        m.CharacterCode = key.charCodeAt(0);
        return this.action;
    }

    private pushKeyAtRequireCharForAction(key: string): IAction {
        const a = this.action as IRequireCharAction;
        a.CharacterCode = key.charCodeAt(0);
        return this.action;
    }

    private pushKeyAtRequireCharForRegister(key: string): IAction {
        // TODO
        this.registerCharCode = key.charCodeAt(0);
        this.state = StateName.AtStart;
        return null;
    }

    private getNumStack() {
        return this.num === 0 ? 1 : this.num;
    }

    private stackNumber(key: string) {
        let n: number = parseInt(key, 10);
        this.num = this.num * 10 + n;
        if (this.num > 10000) {
            this.Clear();
        }
    }

}
