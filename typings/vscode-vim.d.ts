interface IEditor {

    // Status
    CloseCommandStatus();
    ShowCommandStatus(text: string);
    ShowModeStatus(mode: VimMode);

    // Edit
    InsertTextAtCurrentPosition(text: string);
    InsertCharactorAtCurrentPosition(char: string);
    Insert(position: IPosition, text: string);
    DeleteRange(range: IRange,position?:IPosition);
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
    ApplyVisualMode();

    // check invalid position
    UpdateValidPosition(p: IPosition, isBlock?: boolean): IPosition;

    dispose(): void;
}

interface IVSCodeEditorOptions {
    showMode?: boolean;
}

interface ICommandFactory {
    PushKey(key: Key): IAction;
    Clear(): void;
    GetCommandString(): string;
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
}

interface IRange {
    start: IPosition;
    end: IPosition;

    Sort(): void;
}

interface IAction {
    Execute(editor: IEditor, vim: IVimStyle);
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

    PushKey(key: Key): void;
    PushEscKey(): void;
    ApplyInsertMode(p?: IPosition): void;
    ApplyVisualMode(): void;
    GetMode(): VimMode;
}

interface IVimStyleCommand {
    state?: StateName;
    isReverse?: boolean;
    cmd: CommandName;
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

declare const enum RegisterType {
    Text,
    LineText
}

declare const enum ActionType {
    Combination,
    Delete,
    FirstInsert,
    Insert,
    Move,
    Paste
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

declare const enum CommandStatus {
    None,
    FirstNum,
    RequireMotion,
    RequireMotionNum,
    RequireCharForMotion
}

declare const enum KeyClass {
    // 1 2 3 4 5 6 7 8 9
    NumWithoutZero,
    // 0
    Zero,
    // w b h j k l $
    Motion,
    // x s I A p P C D S
    SingleAction,
    // i a 
    TextObjectOrSingleAction,
    // d y c
    RequireMotionAction,
    // f t F T
    RequireCharMotion
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

declare const enum StateName {
    AtStart,
    FirstNum,
    RequireMotion,
    RequireMotionNum,
    RequireCharForMotion,
    SmallG,
    SmallGForMotion,
    Panic
}