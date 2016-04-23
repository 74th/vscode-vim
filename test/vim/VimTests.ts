import {MotionTests} from "./MotionTests";
import {InsertModeTests} from "./InsertModeTests";
import {ChangingText} from "./ChangingText";
import {DeleteTests} from "./DeleteTests";
import {RepeatTests} from "./RepeatTests";

export let VimTests = {};
let testsets = [
    MotionTests,
    InsertModeTests,
    ChangingText,
    DeleteTests,
    RepeatTests
];

for (let testset in testsets ) {
    for (let test in testsets[testset]) {
        VimTests[test] = testsets[testset][test];
    }
}