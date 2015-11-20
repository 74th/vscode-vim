import * as Driver from "./extension";
import * as vscode2 from 'vscode';
export enum ViMode {
	Normal,
	Insert
}
export enum Key {
	h,
	i,
	j,
	k,
	l,
	esc
}
var driver: Driver.Driver;

export class Vim {
	
	/**
	 * mode
	 */
	private mode: ViMode;
	private stroke: string[];
	constructor(driverObj: Driver.Driver) {
		driver = driverObj;
		this.mode = ViMode.Normal;
	}
	public pushKey(key: Key) {
		console.log("mode:" + this.mode);
		if (key == Key.esc) {
			console.log("to normalmode");
			this.mode = ViMode.Normal;
			driver.hideSuggest();
		}
		if (this.mode == ViMode.Insert) {
			this.inputDirectKey(key);
			return;
		}
		if (key == Key.h) {
			driver.moveLeft();
			return;
		}
		if (key == Key.i) {
			console.log("to insertmode");
			this.mode = ViMode.Insert;
			return;
		}
		if (key == Key.j) {
			driver.moveDown();
			return;
		}
		if (key == Key.k) {
			driver.moveUp();
			return;
		}
		if (key == Key.l) {
			driver.moveRight();
			return;
		}
	}
	private inputDirectKey(key: Key) {
		var s: string = null;
		switch (key) {
			case Key.h:
				s = "h";
				break;
			case Key.i:
				s = "i";
				break;
			case Key.j:
				s = "j";
				break;
			case Key.k:
				s = "k";
				break;
			case Key.l:
				s = "l";
				break;
		}
		if (s != null) {
			driver.insertTextCurrentPosition(s);
		}
	}
}