export let LeftRightMotions = {};

LeftRightMotions["h: left"] = {
    "h": {
        in: ["abc| def"],
        key: "h",
        out: ["ab|c def"],
    },
    "3h": {
        in: ["abcdef|g"],
        key: "3h",
        out: ["abc|defg"],
    },
    "ch": {
        in: ["abc| def"],
        key: "dh",
        out: ["ab| def"],
    },
    "c3h": {
        in: ["abcdef|g"],
        key: "d3h",
        out: ["abc|g"],
    },
    "vh": {
        in: ["abc| def"],
        key: "vhd",
        out: ["ab|def"],
    },
    "v3h": {
        in: ["abcdef|gh"],
        key: "v3hd",
        out: ["abc|h"],
    },
};
LeftRightMotions["l: right"] = {
    "l": {
        in: ["abc| def"],
        key: "l",
        out: ["abc |def"],
    },
    "3l": {
        in: ["a|bcdefg"],
        key: "3l",
        out: ["abcd|efg"],
    },
    "cl": {
        in: ["abc| def"],
        key: "dl",
        out: ["abc|def"],
    },
    "c3l": {
        in: ["a|bcdefg"],
        key: "d3l",
        out: ["a|efg"],
    },
    "vl": {
        in: ["abc| def"],
        key: "vld",
        out: ["abc|ef"],
    },
    "v3l": {
        in: ["a|bcdefg"],
        key: "v3ld",
        out: ["a|fg"],
    },
};

