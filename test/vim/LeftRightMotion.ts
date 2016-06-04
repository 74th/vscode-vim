export let LeftRightMotion = {};

LeftRightMotion["left"] = {
    "h:": {
        "in": ["abc| def"],
        "key": "h",
        "out": ["ab|c def"]
    },
    "3h:": {
        "in": ["abcdef|g"],
        "key": "3h",
        "out": ["abc|defg"]
    },
};
LeftRightMotion["right"] = {
    "l:": {
        "in": ["abc| def"],
        "key": "l",
        "out": ["abc |def"]
    },
    "3l:": {
        "in": ["a|bcdefg"],
        "key": "3l",
        "out": ["abcd|efg"]
    }
};

LeftRightMotion["to the Nth occurrence of {char} to the right"] = {
    "fx:": {
        "in": [
            "ab|cdefghi"
        ],
        "key": "ff",
        "out": [
            "abcde|fghi"
        ]
    }
};
LeftRightMotion["to the Nth occurrence of {char} to the left"] = {
    "Fx:": {
        "in": [
            "abcdefg|hi"
        ],
        "key": "Fc",
        "out": [
            "ab|cdefghi"
        ]
    }
};
LeftRightMotion["till before the Nth occurrence of {char} to the right"] = {
    "tx:": {
        "in": [
            "ab|cdefghi"
        ],
        "key": "tf",
        "out": [
            "abcd|efghi"
        ]
    }
};
LeftRightMotion["	till before the Nth occurrence of {char} to the left"] = {
    "Tx:": {
        "in": [
            "abcdefg|hi"
        ],
        "key": "Tc",
        "out": [
            "abc|defghi"
        ]
    }
};