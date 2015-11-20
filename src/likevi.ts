import * as Driver from "./extension";
import * as vscode2 from 'vscode';
export enum ViMode{
	Normal,
	Insert,
	Visual
}
export enum Key{
	i,
	j,
	esc,
	k
}
var driver :Driver.Driver;

export class Likevi {
	
	/**
	 * mode
	 */
	private mode : ViMode;
	private stroke : string[];
	constructor(driverObj:Driver.Driver){
		driver = driverObj;
		this.mode = ViMode.Normal;
	}
	public pushKey(key :Key){
		if(key == Key.i){
			this.mode = ViMode.Insert;
		}
		if(key == Key.j){
			if(this.mode == ViMode.Normal){
				vscode2.commands.executeCommand("cursorDown");			
			}else{
				driver.getInsertTextCurrentPosition("j");
			}
		}
		if(key == Key.k){
			if(this.mode == ViMode.Normal){
				vscode2.commands.executeCommand("cursorUp");			
			}else{
				driver.getInsertTextCurrentPosition("k");
			}
		}
		if(key == Key.esc){
			this.mode = ViMode.Normal;
		}
	}
}