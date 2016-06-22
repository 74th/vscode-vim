export let TextObjectMotions = {};

TextObjectMotions["w: N words forward"] = {
    "2w": {
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
    "w:word start at first charactor": {
        "in": ["|abc abc"],
        "key": "w",
        "out": ["abc |abc"]
    },
    "w:word start at space": {
        "in": ["| abc abc"],
        "key": "w",
        "out": [" |abc abc"]
    },
    "w:word start at 2 spaces": {
        "in": [" | abc abc"],
        "key": "w",
        "out": ["  |abc abc"]
    },
    "2w:move to next word(not skip marks)": {
        "in": ["ab|c abc(abc) abc"],
        "key": "2w",
        "out": ["abc abc|(abc) abc"]
    },
    "4w:move to next word(not skip blank line)": {
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
    "w:move from mark": {
        "in": ["tree|.Len()"],
        "key": "w",
        "out": ["tree.|Len()"]
    },
    "dw:delete one word": {
        "in": ["aaa |bbb ccc"],
        "key": "dw",
        "out": ["aaa |ccc"],
    },
    "dw:delete first word": {
        "in": ["|aaa bbb ccc"],
        "key": "dw",
        "out": ["|bbb ccc"],
    },
    "dw:delete last word": {
        "in": ["aaa bbb |ccc"],
        "key": "dw",
        "out": ["aaa bbb| "],
    },
    "dw:delete a word at end of line": {
        "in": [
            "aaa |BCD",
            "ccc ddd",
        ],
        "key": "dw",
        "out": [
            "aaa| ",
            "ccc ddd",
        ],
    },
    "dw:delete a word at end of document": {
        "in": [
            "aaa bbb",
            "ccc |ddd",
        ],
        "key": "dw",
        "out": [
            "aaa bbb",
            "ccc| ",
        ],
    },
    "dw:delete spaces tailled the word": {
        "in": [
            "aaa |bbb   ",
            "ccc ddd",
        ],
        "key": "dw",
        "out": [
            "aaa| ",
            "ccc ddd",
        ],
    },
    "dw:delete only one word in line": {
        "in": [
            "aaa",
            "|bbb",
            "ccc"
        ],
        "key": "dw",
        "out": [
            "aaa",
            "|",
            "ccc"
        ],
    },
    "cw:do not cut spaces tailled the word": {
        "in": [
            "aaa |bbb ccc",
        ],
        "key": "cweee_",
        "out": [
            "aaa ee|e ccc",
        ],
    },
}

TextObjectMotions["NW:N blank-separated"] = {
    "2W:move to next word(skip marks)": {
        "in": ["ab|c abc(abc) abc"],
        "key": "2W",
        "out": ["abc abc(abc) |abc"]
    }
}

TextObjectMotions["Ne: forward to the end of the Nth word"] = {
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
    "e:cursor is in word": {
        "in": ["aaaa bbb|bbbbb cccc dddd"],
        "key": "e",
        "out": ["aaaa bbbbbbb|b cccc dddd"]
    }
};
TextObjectMotions["NE: forward to the end of the Nth blank-separated"] = {
    "E:move to before word(skip marks)": {
        "in": ["a|bc abc(abc) abc"],
        "key": "2E",
        "out": ["abc abc(abc|) abc"]
    },
};

TextObjectMotions["Nb: N words backward"] = {
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
    "b:start at 2 space": {
        "in": ["abc abc| "],
        "key": "b",
        "out": ["abc |abc "]
    },
    "b:start at space": {
        "in": ["abc abc|$ "],
        "key": "b",
        "out": ["abc |abc$ "]
    },
    "3b:stop line start": {
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
    "db:delete before a word if sursor in first character of a word": {
        "in": [
            "zzz",
            "aaa |bbb ccc",
            "zzz",
        ],
        "key": "db",
        "out": [
            "zzz",
            "|bbb ccc",
            "zzz",
        ],
    }
};

TextObjectMotions["NB: N blank-separated"] = {
    "2B:move to before word(skip marks)": {
        "in": ["abc abc(abc) a|bc"],
        "key": "2B",
        "out": ["abc |abc(abc) abc"]
    }
};
