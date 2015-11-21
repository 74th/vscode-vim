import * as Enums from "./VimStyleEnums"

export function KeyToNum(key: Enums.Key): number {
	switch (key) {
		case Enums.Key.n0:
			return 0;
		case Enums.Key.n1:
			return 1;
		case Enums.Key.n2:
			return 2;
		case Enums.Key.n3:
			return 3;
		case Enums.Key.n4:
			return 4;
		case Enums.Key.n5:
			return 5;
		case Enums.Key.n6:
			return 6;
		case Enums.Key.n7:
			return 7;
		case Enums.Key.n8:
			return 8;
		case Enums.Key.n9:
			return 9;
		default:
			throw new Error("Panic!");
	}
}

export function KeyToChar(key: Enums.Key): string {
	switch (key) {
		case Enums.Key.a:
			return "a";
	}
}