LeftRightMotions["f: to the Nth occurrence of {char} to the right"] = {
    "fx": {
        in: [
            "ab|cdefghi",
        ],
        key: "ff",
        out: [
            "abcde|fghi",
        ],
    },
    "2fx": {
        in: [
            "ab|cdefghifghi",
        ],
        key: "2ff",
        out: [
            "abcdefghi|fghi",
        ],
    },
    "dfx": {
        in: [
            "ab|cdefghiabcdefghi",
        ],
        key: "dff",
        out: [
            "ab|ghiabcdefghi",
        ],
    },
    "d2fx": {
        in: [
            "ab|cdefghiabcdefghi",
        ],
        key: "d2ff",
        out: [
            "ab|ghi",
        ],
    },
    "vfxd": {
        in: [
            "ab|cdefghi",
        ],
        key: "vffd",
        out: [
            "ab|ghi",
        ],
    },
    "v2fxd": {
        in: [
            "ab|cdefghiabcdefghi",
        ],
        key: "v2ffd",
        out: [
            "ab|ghi",
        ],
    },
};
LeftRightMotions["F: to the Nth occurrence of {char} to the left"] = {
    "Fx": {
        in: [
            "abcdefg|hi",
        ],
        key: "Fc",
        out: [
            "ab|cdefghi",
        ],
    },
    "2Fx": {
        in: [
            "abcdefabcdefg|hi",
        ],
        key: "2Fc",
        out: [
            "ab|cdefabcdefghi",
        ],
    },
    "dFx": {
        in: [
            "abcdefg|hi",
        ],
        key: "dFc",
        out: [
            "ab|hi",
        ],
    },
    "d2Fx": {
        in: [
            "abcdefabcdefg|hi",
        ],
        key: "d2Fc",
        out: [
            "ab|hi",
        ],
    },
    "vFxd": {
        in: [
            "abcdefg|hi",
        ],
        key: "vFcd",
        out: [
            "ab|i",
        ],
    },
    "v2Fxd": {
        in: [
            "abcdefabcdefg|hi",
        ],
        key: "v2Fcd",
        out: [
            "ab|i",
        ],
    },
};
LeftRightMotions["t: till before the Nth occurrence of {char} to the right"] = {
    "tx": {
        in: [
            "ab|cdefghi",
        ],
        key: "tf",
        out: [
            "abcd|efghi",
        ],
    },
    "2tf": {
        in: [
            "ab|cdefghiabcdefghi",
        ],
        key: "2tf",
        out: [
            "abcdefghiabcd|efghi",
        ],
    },
    "dtf": {
        in: [
            "ab|cdefghiabcdefghi",
        ],
        key: "dtf",
        out: [
            "ab|fghiabcdefghi",
        ],
    },
    "d2tf": {
        in: [
            "ab|cdefghiabcdefghi",
        ],
        key: "d2tf",
        out: [
            "ab|fghi",
        ],
    },
    "vtxd": {
        in: [
            "ab|cdefghi",
        ],
        key: "vtfd",
        out: [
            "ab|fghi",
        ],
    },
    "v2tfd": {
        in: [
            "ab|cdefghiabcdefghi",
        ],
        key: "v2tfd",
        out: [
            "ab|fghi",
        ],
    },
};
LeftRightMotions["T: till before the Nth occurrence of {char} to the left"] = {
    "Tx": {
        in: [
            "abcdefg|hi",
        ],
        key: "Tc",
        out: [
            "abc|defghi",
        ],
    },
    "2Tx": {
        in: [
            "abcdefgabcdefg|hi",
        ],
        key: "2Tc",
        out: [
            "abc|defgabcdefghi",
        ],
    },
    "dTx": {
        in: [
            "abcdefg|hi",
        ],
        key: "dTc",
        out: [
            "abc|hi",
        ],
    },
    "d2Tx": {
        in: [
            "abcdefgabcdefg|hi",
        ],
        key: "d2Tc",
        out: [
            "abc|hi",
        ],
    },
    "vTxd": {
        in: [
            "abcdefg|hi",
        ],
        key: "vTcd",
        out: [
            "abc|i",
        ],
    },
    "v2Txd": {
        in: [
            "abcdefgabcdefg|hi",
        ],
        key: "v2Tcd",
        out: [
            "abc|i",
        ],
    },
};
LeftRightMotions[";: repeat the last \"f\", \"F\", \"t\", or \"T\" N times"] = {
    "fx;": {
        in: [
            "ab|cdefghiadbcdefghi",
        ],
        key: "ff;",
        out: [
            "abcdefghiadbcde|fghi",
        ],
    },
    "Fx;": {
        in: [
            "abcdefghiabcdefg|hi",
        ],
        key: "Fc;",
        out: [
            "ab|cdefghiabcdefghi",
        ],
    },
    "tx;": {
        in: [
            "ab|cdefghiabcdefghi",
        ],
        key: "tf;",
        out: [
            "abcdefghiabcd|efghi",
        ],
    },
    "Tx;": {
        in: [
            "abcdefghiabcdefg|hi",
        ],
        key: "Tc;",
        out: [
            "abc|defghiabcdefghi",
        ],
    },
    "fx2;": {
        in: [
            "ab|cdefghiadbcdefghiadbcdefghi",
        ],
        key: "ff2;",
        out: [
            "abcdefghiadbcdefghiadbcde|fghi",
        ],
    },
    "fxd;": {
        in: [
            "ab|cdefghiadbcdefghi",
        ],
        key: "ffd;",
        out: [
            "abcde|ghi",
        ],
    },
    "fxd2;": {
        in: [
            "ab|cdefghiadbcdefghiadbcdefghi",
        ],
        key: "ffd2;",
        out: [
            "abcde|ghi",
        ],
    },
    "fxv;d": {
        in: [
            "ab|cdefghiadbcdefghi",
        ],
        key: "ffv;d",
        out: [
            "abcde|ghi",
        ],
    },
    "fxv2;d": {
        in: [
            "ab|cdefghiadbcdefghiadbcdefghi",
        ],
        key: "ffv2;d",
        out: [
            "abcde|ghi",
        ],
    },
};
LeftRightMotions[",: repeat the last \"f\", \"F\", \"t\", or \"T\" N times in opposite direction"] = {
    "fx,": {
        in: [
            "abcdef|ghiabcdefghi",
        ],
        key: "fc,",
        out: [
            "ab|cdefghiabcdefghi",
        ],
    },
    "Fx,": {
        in: [
            "abcdefghia|dbcdefghi",
        ],
        key: "Ff,",
        out: [
            "abcdefghiadbcde|fghi",
        ],
    },
    "tx,": {
        in: [
            "abcdef|ghiabcdefghi",
        ],
        key: "tc,",
        out: [
            "abc|defghiabcdefghi",
        ],
    },
    "Tx,": {
        in: [
            "abcdefghi|abcdefghi",
        ],
        key: "Tf,",
        out: [
            "abcdefghiabcd|efghi",
        ],
    },
    "fx2,": {
        in: [
            "abcdefghabcdef|ghiabcdefghi",
        ],
        key: "fc2,",
        out: [
            "ab|cdefghabcdefghiabcdefghi",
        ],
    },
    "fxd,": {
        in: [
            "abcdefghabcdef|ghiabcdefghi",
        ],
        key: "fcd,",
        out: [
            "abcdefghab|cdefghi",
        ],
    },
    "fxd2,": {
        in: [
            "abcdefghabcdef|ghiabcdefghi",
        ],
        key: "fcd2,",
        out: [
            "ab|cdefghi",
        ],
    },
    "vfx,d": {
        in: [
            "abcdefghabcdef|ghiabcdefghi",
        ],
        key: "vfc,d",
        out: [
            "abcdefghab|hiabcdefghi",
        ],
    },
    "vfx2,d": {
        in: [
            "abcdefghabcdef|ghiabcdefghi",
        ],
        key: "vfc2,d",
        out: [
            "ab|hiabcdefghi",
        ],
    },
};
