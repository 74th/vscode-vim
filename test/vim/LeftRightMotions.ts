export let LeftRightMotions = {};

LeftRightMotions["h: left"] = {
    "h": {
        "in": ["abc| def"],
        "key": "h",
        "out": ["ab|c def"]
    },
    "3h": {
        "in": ["abcdef|g"],
        "key": "3h",
        "out": ["abc|defg"]
    },
};
LeftRightMotions["l: right"] = {
    "l": {
        "in": ["abc| def"],
        "key": "l",
        "out": ["abc |def"]
    },
    "3l": {
        "in": ["a|bcdefg"],
        "key": "3l",
        "out": ["abcd|efg"]
    }
};

LeftRightMotions["f: to the Nth occurrence of {char} to the right"] = {
    "fx": {
        "in": [
            "ab|cdefghi"
        ],
        "key": "ff",
        "out": [
            "abcde|fghi"
        ]
    },
    "2fx": {
        "in": [
            "ab|cdefghifghi"
        ],
        "key": "2ff",
        "out": [
            "abcdefghi|fghi"
        ]
    },
    "df": {
        "in": [
            "ab|cdefghiabcdefghi"
        ],
        "key": "dff",
        "out": [
            "ab|ghiabcdefghi"
        ]
    },
    "d2f": {
        "in": [
            "ab|cdefghiabcdefghi"
        ],
        "key": "d2ff",
        "out": [
            "ab|ghi"
        ]
    },
};
LeftRightMotions["F: to the Nth occurrence of {char} to the left"] = {
    "Fx": {
        "in": [
            "abcdefg|hi"
        ],
        "key": "Fc",
        "out": [
            "ab|cdefghi"
        ]
    },
    "2Fx": {
        "in": [
            "abcdefabcdefg|hi"
        ],
        "key": "2Fc",
        "out": [
            "ab|cdefabcdefghi"
        ]
    },
    "dFx": {
        "in": [
            "abcdefg|hi"
        ],
        "key": "dFc",
        "out": [
            "ab|hi"
        ]
    },
    "d2Fx": {
        "in": [
            "abcdefabcdefg|hi"
        ],
        "key": "d2Fc",
        "out": [
            "ab|hi"
        ]
    }
};
LeftRightMotions["t: till before the Nth occurrence of {char} to the right"] = {
    "tx": {
        "in": [
            "ab|cdefghi"
        ],
        "key": "tf",
        "out": [
            "abcd|efghi"
        ]
    },
    "2tf": {
        "in": [
            "ab|cdefghiabcdefghi"
        ],
        "key": "2tf",
        "out": [
            "abcdefghiabcd|efghi"
        ]
    },
    "dtf": {
        "in": [
            "ab|cdefghiabcdefghi"
        ],
        "key": "dtf",
        "out": [
            "ab|fghiabcdefghi"
        ]
    },
    "d2tf": {
        "in": [
            "ab|cdefghiabcdefghi"
        ],
        "key": "d2tf",
        "out": [
            "ab|fghi"
        ]
    },
};
LeftRightMotions["T: till before the Nth occurrence of {char} to the left"] = {
    "Tx": {
        "in": [
            "abcdefg|hi"
        ],
        "key": "Tc",
        "out": [
            "abc|defghi"
        ]
    },
    "dTx": {
        "in": [
            "abcdefg|hi"
        ],
        "key": "dTc",
        "out": [
            "abc|hi"
        ]
    },
    "2Tx": {
        "in": [
            "abcdefgabcdefg|hi"
        ],
        "key": "2Tc",
        "out": [
            "abc|defgabcdefghi"
        ]
    },
    "d2Tx": {
        "in": [
            "abcdefgabcdefg|hi"
        ],
        "key": "d2Tc",
        "out": [
            "abc|hi"
        ]
    }
};
LeftRightMotions[";: repeat the last \"f\", \"F\", \"t\", or \"T\" N times"] = {
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
    },
    "fx2;": {
        "in": [
            "ab|cdefghiadbcdefghiadbcdefghi"
        ],
        "key": "ff2;",
        "out": [
            "abcdefghiadbcdefghiadbcde|fghi"
        ]
    },
    "fxd;": {
        "in": [
            "ab|cdefghiadbcdefghi"
        ],
        "key": "ffd;",
        "out": [
            "abcde|ghi"
        ]
    },
    "fxd2;": {
        "in": [
            "ab|cdefghiadbcdefghiadbcdefghi"
        ],
        "key": "ffd2;",
        "out": [
            "abcde|ghi"
        ]
    },
};
LeftRightMotions[",: repeat the last \"f\", \"F\", \"t\", or \"T\" N times in opposite direction"] = {
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
    },
    "fx2,": {
        "in": [
            "abcdefghabcdef|ghiabcdefghi"
        ],
        "key": "fc2,",
        "out": [
            "ab|cdefghabcdefghiabcdefghi"
        ]
    },
    "fxd,": {
        "in": [
            "abcdefghabcdef|ghiabcdefghi"
        ],
        "key": "fcd,",
        "out": [
            "abcdefghab|cdefghi"
        ]
    },
    "fxd2,": {
        "in": [
            "abcdefghabcdef|ghiabcdefghi"
        ],
        "key": "fcd2,",
        "out": [
            "ab|cdefghi"
        ]
    },
};