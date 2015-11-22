import {Position, Range} from "./VimStyle"
export interface IEditor {
    
    // Status
    CloseStatus();
    ShowStatus(text: string);
    
    // Edit
    InsertTextAtCurrentPosition(text: string);
    Insert(position: Position, text: string);
    DeleteRange(range: Range);
    ReplaceRange(range: Range, text: string);
    
    // Read Line
    ReadLineAtCurrentPosition(): string;
    ReadLine(line: number): string;
    
    // Read Range
    ReadRange(range: Range): string;
    
    // Position
    GetCurrentPosition(): Position;
    SetPosition(position: Position);
    GetLastPosition(): Position;
    
    // Document Info
    GetLastLineNum(): number;
}