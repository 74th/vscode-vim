export let RepeatTests = {};

RepeatTests["repeat insert"] = {
    "a.repeat insert text": {
        in: [
            "|abc",
        ],
        key: "adef_$.",
        out: [
            "adefbcde|f",
        ],
    },
    "A.:repeat insert text containing LF": {
        in: [
            "|abc",
            "ABC",
        ],
        key: "Adef\nghe_j.",
        out: [
            "abcdef",
            "ghe",
            "ABCdef",
            "gh|e",
        ],
    },
    "o.:repeat insert text to new line": {
        in: [
            "a|bc",
        ],
        key: "odef_.",
        out: [
            "abc",
            "def",
            "de|f",
        ],
    },
    "cw.:repeat cut command": {
        in: [
            "aaa |bbb",
            "ccc ddd",
        ],
        key: "c$kkk_jb.",
        out: [
            "aaa kkk",
            "ccc kk|k",
        ],
    },
};
RepeatTests["repeat normal command"] = {
    "add text": {
        in: [
            "aaa |bbb ccc ddd",
        ],
        key: "dw.",
        out: [
            "aaa |ddd",
        ],
    },
};
