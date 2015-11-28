import * as Utils from "../Utils";

export function InsertModeExecute(key: Key, editor: IEditor) {
    editor.InsertTextAtCurrentPosition(Utils.KeyToChar(key));
}
