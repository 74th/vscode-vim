export default {
	"normalMode": {
		"singleAction": {
			"I": "firstInsertAction",
			"A": "endAppendAction",
			"o": "insertLineBelowAction",
			"O": "insertLineAboveAction",
			"x": "characterDeleteAction",
			"X": "characterBeforeDeleteAction",
			"s": "characterDeleteInsertAction",
			"S": "lineDeleteInsertAction",
			"D": "deleteToEndAction",
			"Y": "yancToEndAction",
			"C": "deleteInsertToEndAction",
			"p": "pasteBelowAction",
			"P": "pasteAboveAction"
		},
		"textObjectOrSingleAction": {
			"i": "insertAction",
			"a": "appendAction",
		},
		"requireMotionAction": {
			"d": "deleteAction",
			"y": "yancAction",
			"c": "changeAction"	
		},
		"requireCharMotion": {
			"f": "find",
			"t": "till",
			"F": "findBack",
			"T": "tillBack"	
		},
		"motion": {
			"l": "RightMotion",
			"h": "LeftMotion",
			"j": "DownMotion",
			"k": "UpMotion",
			"$": "EndMotion",
			"w": "ForwardWordMotion",
			"b": "ForwardWordMotion.SetBack"
		},
		"zero": {
			"0": "FirstMotion"
		},
		"numWithoutZero": [
			1,2,3,4,5,6,7,8,9
		],
		
		
	}
}