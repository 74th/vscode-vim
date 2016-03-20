export let VimStyleTests = {
    "Spec": {
        "Basic": {
            "in": ["abc|def"],
            "key": "",
            "out": ["abc|def"]
        }
    },
    "Right Motion": {
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
    },
    "Word motion": {
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
        "2b:move to next word": {
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
        }
    },
    "Down Motion": {
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
    },
    "Forward char motion": {
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
    },
    "Insert Mode": {
        "i:insert charactors": {
            "in": ["aa|aa"],
            "key": "ibc_",
            "out": ["aab|caa"]
        },
        "a:append charctors": {
            "in": ["aa|aa"],
            "key": "abc_",
            "out": ["aaab|ca"]
        },
        "I:insert charactors to home of a line": {
            "in": ["aa|aa"],
            "key": "Ibc_",
            "out": ["b|caaaa"]
        },
        "A:append charactors to end of a line": {
            "in": ["aa|aa"],
            "key": "Abc_",
            "out": ["aaaab|c"]
        }
    }
};
