export let DeleteTests = {};

DeleteTests["delete charactor"] = {
    "x:delete charactor": {
        "in": ["a|bc"],
        "key": "x",
        "out": ["a|c"],
    }
};

DeleteTests["delete word"] = {
    "dw:delete one word": {
        "in": ["aaa |bbb ccc"],
        "key": "dw",
        "out": ["aaa |ccc"],
    },
    "dw:delete a word at end of line": {
        "in": [
            "aaa |BCD",
            "ccc ddd",
        ],
        "key": "dw",
        "out": [
            "aaa| ",
            "ccc ddd",
        ],
    },
    "dw:delete a word at end of document": {
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
    "dw:delete spaces tailled the word": {
        "in": [
            "aaa |bbb   ",
            "ccc ddd",
        ],
        "key": "dw",
        "out": [
            "aaa| ",
            "ccc ddd",
        ],
    },
    "cw:do not cut spaces tailled the word": {
        "in": [
            "aaa |bbb ccc",
        ],
        "key": "cweee_",
        "out": [
            "aaa ee|e ccc",
        ],
    },
};