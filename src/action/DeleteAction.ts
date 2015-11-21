import {IEditor} from "../IEditor";
import {VimStyle,Range} from "../VimStyle";
import {IAction} from "./IAction";
import {IMotion} from "../motion/IMotion";

export class DeleteAction implements IAction {
	
    public motion:IMotion;	
	
    constructor(motion:IMotion){
		this.motion = motion;
	}

	public SetMotion(motion:IMotion){
		this.motion = motion;	
	}	
	
    public Execute(editor:IEditor, vim:VimStyle){
        var r = new Range();
        r.start = editor.GetCurrentPosition(); 
        r.end = this.motion.CalculateEnd(editor, r.start);
        vim.Register.SetRoll(editor.ReadRange(r));
        editor.DeleteRange(r);
	}
}