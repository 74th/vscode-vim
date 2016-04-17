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

    dispose(): void;
}

interface ICommandFactory {
    PushKey(key: string, mode: VimMode): IAction;
    Clear(): void;
    GetCommandString(): string;
    SetKeyBindings(IKeyBindings);
}

interface IMotion {
    SetCount(count: number);
    CalculateEnd(editor: IEditor, start: IPosition): IPosition;
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

interface IInsertAction {
    Execute(editor: IEditor, vim: IVimStyle);
    GetActionType(): ActionType;
    SetInsertText(text: string);
    GetInsertModeInfo(): any;
}

interface IRequireMotionAction extends IAction {
    SetMotion(motion: IMotion);
    SetLineOption();
    SetSmallOption();
}

interface IMotion {
    SetCount(count: number);
    CalculateEnd(editor: IEditor, start: IPosition): IPosition;
}

interface IVimStyle {
    Register: IRegister;
    Options: IVimStyleOptions;
    LastAction: IAction;
    LastEditAction: IAction;
    LastMoveCharPosition: number;

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
    isReverse?: boolean;
    isEdit?: boolean;
    cmd: VimCommand;
}

interface IKeyBindings {
    AtStart: { [key: string]: IVimStyleCommand };
    FirstNum: { [key: string]: IVimStyleCommand };
    RequireMotion: { [key: string]: IVimStyleCommand };
    RequireMotionNum: { [key: string]: IVimStyleCommand };
    SmallG: { [key: string]: IVimStyleCommand };
    SmallGForMotion: { [key: string]: IVimStyleCommand };
    VisualMode: { [key: string]: IVimStyleCommand };
    VisualLineMode: { [key: string]: IVimStyleCommand };
}

interface IVimStyleOptions {
    useErgonomicKeyForMotion: boolean;
}

interface IVisualLineModeSelectionInfo {
    startLine: number;
    endLine: number;
    focusPosition: IPosition;
}

declare const enum Key {
    a,
    b,
    c,
    d,
    e,
    f,
    g,
    h,
    i,
    j,
    k,
    l,
    m,
    n,
    o,
    p,
    q,
    r,
    s,
    t,
    u,
    v,
    w,
    x,
    y,
    z,
    A,
    B,
    C,
    D,
    E,
    F,
    G,
    H,
    I,
    J,
    K,
    L,
    M,
    N,
    O,
    P,
    Q,
    R,
    S,
    T,
    U,
    V,
    W,
    X,
    Y,
    Z,
    n0,
    n1,
    n2,
    n3,
    n4,
    n5,
    n6,
    n7,
    n8,
    n9,
    Space,
    Exclamation,
    Quotation,
    Doller,
    Sharp,
    Percent,
    Ampersand,
    Apostrophe,
    LeftParenthesis,
    RightParenthesis,
    Asterisk,
    Plus,
    Comma,
    Hyphen,
    Period,
    Solidus,
    Colon,
    Semicolon,
    LessThan,
    Equals,
    GreaterThan,
    Question,
    AtMark,
    LeftSquareBracket,
    ReverseSolidus,
    RightSquareBracket,
    CircumflexAccent,
    LowLine,
    GraveAccent,
    LeftCurlyBracket,
    VerticalLine,
    RightCurlyBracket,
    Tilde,
    Esc
}

declare const enum KeyType {
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

    // single action
    insertTextBeforeCursor,
    appendTextAfterCursor,
    insertTextBeforeFirstNonBlankInLine,
    appendTextAtEndOfLine,
    openNewLineBelowCurrentLineAndAppnedText,
    deleteCharactersUnderCursor,
    changeCharacters,
    changeToEndOfLine,
    putRegisterAfterCursorPosition,

    // move action
    gotoRight,
    gotoDownLine,
    gotoWordFoward,
    gotoBlankSeparated,
    gotoWords,
    gotoBlankSepalated,
    gotoForwardToEndOfWold,
    gotoForwardToEndOfBlankSeparated,
    gotoFirstCharacterInLine,
    gotoLastCharacterInLine,
    gotoFirstNonBlankCharacterInLine,
    gotoCharToRight,
    goTillBeforeCharacterToRight,
    gotoLine,
    gotoLastLine,
    gotoFirstLineOnFirstNonBlankCharacter,

    // motion
    motion_right,
    motion_downLine,
    motion_wordForward,
    motion_blankSeparated,
    backWordMotion,
    backWORDMotion,
    motion_endOfWord,
    motion_endOfBlankSeparated,
    motion_firstCharacterInLine,
    motion_lastCharacterInLine,
    motion_firstNonBlankCharacterInLine,
    motion_charToRight,
    motion_tillBeforeCharToRight,
    gotoLineMotion,
    motion_lastLine,
    motion_firstLine,

    // delete, yanc, change action
    changeTextWithMotion,
    deleteTextWithMotion,
    yankTextMovedOverWithMotion,
    changeTextToEndOfLine,
    deleteTextToEndOfLine,
    yankLine,
    doActionAtCurrentLine,

    // visual mode
    startVisualMode,
    expandSelectionAction,
    changeHighlightedText,
    deleteHighlightedText,
    yankHighlightedText,

    // line visual mode
    startVisualLineMode,
    expandLineSelectionAction,
    changeLineSelectionAction,
    deleteLineSelectionAction,
    yancLineSelectionAction,

    // special
    repeatLastChange,

    // other
    stackNumber,
    nothing
}

declare const enum StateName {
    AtStart,
    FirstNum,
    RequireMotion,
    RequireMotionNum,
    RequireCharForMotion,
    SmallG,
    SmallGForMotion,
    VisualMode,
    Panic
}