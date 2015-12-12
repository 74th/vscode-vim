export let VimStyleTests = {
    "Right Motion": {
        "move to right 1": {
            "in": ["abc| def"],
            "key": "l",
            "out": ["abc |def"]
        },
        "move to right 3": {
            "in": ["a|bcdefg"],
            "key": "3l",
            "out": ["abcd|efg"]
        },
        "move to left 1": {
            "in": ["abc| def"],
            "key": "h",
            "out": ["ab|c def"]
        },
        "move to left 3": {
            "in": ["abcdef|g"],
            "key": "3h",
            "out": ["abc|defg"]
        }
    },
    "Down Motion": {
        "move to down 1": {
            "in": [
                "aaaaaaa",
                "bbbb|bbb",
                "cccccccc"
            ],
            "key": "j",
            "out": [
                "aaaaaaa",
                "bbbbbbb",
                "cccc|ccc"
            ]
        }
        // TODO UP
    },
    "Insert Mode": {
        "insert char": {
            "in": ["aa|aa"],
            "key": "ibc_",
            "out": ["aabca|a"]
        }
    }
};
