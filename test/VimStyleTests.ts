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
        },
        "k:move to prev line":{
            "in" :[
                "aaaa",
                "bb|bb",
                "cccc"
            ],
            "key":"k",
            "out":[
                "aa|aa",
                "bbbb",
                "cccc"
            ]
        }
        // TODO UP
    },
    "Forward char motion": {
        "fx:move to the charactor":{
            "in":[
                "ab|cdefghi"
            ],
            "key": "ff",
            "out":[
                "abcde|fghi"
            ]
        },
        "tx:move to before the charactor":{
            "in":[
                "ab|cdefghi"
            ],
            "key": "tf",
            "out":[
                "abcd|efghi"
            ]
        },
        "Fx:move to the charactor":{
            "in":[
                "abcdefg|hi"
            ],
            "key": "Fc",
            "out":[
                "ab|cdefghi"
            ]
        },
        "Tx:move to before the charactor":{
            "in":[
                "abcdefg|hi"
            ],
            "key": "Tc",
            "out":[
                "abc|defghi"
            ]
        }
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
