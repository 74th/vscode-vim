export let MotionTests = {};

MotionTests["charactor motion"] = {
    "l:move to right 1": {
        "in": ["abc| def"],
        "key": "l",
        "out": ["abc |def"]
    },
    "3l:move to right 3": {
        "in": ["a|bcdefg"],
        "key": "3l",
        "out": ["abcd|efg"]
    },
    "h:move to left 1": {
        "in": ["abc| def"],
        "key": "h",
        "out": ["ab|c def"]
    },
    "3h:move to left 3": {
        "in": ["abcdef|g"],
        "key": "3h",
        "out": ["abc|defg"]
    }
};

MotionTests["line motion"] = {
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
    "2k:move up over a short line": {
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

MotionTests["word motion"] = {
    "2w:move to next word": {
        "in": ["ab|c abc abc abc"],
        "key": "2w",
        "out": ["abc abc |abc abc"]
    },
    "w:stop document end": {
        "in": ["ab|c abc"],
        "key": "3w",
        "out": ["abc ab|c"]
    },
    "w:stop line end": {
        "in": [
            "ab|c abc",
            "abc abc"
        ],
        "key": "2w",
        "out": [
            "abc abc",
            "|abc abc"
        ]
    },
    "2w:move to next word(not skip marks)": {
        "in": ["ab|c abc(abc) abc"],
        "key": "2w",
        "out": ["abc abc|(abc) abc"]
    },
    "2W:move to next word(skip marks)": {
        "in": ["ab|c abc(abc) abc"],
        "key": "2W",
        "out": ["abc abc(abc) |abc"]
    },
    "2w:move to next word(not skip blank line)": {
        "in": [
            "ab|c abc",
            "",
            "",
            "abd abd"
        ],
        "key": "4w",
        "out": [
            "abc abc",
            "",
            "",
            "|abd abd"
        ],
    },
    "2b:move to before word": {
        "in": ["abc abc ab|c abc"],
        "key": "2b",
        "out": ["abc |abc abc abc"]
    },
    "b:stop document start": {
        "in": ["abc a|bc"],
        "key": "3b",
        "out": ["|abc abc"]
    },
    "b:stop line start": {
        "in": [
            "abc abc",
            "abc ab|c"
        ],
        "key": "3b",
        "out": [
            "abc |abc",
            "abc abc"
        ]
    },
    "3b:move to before word(not skip marks)": {
        "in": ["abc abc(abc) a|bc"],
        "key": "3b",
        "out": ["abc abc(|abc) abc"]
    },
    "2B:move to before word(skip marks)": {
        "in": ["abc abc(abc) a|bc"],
        "key": "2B",
        "out": ["abc |abc(abc) abc"]
    },
    "4b:move to before word(not skip blank line)": {
        "in": [
            "abc abc",
            "",
            "",
            "ab|d abd"
        ],
        "key": "4b",
        "out": [
            "abc |abc",
            "",
            "",
            "abd abd"
        ],
    },
    "2e:move to next word end": {
        "in": ["a|bc abc abc abc"],
        "key": "2e",
        "out": ["abc ab|c abc abc"]
    },
    "e:stop document end": {
        "in": ["a|bc abc"],
        "key": "3e",
        "out": ["abc ab|c"]
    },
    "e:stop line end": {
        "in": [
            "ab|c abc",
            "abc abc"
        ],
        "key": "2e",
        "out": [
            "abc abc",
            "ab|c abc"
        ]
    },
    "e:move to next word end(not skip marks)": {
        "in": ["a|bc abc(abc) abc"],
        "key": "4e",
        "out": ["abc abc(ab|c) abc"]
    },
    "E:move to before word(skip marks)": {
        "in": ["a|bc abc(abc) abc"],
        "key": "2E",
        "out": ["abc abc(abc|) abc"]
    },
    "2e:move to next wordend(skip blank line)": {
        "in": [
            "ab|c abc",
            "",
            "",
            "abd abd"
        ],
        "key": "2e",
        "out": [
            "abc abc",
            "",
            "",
            "ab|d abd"
        ],
    },
};
MotionTests["Down Motion"] = {
    "j:move to down 1": {
        "in": [
            "aaaaaaa",
            "bbbb|bbb",
            "ccccccc"
        ],
        "key": "j",
        "out": [
            "aaaaaaa",
            "bbbbbbb",
            "cccc|ccc"
        ]
    },
    "k:move to prev line": {
        "in": [
            "aaaa",
            "bb|bb",
            "cccc"
        ],
        "key": "k",
        "out": [
            "aa|aa",
            "bbbb",
            "cccc"
        ]
    }
    // TODO UP
};
MotionTests["forward char motion"] = {
    "fx:move to the charactor": {
        "in": [
            "ab|cdefghi"
        ],
        "key": "ff",
        "out": [
            "abcde|fghi"
        ]
    },
    "tx:move to before the charactor": {
        "in": [
            "ab|cdefghi"
        ],
        "key": "tf",
        "out": [
            "abcd|efghi"
        ]
    },
    "Fx:move to the charactor": {
        "in": [
            "abcdefg|hi"
        ],
        "key": "Fc",
        "out": [
            "ab|cdefghi"
        ]
    },
    "Tx:move to before the charactor": {
        "in": [
            "abcdefg|hi"
        ],
        "key": "Tc",
        "out": [
            "abc|defghi"
        ]
    }
};