import { ChangingText } from "./ChangingText";
import { CopyAndMovingTextTests } from "./CopyAndMovingTextTests";
import { DeletingText } from "./DeletingTextTests";
import { InsertModeTests } from "./InsertModeTests";
import { LeftRightMotions } from "./LeftRightMotions";
import { RepeatTests } from "./RepeatTests";
import { TextObjectMotions } from "./TextObjectMotions";
import { TextObjects } from "./TextObjects";
import { UpDownMotions } from "./UpDownMotions";

export let VimTests = {};
let testsets = [
    LeftRightMotions,
    UpDownMotions,
    TextObjectMotions,
    InsertModeTests,
    ChangingText,
    DeletingText,
    CopyAndMovingTextTests,
    RepeatTests,
    TextObjects,
];

for (let testset in testsets) {
    for (let test in testsets[testset]) {
        VimTests[test] = testsets[testset][test];
    }
}
