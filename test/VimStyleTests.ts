export let VimStyleTests = {
    "Spec": {
        "Basic": {
            "in": ["abc|def"],
            "key": "",
            "out":["abc|def"]
        }
    },
    "Right Motion": {
        "l:move to right 1": {
            "in": ["abc| def"],
            "key": "l",
            "out": ["abc |def"]
        },
        "3l:move to right 3": {
            "in": ["a|bcdefg"],
            "key": "3l",
            "out": ["abcd|efg"]
        },
        "h:move to left 1": {
            "in": ["abc| def"],
            "key": "h",
            "out": ["ab|c def"]
        },
        "3h:move to left 3": {
            "in": ["abcdef|g"],
            "key": "3h",
            "out": ["abc|defg"]
        }
    },
    "Down Motion": {
        "j:move to down 1": {
            "in": [
                "aaaaaaa",
                "bbbb|bbb",
                "ccccccc"
            ],
            "key": "j",
            "out": [
                "aaaaaaa",
                "bbbbbbb",
                "cccc|ccc"
            ]
        }
        // TODO UP
    },
    "Insert Mode": {
        "i:insert charactors": {
            "in": ["aa|aa"],
            "key": "ibc_",
            "out": ["aab|caa"]
        },
        "a:append charctors":{
            "in":["aa|aa"],
            "key": "abc_",
            "out":["aaab|ca"]
        },
        "I:insert charactors to home of a line":{
            "in":["aa|aa"],
            "key":"Ibc_",
            "out":["b|caaaa"]
        },
        "A:append charactors to end of a line":{
            "in":["aa|aa"],
            "key":"Abc_",
            "out":["aaaab|c"]
        }
    }
};
