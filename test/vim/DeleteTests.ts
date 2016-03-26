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
    }
};