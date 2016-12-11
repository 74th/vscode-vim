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
    Nmap: { [key:string]: string };
    Nnoremap: { [key:string]: string };
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
    IsLine: boolean;
    IsChange: boolean;
    IsLarge: boolean;
}

interface IMotion {
    Count: number;
    CalculateEnd(editor: IEditor, vim: IVimStyle, start: IPosition): IPosition;
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
    cmd: VimCommand;
    argument?: string;
    callback?: ICommandCallback;
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
    SmallG?: { [key: string]: IVimStyleCommand };
    SmallGForMotion?: { [key: string]: IVimStyleCommand };
    VisualMode?: { [key: string]: IVimStyleCommand };
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

    // ** Left-right motion **
    // Nj
    gotoRight,
    // Nl
    gotoLeft,
    // cNj
    rightMotion,
    // cNl
    leftMotion,
    // 0
    gotoFirstCharacterInLine,
    // c0
    firstCharacterInLineMotion,
    // ^
    gotoFirstNonBlankCharacterInLine,
    // c^
    firstNonBlankCharacterInLineMotion,
    // $
    gotoLastCharacterInLine,
    // c$
    lastCharacterInLineMotion,
    // g0
    // g^
    // g$
    // gm
    // N|
    gotoColumnN,
    // cN|
    columnNMotion,
    // Nf{char}
    gotoCharacterToRight,
    // NF{char}
    gotoCharacterToLeft,
    // cNf{char}
    characterToRightMotion,
    // cNF{char}
    characterToLeftMotion,
    // Nt{char}
    goTillBeforeCharacterToRight,
    // NT{char}
    goTillBeforeCharacterToLeft,
    // cNt{char}
    tillBeforeCharToRightMotion,
    // cNT{char}
    tillBeforeCharToLeftMotion,
    // N;
    gotoRepeatCharacter,
    // cN;
    repeartCharacterMotion,
    // N,
    gotoRepeatCharacterOppositeDirection,
    // cN,
    repeartCharacterMotionOppositeDirection,

    // ** Up-down motions **
    // Nk
    goUp,
    // Nj
    goDown,
    // cNk
    upMotion,
    // cNj
    downMotion,
    // N-
    goUpOnFirstNonBlankCharacter,
    // cN-
    upOnFirstNonBlankCharacterMotion,
    // N+
    goDownOnFirstNonBlankCharacter,
    // cN+
    downOnFirstNonBlankCharacterMotion,
    // G
    gotoLastLine,
    // cG
    lastLineMotion,
    // NG
    gotoLine,
    // cNG
    lineMotion,
    // gg
    gotoFirstLineOnFirstNonBlankCharacter,
    // cgg
    firstLineMotion,
    // N%
    gotoLinePercentageDown,
    // cN%
    linePercentageDownMotion,
    // Ngj

    // ** Text object motions **
    // Nw
    gotoWordFoward,
    // cw
    wordForwardMotion,
    // NW
    gotoBlankSeparated,
    // cNW
    blankSeparatedMotion,
    // Ne
    gotoForwardToEndOfWold,
    // cNe
    endOfWordMotion,
    // NE
    gotoForwardToEndOfBlankSeparated,
    // cNE
    endOfBlankSeparatedMotion,
    // Nb
    gotoWordBackword,
    // cNb
    wordBackwardMotion,
    // NB
    gotoBlankSeparatedBackword,
    // cNB
    blankSeparatedBackwordMotion,
    // Nge
    gotoEndOfWordBackword,
    // cNge
    endOfWordBackwordMotion,
    // N)
    gotoSentenceForword,
    // cN)
    sentenceForwordMotion,
    // N(
    gotoSentenceBackword,
    // cN(
    sentenceBackwordMotion,
    // N}
    gotoParagraphFoword,
    // cN}
    paragraphFowordMotion,
    // [(
    goBackToUnclosedLeftParenthesis,
    // c[(
    backToUnclosedLeftParenthesisMotion,
    // [{
    goBackToUnclosedLeftCurlyBracket,
    // c[{
    backToUnclosedLeftCurlyBracketMotion,
    // ])
    goToUnclosedRightParenthesis,
    // c])
    toUnclosedRightParenthesisMotion,
    // ]}
    goToUnclosedRightCurlyBracket,
    // c]}
    toUnclosedRightCurlyBracketMotion,


    // N{
    gotoParagraphBackword,
    // cN{
    paragraphBackwordMotion,
    // some methods...

    // ** Pattern searches **
    // Nn
    repeatLastSearch,
    // NN
    repeatLastSearchOpositeDirection,
    // N*
    searchFowordForIdentifierUnderCursor,
    // N#
    searchBackwordForIdentifierUnderCursor,
    // gd
    gotoLocalDeclarationOfIdentifierUnderCursor,
    // gD
    gotoGlobalDeclarationOfIdentifierUnderCursor,

    // ** Marks and motions **

    // ** Various motions **

    // ** Scrolling **

    // ** Inserting text **
    // Na
    appendTextAfterCursor,
    // NA
    appendTextAtEndOfLine,
    // Ni
    insertTextBeforeCursor,
    // NI
    insertTextBeforeFirstNonBlankInLine,
    // NgI
    insertTextColumnN,
    // No
    openNewLineBelowCurrentLineAndAppnedText,
    // NO
    openNewLineAboveCurrentLineAndAppnedText,

    // ** Deleting text **
    // Nx
    deleteCharactersUnderCursor,
    // NX
    deleteCharactersBeforeCursor,
    // Nd{motion}
    deleteTextWithMotion,
    // {visual}d
    deleteHighlightedText,
    // {visualLine}d
    deleteHighlightedLine,
    // dd cc yy
    doActionAtCurrentLine,
    // D
    deleteTextToEndOfLine,

    // ** Copying and moving text **
    // y{motion}
    yankTextWithMotion,
    // {visual}y
    yankHighlightedText,
    // {visualList}y
    yankHighlightedLine,
    // NY
    yankLine,
    // Np
    putRegisterAfterCursorPosition,
    // NP
    putRegisterBeforeCursorPosition,

    // ** Changing text **
    // Nr
    replaceCharacter,
    // Ngr
    replaceCharacterWithoutAffectingLayout,
    // V...rc
    replaceCharacterOfSelectedText,
    // c{motion}
    changeTextWithMotion,
    // C
    changeTextToEndOfLine,
    // {visual}c
    changeHighlightedText,
    // {visualLine}c
    changeHighligtedLine,
    // NS
    changeLines,
    // Ns
    changeCharacters,
    // ** Complex changes **

    // ** Visual mode **
    // v
    startVisualMode,
    // V
    startVisualLineMode,

    // ** Text objects (only in Visual mode or after an operator) **

    // ** Repeating commands **
    // .
    repeatLastChange,

    // maping
    nmap,
    noremap,

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
    SmallG,
    SmallGForMotion,
    VisualMode,
    Panic
}