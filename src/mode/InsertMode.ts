import * as Utils from "../Utils";

export function InsertModeExecute(key: Key, editor: IEditor) {
    editor.InsertCharactorAtCurrentPosition(Utils.KeyToChar(key));
}
