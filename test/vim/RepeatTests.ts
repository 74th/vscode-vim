export let RepeatTests = {};

RepeatTests["repeat insert"] = {
    "repeat insert text": {
        "in": [
            "|abc",
        ],
        "key": "adef_$.",
        "out": [
            "adefbcde|f",
        ]
    },
    "repeat insert text containing LF": {
        "in": [
            "|abc",
            "ABC",
        ],
        "key": "Adef\nghe_j.",
        "out": [
            "abcdef",
            "ghe",
            "ABCdef",
            "gh|e"
        ]
    },
    "repeat insert text to new line": {
        "in": [
            "a|bc"
        ],
        "key": "odef_.",
        "out": [
            "abc",
            "def",
            "de|f"
        ]
    },
    "repeat cut command": {
        "in": [
            "aaa |bbb ccc ddd",
        ],
        "key": "cwkkk_2w.",
        "out": [
            "aaa kkk ccc kk|k"
        ]
    }
};
RepeatTests["repeat normal command"] = {
    "add text": {
        "in": [
            "aaa |bbb ccc ddd",
        ],
        "key": "dw.",
        "out": [
            "aaa |ddd",
        ]
    }
};