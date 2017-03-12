export let DeletingText = {};

DeletingText["Nx:delete N characters under and after the cursor"] = {
    "x:delete charactor": {
        in: ["a|bc"],
        key: "x",
        out: ["a|c"],
    },
    "3x:delete 3 charactors": {
        in: ["a|bcdef"],
        key: "3x",
        out: ["a|ef"],
    },
};

DeletingText["NX:delete N characters before the cursor"] = {
    "X:delete previous charactor": {
        in: ["ab|c"],
        key: "X",
        out: ["a|c"],
    },
    "3X:delete 3 previous charactors": {
        in: ["abcd|ef"],
        key: "3X",
        out: ["a|ef"],
    },
};

// Nd{motion} dw cw and others are in TextObjectMotion.js

// {visual}d
DeletingText["{visual}d:delete the highlighted text"] = {
    "vwld:delete visual text": {
        in: [
            "a|bc def ghe",
        ],
        key: "vwld",
        out: [
            "a|f ghe",
        ],
    },
};

DeletingText["Ndd:delete N lines"] = {
    "dd:delete line": {
        in: [
            "abc",
            "d|ef",
            "ghe",
        ],
        key: "dd",
        out: [
            "abc",
            "|ghe",
        ],
    },
    "3dd:delete 3 lines": {
        in: ["a", "|b", "c", "d", "e", "f"],
        key: "3dd",
        out: ["a", "|e", "f"],
    },
};

// ND
// N3D not support
