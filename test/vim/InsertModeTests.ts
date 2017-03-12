export let InsertModeTests = {};

// ESC Key : _

InsertModeTests["Insert Mode"] = {
    "i:insert charactors": {
        in: ["aa|aa"],
        key: "ibc_",
        out: ["aab|caa"],
    },
    "a:append charctors": {
        in: ["aa|aa"],
        key: "abc_",
        out: ["aaab|ca"],
    },
    "I:insert charactors to home of a line": {
        in: ["aa|aa"],
        key: "Ibc_",
        out: ["b|caaaa"],
    },
    "A:append charactors to end of a line": {
        in: ["aa|aa"],
        key: "Abc_",
        out: ["aaaab|c"],
    },
};
