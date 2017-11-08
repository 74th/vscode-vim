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
DeletingText["J:join N-1 lines (delete <EOL>s)"] = {
    "J:join 1 line": {
        in: ["a", "|b", "c", "d"],
        key: "J",
        out: ["a", "b| c", "d"],
    },
    "3J:join 3 lines": {
        in: ["a", "|b", "c", "d", "e"],
        key: "3J",
        out: ["a", "b c| d", "e"],
    },
    "3J:join 3 lines including last line": {
        in: ["a", "b", "c", "|d", "e"],
        key: "3J",
        out: ["a", "b", "c", "d| e"],
    },
    "vJ:join 1 lines": {
        in: ["a", "b", "|ccc", "d", "e"],
        key: "vlJ",
        out: ["a", "b", "ccc| d", "e"],
    },
    "vJ:join 3 lines": {
        in: ["a", "|b", "c", "d", "e"],
        key: "vjjJ",
        out: ["a", "b c| d", "e"],
    },
    "vJ:join 3 lines include last line": {
        in: ["a", "b", "|c", "d", "e"],
        key: "vjjJ",
        out: ["a", "b", "c d| e"],
    },
    "VJ:join 1 lines": {
        in: ["a", "b", "|ccc", "d", "e"],
        key: "VlJ",
        out: ["a", "b", "ccc| d", "e"],
    },
    "VJ:join 3 lines": {
        in: ["a", "|b", "c", "d", "e"],
        key: "VjjJ",
        out: ["a", "b c| d", "e"],
    },
    "VJ:join 3 lines include last line": {
        in: ["a", "b", "|c", "d", "e"],
        key: "VjjJ",
        out: ["a", "b", "c d| e"],
    },
};
