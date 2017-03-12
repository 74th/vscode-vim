export let CopyAndMovingTextTests = {};

CopyAndMovingTextTests["Ny{motion}: yank the text moved over with {motion} into a register"] = {
    "y2w:yank 2 words:": {
        in: [
            "abc |def ghi jkl",
            "mnopqr",
        ],
        key: "y2wjp0",
        out: [
            "abc def ghi jkl",
            "|mnopqdef ghi r",
        ],
    },
};
