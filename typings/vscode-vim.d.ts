interface IEditor {

    // Status
    CloseCommandStatus();
    ShowCommandStatus(text: string);
    ShowModeStatus(mode: VimMode);

    // Edit
    InsertTextAtCurrentPosition(text: string);
    InsertCharactorAtCurrentPosition(char: string);
    Insert(position: IPosition, text: string);
    DeleteRange(range: IRange, position?: IPosition);
    ReplaceRange(range: IRange, text: string);

    // Read Line
    ReadLineAtCurrentPosition(): string;
    ReadLine(line: number): string;

    // Read Range
    ReadRange(range: IRange): string;

    // Position
    GetCurrentPosition(): IPosition;
    SetPosition(position: IPosition);
    GetLastPosition(): IPosition;

    // Document Info
    GetLastLineNum(): number;

    // Set VimStyle
    SetVimStyle(vim: IVimStyle);

    // set modes
    ApplyNormalMode(cursor?: IPosition, isLineHasNoChar?: boolean, isLastLine?: boolean);
    ApplyInsertMode(p: IPosition);

    // Visual mode
    ShowVisualMode(range: IRange, focusPosition?: IPosition);
    GetCurrentVisualModeSelection(): IRange;
    ShowVisualLineMode(startLine: number, endLine: number, focusPosition?: IPosition);
    GetCurrentVisualLineModeSelection(): IVisualLineModeSelectionInfo;

    // check invalid position
    UpdateValidPosition(p: IPosition, isBlock?: boolean): IPosition;

    GetTabSize(): number;

    CallEditorCommand(argument: string): void;

    dispose(): void;
}

interface ICommandFactory {
    KeyBindings: IKeyBindings;
    Nmap: { [key: string]: string };
    Nnoremap: { [key: string]: string };
    PushKey(key: string, mode: VimMode, remap: boolean): IAction[];
    Clear(): void;
    GetCommandString(): string;
}


interface IRegisterItem {
    Type: RegisterType;
    Body: string;
}

interface IRegister {
    Set(key: Key, value: IRegisterItem): void;
    SetYank(value: IRegisterItem): void;
    SetRoll(value: IRegisterItem): void;
    Get(key: Key): IRegisterItem;
    GetUnName(): IRegisterItem;
    GetRollFirst(value: IRegisterItem): IRegisterItem;
}

interface IPosition {
    Line: number;
    Char: number;

    IsEqual(p: IPosition): boolean;
    IsBefore(p: IPosition): boolean;
    IsBeforeOrEqual(p: IPosition): boolean;
    IsAfter(p: IPosition): boolean;
    IsAfterOrEqual(p: IPosition): boolean;
    Copy(): IPosition;
}

interface IRange {
    start: IPosition;
    end: IPosition;

    Sort(): void;
    IsContain(p: IPosition): boolean;
    Copy(): IRange;
}

interface IAction {
    Execute(editor: IEditor, vim: IVimStyle);
    GetActionType(): ActionType;
}

interface IRequireCharAction extends IAction {
    CharacterCode: number;
}

interface ICountableAction extends IAction {
    Count: number;
}

interface IInsertTextAction extends IAction {
    SetInsertText(text: string);
    GetInsertModeInfo(): any;
}

interface IRequireMotionAction extends IAction {
    Motion: IMotion;
    Selection: ISelectionMotion;
    IsLine: boolean;
    IsChange: boolean;
    IsLarge: boolean;
}

interface IMotion {
    Count: number;
    CalculateEnd(editor: IEditor, vim: IVimStyle, start: IPosition): IPosition;
}

interface ISelectionMotion {
    Count: number;
    CalculateRange(editor: IEditor, vim: IVimStyle, start: IPosition): IRange;
}

interface IRequireCharacterMotion extends IMotion {
    CharacterCode: number;
}

interface IVimStyle {
    Register: IRegister;
    Options: IVimStyleOptions;
    CommandFactory: ICommandFactory;
    LastAction: IAction;
    LastEditAction: IAction;
    LastMoveCharPosition: number;
    LastFindCharacterMotion: any;

    PushKey(key: string): void;
    PushEscKey(): void;
    ApplyNormalMode();
    ApplyInsertMode(p?: IPosition): void;
    ApplyVisualMode(): void;
    ApplyVisualLineMode(): void;
    GetMode(): VimMode;
}

interface IVimStyleCommand {
    state?: StateName;
    cmd?: VimCommand;
    argument?: string;
    callback?: ICommandCallback;
    CreateAction?: (num: number) => IAction;
    CreateActionWithArguments?: (command: IVimStyleCommand) => IAction;
    AddMotion?: (num: number, action: IAction) => void;
}

interface ICommandCallback { (editor: IEditor, vimStyle: IVimStyle): void }

interface IKeyBindings {
    AtStart?: { [key: string]: IVimStyleCommand };
    FirstNum?: { [key: string]: IVimStyleCommand };
    RequireMotion?: { [key: string]: IVimStyleCommand };
    RequireMotionNum?: { [key: string]: IVimStyleCommand };
    RequireBrancketForLeftBrancket?: { [key: string]: IVimStyleCommand };
    RequireBrancketForRightBrancket?: { [key: string]: IVimStyleCommand };
    RequireBrancketForLeftBrancketMotion?: { [key: string]: IVimStyleCommand };
    RequireBrancketForRightBrancketMotion?: { [key: string]: IVimStyleCommand };
    RequireInnerTextObject?: { [key: string]: IVimStyleCommand };
    RequireOuterTextObject?: { [key: string]: IVimStyleCommand };
    SmallG?: { [key: string]: IVimStyleCommand };
    SmallGForMotion?: { [key: string]: IVimStyleCommand };
    VisualMode?: { [key: string]: IVimStyleCommand };
    VisualModeNum?: { [key: string]: IVimStyleCommand };
    VisualLineMode?: { [key: string]: IVimStyleCommand };
}

interface IVimStyleOptions {
    useErgonomicKeyForMotion: boolean;
    editorKeyBindings?: IKeyBindings;
    vimrc: string[];
}

interface IVisualLineModeSelectionInfo {
    startLine: number;
    endLine: number;
    focusPosition: IPosition;
}

interface IExCommand {
    Execute(line: string, vimStyle: IVimStyle, editor: IEditor);
}

type Key = string;

declare const enum VimKeyType {
    Number,
    Charactor,
    Mark
}
declare const enum ActionType {
    Insert,
    LineMove,
    Move,
    Edit,
    Other,
    Repeat
}

declare const enum RegisterType {
    Text,
    LineText
}

declare const enum Direction {
    Right,
    Left
}

declare const enum CharGroup {
    AlphabetAndNumber,
    Marks,
    Spaces,
    Hiragana,
    Katakana,
    Other,
}

declare const enum VimMode {
    Normal,
    Insert,
    Visual,
    VisualLine,
}

declare const enum VimCommand {
    // other
    stackNumber,
    nothing,
    editorCommand,
}

declare const enum StateName {
    AtStart,
    FirstNum,
    RequireMotion,
    RequireMotionNum,
    RequireCharForMotion,
    RequireCharForAction,
    RequireCharForRegister,
    RequireBrancketForLeftBrancket,
    RequireBrancketForRightBrancket,
    RequireBrancketForLeftBrancketMotion,
    RequireBrancketForRightBrancketMotion,
    RequireInnerTextObject,
    RequireOuterTextObject,
    SmallG,
    SmallGForMotion,
    VisualMode,
    VisualModeNum,
    Panic
}