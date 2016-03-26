export let DeleteTests = {};

DeleteTests["delete charactor"] = {
    "x:delete charactor": {
        "in": ["a|bc"],
        "key": "x",
        "out": ["a|c"],
    }
};

DeleteTests["delete word"] = {
    "dw:delete one wrod": {
        "in": ["aaa |bbb ccc"],
        "key": "dw",
        "out": ["aaa |ccc"],
    },
    "dw:delete a wrod at end of line": {
        "in": [
            "aaa |bbb",
            "ccc ddd",
        ],
        "key": "dw",
        "out": [
            "aaa| ",
            "ccc ddd",
        ],
    },
    "dw:delete a wrod at end of document": {
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
};