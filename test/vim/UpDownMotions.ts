export let UpDownMotions = {};

UpDownMotions["line motion"] = {
    "j:move down": {
        in: [
            "abc d|ef",
            "abc",
            "abc def",
        ],
        key: "j",
        out: [
            "abc def",
            "ab|c",
            "abc def",
        ],
    },
    "2j:move down over a short line": {
        in: [
            "abcd|efg",
            "b",
            "abcdefg",
        ],
        key: "2j",
        out: [
            "abcdefg",
            "b",
            "abcd|efg",
        ],
    },
    "3j:move to last line": {
        in: [
            "abcd|efg",
            "b",
            "abcdefg",
        ],
        key: "3j",
        out: [
            "abcdefg",
            "b",
            "abcd|efg",
        ],
    },
    "v2j:move down over a short line in visual mode": {
        in: [
            "abcd|efg",
            "b",
            "abcdefg",
        ],
        key: "v2jd",
        out: [
            "abcd|fg",
        ],
    },
    "k:move up": {
        in: [
            "abc def",
            "abc",
            "abc d|ef",
        ],
        key: "k",
        out: [
            "abc def",
            "ab|c",
            "abc def",
        ],
    },
    "kk:move up over a short line": {
        in: [
            "abcdef g",
            "a",
            "abcdef| g",
        ],
        key: "kk",
        out: [
            "abcdef| g",
            "a",
            "abcdef g",
        ],
    },
    "3k:move to first line": {
        in: [
            "abcdef g",
            "a",
            "abcdef| g",
        ],
        key: "3k",
        out: [
            "abcdef| g",
            "a",
            "abcdef g",
        ],
    },
    "vk:move up in visual mode": {
        in: [
            "abc def",
            "abc",
            "abc d|ef",
        ],
        key: "vkd",
        out: [
            "abc def",
            "abc|f",
        ],
    },
    "gg:go to line 1": {
        in: [
            " a",
            "  b",
            "|   c",
            "    d",
            "     e",
        ],
        key: "gg",
        out: [
            " |a",
            "  b",
            "   c",
            "    d",
            "     e",
        ],
    },
    "4gg:go to line 4": {
        in: [
            " a",
            "  b",
            "|   c",
            "    d",
            "     e",
        ],
        key: "4gg",
        out: [
            " a",
            "  b",
            "   c",
            "    |d",
            "     e",
        ],
    },
    // #56 https://github.com/74th/vscode-vim/issues/56
    // "dgg:delete line between first and current line": {
    //     "in": [
    //         " a",
    //         "  b",
    //         "|   c",
    //         "    d",
    //         "     e"
    //     ],
    //     "key": "dgg",
    //     "out": [
    //         "    |d",
    //         "     e"
    //     ],
    // },
    // "cgg:cut line between first and current line": {
    //     "in": [
    //         " a",
    //         "  b",
    //         "|   c",
    //         "    d",
    //         "     e"
    //     ],
    //     "key": "cgg",
    //     "out": [
    //         "|",
    //         "    d",
    //         "     e"
    //     ],
    // },
    // "d4gg:delete lines between current adn 4": {
    //     "in": [
    //         " a",
    //         "  b",
    //         "|   c",
    //         "    d",
    //         "     e"
    //     ],
    //     "key": "d4gg",
    //     "out": [
    //         " a",
    //         "  b",
    //         "     |e"
    //     ],
    // },
    "G:go to final line": {
        in: [" a", " b", "| c", " d", " e"],
        key: "G",
        out: [" a", " b", " c", " d", " |e"],
    },
    "4G:go to line 4": {
        in: [" a", " b", "| c", " d", " e"],
        key: "4G",
        out: [" a", " b", " c", " |d", " e"],
    },
    // #56 https://github.com/74th/vscode-vim/issues/56
    // "dG:delete lines between first and final line": {
    //     "in": [" a", " b", "| c", " d", " e"],
    //     "key": "dG",
    //     "out": [" a", " |b"],
    // },
    // "d4G:delete lines between current adn 4": {
    //     "in": [
    //         " a",
    //         "  b",
    //         "|   c",
    //         "    d",
    //         "     e"
    //     ],
    //     "key": "d4G",
    //     "out": [
    //         " a",
    //         "  b",
    //         "     |e"
    //     ],
    // },
};
