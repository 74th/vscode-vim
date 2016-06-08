export let UpDownMotions = {};

UpDownMotions["line motion"] = {
    "j:move down": {
        "in": [
            "abc d|ef",
            "abc",
            "abc def"
        ],
        "key": "j",
        "out": [
            "abc def",
            "ab|c",
            "abc def"
        ]
    },
    "2j:move down over a short line": {
        "in": [
            "abcd|efg",
            "b",
            "abcdefg"
        ],
        "key": "2j",
        "out": [
            "abcdefg",
            "b",
            "abcd|efg"
        ]
    },
    "k:move up": {
        "in": [
            "abc def",
            "abc",
            "abc d|ef"
        ],
        "key": "k",
        "out": [
            "abc def",
            "ab|c",
            "abc def"
        ]
    },
    "kk:move up over a short line": {
        "in": [
            "abcdef g",
            "a",
            "abcdef| g"
        ],
        "key": "kk",
        "out": [
            "abcdef| g",
            "a",
            "abcdef g"
        ]
    }
};