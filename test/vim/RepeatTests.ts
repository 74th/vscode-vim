export let RepeatTests = {};

RepeatTests["repeat insert"] = {
    "add text to current position": {
        "in": [
            "|abc",
        ],
        "key": "adef_$.",
        "out": [
            "adefbcde|f",
        ]
    },
    "add text to new line": {
        "in": [
            "a|bc"
        ],
        "key": "odef_.",
        "out": [
            "abc",
            "def",
            "de|f"
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