import {MotionTests} from "./MotionTests"
import {InsertModeTests} from "./InsertModeTests"

export let VimTests = {};
let testsets = [
    MotionTests,
    InsertModeTests
];

for(let testset in testsets ){
    for (let test in testsets[testset]) {
        VimTests[test] = testsets[testset][test];
    }
}