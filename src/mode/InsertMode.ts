import * as Enums from "../VimStyleEnums";
import {IEditor} from "../IEditor";
import * as Utils from "../Utils";

export function InsertModeExecute(key: Enums.Key, editor: IEditor) {
    editor.InsertTextAtCurrentPosition(Utils.KeyToChar(key));
}
