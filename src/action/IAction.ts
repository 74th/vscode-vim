import {IEditor} from "../IEditor";
import {VimStyle} from "../VimStyle";
import {IMotion} from "../motion/IMotion";

export interface IAction {
    Execute(editor: IEditor, vim: VimStyle);
}

export interface IRequireMotionAction extends IAction {
    SetMotion(motion: IMotion);
    SetLineOption();
    SetSmallOption();
}