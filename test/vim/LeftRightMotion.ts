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
LeftRightMotion["till before the Nth occurrence of {char} to the left"] = {
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
LeftRightMotion["repeat the last \"f\", \"F\", \"t\", or \"T\" N times"] = {
    "fx;": {
        "in": [
            "ab|cdefghiadbcdefghi"
        ],
        "key": "ff;",
        "out": [
            "abcdefghiadbcde|fghi"
        ]
    },
    "Fx;": {
        "in": [
            "abcdefghiabcdefg|hi"
        ],
        "key": "Fc;",
        "out": [
            "ab|cdefghiabcdefghi"
        ]
    },
    "tx;": {
        "in": [
            "ab|cdefghiabcdefghi"
        ],
        "key": "tf;",
        "out": [
            "abcd|efghiabcdefghi"
        ]
    },
    "Tx;": {
        "in": [
            "abcdefghiabcdefg|hi"
        ],
        "key": "Tc;",
        "out": [
            "abcdefghiabc|defghi"
        ]
    }
};
LeftRightMotion["repeat the last \"f\", \"F\", \"t\", or \"T\" N times in opposite direction"] = {
    "fx,": {
        "in": [
            "abcdef|ghiabcdefghi"
        ],
        "key": "fc,",
        "out": [
            "ab|cdefghiabcdefghi"
        ]
    },
    "Fx,": {
        "in": [
            "abcdefghia|dbcdefghi"
        ],
        "key": "Ff,",
        "out": [
            "abcdefghiadbcde|fghi"
        ]
    },
    "tx,": {
        "in": [
            "abcdef|ghiabcdefghi"
        ],
        "key": "tc,",
        "out": [
            "abc|defghiabcdefghi"
        ]
    },
    "Tx,": {
        "in": [
            "abcdefghi|abcdefghi"
        ],
        "key": "Tf,",
        "out": [
            "abcdefghiabcd|efghi"
        ]
    }
};