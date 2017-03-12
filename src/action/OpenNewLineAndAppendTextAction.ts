import * as Utils from "../Utils";
import { Position } from "../VimStyle";
import { AbstractInsertTextAction } from "./AbstractInsertTextAction";

export class OpenNewLineAndAppendTextAction extends AbstractInsertTextAction {

    public IsAbove: boolean;

    constructor() {
        super();
        this.IsAbove = false;
    }

    public GetActionType(): ActionType {
        return ActionType.Insert;
    }

    public Execute(editor: IEditor, vim: IVimStyle) {
        let currentPosition = editor.GetCurrentPosition();
        let selecterPosition = new Position();
        selecterPosition.Char = 0;
        let insertPosition = new Position();
        let currentLine = editor.ReadLineAtCurrentPosition();
        if (this.IsAbove) {
            selecterPosition.Line = currentPosition.Line;
            insertPosition.Line = currentPosition.Line;
            insertPosition.Char = 0;
        } else {
            selecterPosition.Line = currentPosition.Line + 1;
            insertPosition.Line = currentPosition.Line;
            insertPosition.Char = currentLine.length;
        }

        let insertSpace = appendWhiteSpace(currentLine);
        selecterPosition.Char = insertSpace.length;

        let insertText = insertSpace;
        if (this.insertText !== null) {
            insertText += this.insertText;
        }
        if (this.IsAbove) {
            insertText = insertText + "\n";
        } else {
            insertText = "\n" + insertText;
        }
        editor.Insert(insertPosition, insertText);

        if (this.insertText === null) {

            this.insertModeInfo = {
                DocumentLineCunt: editor.GetLastLineNum() + 1,
                Position: selecterPosition.Copy(),
                BeforeText: insertSpace,
                AfterText: "",
            };

            vim.ApplyInsertMode(selecterPosition);

        } else {
            editor.SetPosition(this.calcPositionAfterInsert(selecterPosition));
        }
    }
}

function appendWhiteSpace(prevLine: string) {
    if (prevLine.length === 0) {
        return "";
    }

    let firstChar = prevLine.charCodeAt(0);
    if (Utils.GetCharClass(firstChar) !== CharGroup.Spaces) {
        return "";
    }

    let i = 0;
    for (i = 0; i < prevLine.length; i++) {
        if (prevLine.charCodeAt(i) !== firstChar) {
            break;
        }
    }
    return prevLine.substr(0, i);
}
// o
export function OpenNewLineBelowCurrentLineAndAppendText(num: number): IAction {
    return new OpenNewLineAndAppendTextAction();

}

// O
export function OpenNewLineAboveCurrentLineAndAppendText(num: number): IAction {
    let a = new OpenNewLineAndAppendTextAction();
    a.IsAbove = true;
    return a;
}
