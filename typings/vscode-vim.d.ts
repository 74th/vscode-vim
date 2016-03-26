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

    // Selection
    GetCurrentSelection(): IRange;
    SetSelection(range: IRange);

    // Document Info
    GetLastLineNum(): number;

    // Set VimStyle
    SetVimStyle(vim: IVimStyle);

    // set modes
    ApplyNormalMode(cursor?: IPosition, isLineHasNoChar?: boolean, isLastLine?: boolean);
    ApplyInsertMode(p: IPosition);
    ApplyVisualMode();

    // check invalid position
    UpdateValidPosition(p: IPosition, isBlock?: boolean): IPosition;

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
    GetMode(): VimMode;
}

interface IVimStyleCommand {
    state?: StateName;
    isReverse?: boolean;
    isEdit?: boolean;
    cmd: CommandName;
}

interface IKeyBindings {
    AtStart: { [key: string]: IVimStyleCommand };
    FirstNum: { [key: string]: IVimStyleCommand };
    RequireMotion: { [key: string]: IVimStyleCommand };
    RequireMotionNum: { [key: string]: IVimStyleCommand };
    SmallG: { [key: string]: IVimStyleCommand };
    SmallGForMotion: { [key: string]: IVimStyleCommand };
    VisualMode: { [key: string]: IVimStyleCommand };
}

interface IVimStyleOptions {
    useErgonomicKeyForMotion: boolean;
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
    Other
}

declare const enum VimMode {
    Normal,
    Insert,
    Visual
}

declare const enum CommandName {

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
    moveWORDAction,
    moveBackWordAction,
    moveBackWORDAction,
    moveWordEndAction,
    moveWORDEndAction,
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
    WORDMotion,
    backWordMotion,
    backWORDMotion,
    wordEndMotion,
    WORDEndMotion,
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

    // visual mode
    enterVisualModeAction,
    expandSelectionAction,
    changeSelectionAction,
    deleteSelectionAction,
    yancSelectionAction,

    // special
    repeat,

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