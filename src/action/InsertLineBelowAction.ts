import {Position} from "../VimStyle";

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
        var prevLine: string;
        if (this.isAbove) {
            selecterPosition.line = currentPosition.line;
            insertPosition.line = currentPosition.line;
            insertPosition.char = 0;
            prevLine = editor.ReadLine(currentPosition.line - 1);
        } else {
            selecterPosition.line = currentPosition.line + 1;
            insertPosition.line = currentPosition.line;
            prevLine = editor.ReadLine(currentPosition.line);
            insertPosition.char = prevLine.length;
        }

        var insertText = "";
        // space
        if (prevLine.length > 0) {
            var firstChar = prevLine.charCodeAt(0);
            var i = 0;
            for (i = 0; i < prevLine.length; i++) {
                if (prevLine.charCodeAt(i) != firstChar) {
                    break;
                }
            }
            insertText += prevLine.substr(0, i);
            selecterPosition.char = i;
        }

        if (this.isAbove) {
            insertText = insertText + "\n";
        } else {
            insertText = "\n" + insertText;
        }
        editor.Insert(insertPosition, insertText);
        editor.SetPosition(selecterPosition);

        vim.ApplyInsertMode();
    }
}