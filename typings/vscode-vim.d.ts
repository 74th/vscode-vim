interface IEditor {
    
    // Status
    CloseStatus();
    ShowStatus(text: string);
    
    // Edit
    InsertTextAtCurrentPosition(text: string);
    Insert(position: IPosition, text: string);
    DeleteRange(range: IRange);
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
    line: number;
    char: number;
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
    ApplyInsertMode(): void;
}