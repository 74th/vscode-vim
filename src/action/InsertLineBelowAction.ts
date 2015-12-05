import {Position} from "../VimStyle";
import * as Utils from "../Utils";

export class InsertLineBelowAction implements IAction {

    private isAbove: boolean;

    constructor() {
        this.isAbove = false;
    }

    public SetAboveOption() {
        this.isAbove = true;
    }
    public Execute(editor: IEditor, vim: IVimStyle) {
        var currentPosition = editor.GetCurrentPosition();
        var selecterPosition = new Position();
        selecterPosition.char = 0;
        var insertPosition = new Position();
        var currentLine = editor.ReadLineAtCurrentPosition();
        if (this.isAbove) {
            selecterPosition.line = currentPosition.line;
            insertPosition.line = currentPosition.line;
            insertPosition.char = 0;
        } else {
            selecterPosition.line = currentPosition.line + 1;
            insertPosition.line = currentPosition.line;
            insertPosition.char = currentLine.length;
        }

        var insertText = appendWhiteSpace(currentLine);
        selecterPosition.char = insertText.length;

        if (this.isAbove) {
            insertText = insertText + "\n";
        } else {
            insertText = "\n" + insertText;
        }
        editor.Insert(insertPosition, insertText);

        vim.ApplyInsertMode(selecterPosition);
    }
}

function appendWhiteSpace(prevLine: string) {
    if (prevLine.length == 0) {
        return "";
    }

    var firstChar = prevLine.charCodeAt(0);
    if (Utils.GetCharClass(firstChar) != CharGroup.Spaces) {
        return "";
    }

    var i = 0;
    for (i = 0; i < prevLine.length; i++) {
        if (prevLine.charCodeAt(i) != firstChar) {
            break;
        }
    }
    return prevLine.substr(0, i);
}