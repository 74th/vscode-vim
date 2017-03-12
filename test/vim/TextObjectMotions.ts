export let TextObjectMotions = {};

TextObjectMotions["w: N words forward"] = {
    "2w": {
        in: ["ab|c abc abc abc"],
        key: "2w",
        out: ["abc abc |abc abc"],
    },
    "w:stop document end": {
        in: ["ab|c abc"],
        key: "3w",
        out: ["abc ab|c"],
    },
    "w:stop line end": {
        in: [
            "ab|c abc",
            "abc abc",
        ],
        key: "2w",
        out: [
            "abc abc",
            "|abc abc",
        ],
    },
    "w:word start at first charactor": {
        in: ["|abc abc"],
        key: "w",
        out: ["abc |abc"],
    },
    "w:word start at space": {
        in: ["| abc abc"],
        key: "w",
        out: [" |abc abc"],
    },
    "w:word start at 2 spaces": {
        in: [" | abc abc"],
        key: "w",
        out: ["  |abc abc"],
    },
    "2w:move to next word(not skip marks)": {
        in: ["ab|c abc(abc) abc"],
        key: "2w",
        out: ["abc abc|(abc) abc"],
    },
    "4w:move to next word(not skip blank line)": {
        in: [
            "ab|c abc",
            "",
            "",
            "abd abd",
        ],
        key: "4w",
        out: [
            "abc abc",
            "",
            "",
            "|abd abd",
        ],
    },
    "w:move from mark": {
        in: ["tree|.Len()"],
        key: "w",
        out: ["tree.|Len()"],
    },
    "dw:delete one word": {
        in: ["aaa |bbb ccc"],
        key: "dw",
        out: ["aaa |ccc"],
    },
    "dw:delete first word": {
        in: ["|aaa bbb ccc"],
        key: "dw",
        out: ["|bbb ccc"],
    },
    "dw:delete last word": {
        in: ["aaa bbb |ccc"],
        key: "dw",
        out: ["aaa bbb| "],
    },
    "dw:delete a word at end of line": {
        in: [
            "aaa |BCD",
            "ccc ddd",
        ],
        key: "dw",
        out: [
            "aaa| ",
            "ccc ddd",
        ],
    },
    "dw:delete a word at end of document": {
        in: [
            "aaa bbb",
            "ccc |ddd",
        ],
        key: "dw",
        out: [
            "aaa bbb",
            "ccc| ",
        ],
    },
    "dw:delete spaces tailled the word": {
        in: [
            "aaa |bbb   ",
            "ccc ddd",
        ],
        key: "dw",
        out: [
            "aaa| ",
            "ccc ddd",
        ],
    },
    "dw:delete only one word in line": {
        in: [
            "aaa",
            "|bbb",
            "ccc",
        ],
        key: "dw",
        out: [
            "aaa",
            "|",
            "ccc",
        ],
    },
    "dw:delete start space line": {
        in: [
            " |   aaa",
        ],
        key: "dw",
        out: [
            " |aaa",
        ],
    },
    "cw:do not cut spaces tailled the word": {
        in: [
            "aaa |bbb ccc",
        ],
        key: "cweee_",
        out: [
            "aaa ee|e ccc",
        ],
    },
    "cw:delete two words at a first position": {
        in: [
            "|aaa",
            "bbb",
        ],
        key: "cwccc_",
        out: [
            "cc|c",
            "bbb",
        ],
    },
    "vwd:": {
        in: [
            "aaa |BCD",
            "ccc ddd",
        ],
        key: "vwd",
        out: [
            "aaa |cc ddd",
        ],
    },
};

TextObjectMotions["NW:N blank-separated"] = {
    "2W:move to next word(skip marks)": {
        in: ["ab|c abc(abc) abc"],
        key: "2W",
        out: ["abc abc(abc) |abc"],
    },
    "d2W:": {
        in: ["ab|c abc(abc) abc"],
        key: "d2W",
        out: ["ab|abc"],
    },
    "v2Wd:": {
        in: ["ab|c abc(abc) abc"],
        key: "v2Wd",
        out: ["ab|bc"],
    },
};

TextObjectMotions["Ne: forward to the end of the Nth word"] = {
    "2e:move to next word end": {
        in: ["a|bc abc abc abc"],
        key: "2e",
        out: ["abc ab|c abc abc"],
    },
    "e:stop document end": {
        in: ["a|bc abc"],
        key: "3e",
        out: ["abc ab|c"],
    },
    "e:stop line end": {
        in: [
            "ab|c abc",
            "abc abc",
        ],
        key: "2e",
        out: [
            "abc abc",
            "ab|c abc",
        ],
    },
    "e:move to next word end(not skip marks)": {
        in: ["a|bc abc(abc) abc"],
        key: "4e",
        out: ["abc abc(ab|c) abc"],
    },
    "2e:move to next wordend(skip blank line)": {
        in: [
            "ab|c abc",
            "",
            "",
            "abd abd",
        ],
        key: "2e",
        out: [
            "abc abc",
            "",
            "",
            "ab|d abd",
        ],
    },
    "e:cursor is in word": {
        in: ["aaaa bbb|bbbbb cccc dddd"],
        key: "e",
        out: ["aaaa bbbbbbb|b cccc dddd"],
    },
    "de:delete word without following space": {
        in: ["aaa b|bb ccc"],
        key: "de",
        out: ["aaa b| ccc"],
    },
    "ved:": {
        in: ["aaa b|bb ccc"],
        key: "ved",
        out: ["aaa b| ccc"],
    },
};
TextObjectMotions["NE: forward to the end of the Nth blank-separated"] = {
    "E:move to before word(skip marks)": {
        in: ["a|bc abc(abc) abc"],
        key: "2E",
        out: ["abc abc(abc|) abc"],
    },
    "vEd:": {
        in: ["a|bc abc(abc) abc"],
        key: "v2Ed",
        out: ["a| abc"],
    },
};

TextObjectMotions["Nb: N words backward"] = {
    "2b:move to before word": {
        in: ["abc abc ab|c abc"],
        key: "2b",
        out: ["abc |abc abc abc"],
    },
    "b:stop document start": {
        in: ["abc a|bc"],
        key: "3b",
        out: ["|abc abc"],
    },
    "b:start at 2 space": {
        in: ["abc abc| "],
        key: "b",
        out: ["abc |abc "],
    },
    "b:start at space": {
        in: ["abc abc|$ "],
        key: "b",
        out: ["abc |abc$ "],
    },
    "3b:stop line start": {
        in: [
            "abc abc",
            "abc ab|c",
        ],
        key: "3b",
        out: [
            "abc |abc",
            "abc abc",
        ],
    },
    "3b:move to before word(not skip marks)": {
        in: ["abc abc(abc) a|bc"],
        key: "3b",
        out: ["abc abc(|abc) abc"],
    },
    "4b:move to before word(not skip blank line)": {
        in: [
            "abc abc",
            "",
            "",
            "ab|d abd",
        ],
        key: "4b",
        out: [
            "abc |abc",
            "",
            "",
            "abd abd",
        ],
    },
    "db:delete before a word if sursor in first character of a word": {
        in: [
            "zzz",
            "aaa |bbb ccc",
            "zzz",
        ],
        key: "db",
        out: [
            "zzz",
            "|bbb ccc",
            "zzz",
        ],
    },
    "vbd": {
        in: [
            "zzz",
            "aaa |bbb ccc",
            "zzz",
        ],
        key: "vbd",
        out: [
            "zzz",
            "|bb ccc",
            "zzz",
        ],
    },
};

TextObjectMotions["NB: N blank-separated"] = {
    "2B:move to before word(skip marks)": {
        in: ["abc abc(abc) a|bc"],
        key: "2B",
        out: ["abc |abc(abc) abc"],
    },
    "d2B": {
        in: ["abc abc(abc) a|bc"],
        key: "d2B",
        out: ["abc |bc"],
    },
    "v2Bd": {
        in: ["abc abc(abc) a|bc"],
        key: "v2Bd",
        out: ["abc |c"],
    },
};

TextObjectMotions["N{: N paragraphs forward"] = {
    "2{:move to next blank line (start at the blank line)": {
        in: [
            "aaaa",
            "",
            "bbbb",
            "",
            "cccc",
            "",
            "|",
        ],
        key: "2{",
        out: [
            "aaaa",
            "|",
            "bbbb",
            "",
            "cccc",
            "",
            "",
        ],
    },
    "2{:move to next blank line (start at the non blank line)": {
        in: [
            "aaaa",
            "",
            "bbbb",
            "",
            "cccc|",
        ],
        key: "2{",
        out: [
            "aaaa",
            "|",
            "bbbb",
            "",
            "cccc",
        ],
    },
    "2{:stop at first line": {
        in: [
            "aaaa",
            "",
            "bbbb|",
        ],
        key: "2{",
        out: [
            "|aaaa",
            "",
            "bbbb",
        ],
    },
    "d2{": {
        in: [
            "aaaa",
            "",
            "bbbb",
            "",
            "cccc",
            "",
            "|",
        ],
        key: "d2{",
        out: [
            "aaaa",
            "|",
        ],
    },
    "v2{d": {
        in: [
            "aaaa",
            "",
            "bbbb",
            "",
            "cccc",
            "",
            "|",
        ],
        key: "v2{d",
        out: [
            "aaaa",
            "|",
        ],
    },
};

TextObjectMotions["N}: N paragraphs backward"] = {
    "2}:move to next blank line (start at the blank line)": {
        in: [
            "|",
            "",
            "aaaa",
            "",
            "bbbb",
            "",
            "cccc",
        ],
        key: "2}",
        out: [
            "",
            "",
            "aaaa",
            "",
            "bbbb",
            "|",
            "cccc",
        ],
    },
    "2}:move to next blank line (start at the non blank line)": {
        in: [
            "aaaa|",
            "",
            "bbbb",
            "",
            "cccc",
        ],
        key: "2}",
        out: [
            "aaaa",
            "",
            "bbbb",
            "|",
            "cccc",
        ],
    },
    "2}:stop at the last line": {
        in: [
            "aaaa|",
            "",
            "bbbb",
        ],
        key: "2}",
        out: [
            "aaaa",
            "",
            "bbb|b",
        ],
    },
    "d2}": {
        in: [
            "|",
            "",
            "aaaa",
            "",
            "bbbb",
            "",
            "cccc",
        ],
        key: "d2}",
        out: [
            "|",
            "cccc",
        ],
    },
    "v2}d": {
        in: [
            "|",
            "",
            "aaaa",
            "",
            "bbbb",
            "",
            "cccc",
        ],
        key: "v2}d",
        out: [
            "|cccc",
        ],
    },
};

TextObjectMotions["xx:N times back to unclosed x"] = {
    "hit first left brancket": {
        in: [
            "func( func( me| ) );;",
        ],
        key: "[(",
        out: [
            "func( func|( me ) );;",
        ],
    },
    "hit second left brancket": {
        in: [
            "func( func( me| ) );;",
        ],
        key: "2[(",
        out: [
            "func|( func( me ) );;",
        ],
    },
    "go to first brancket": {
        in: [
            "func( func( me| ) );;",
        ],
        key: "3[(",
        out: [
            "func|( func( me ) );;",
        ],
    },
    "hit second left brancket include an other brancket pair": {
        in: [
            "func( func( two ) func( me| ) );;",
        ],
        key: "2[(",
        out: [
            "func|( func( two ) func( me ) );;",
        ],
    },
    "hit second left brancket include lines": {
        in: [
            "func(",
            "  func(",
            "    me|",
            "  )",
            ");;",
        ],
        key: "2[(",
        out: [
            "func|(",
            "  func(",
            "    me",
            "  )",
            ");;",
        ],
    },
    "hit first right brancket": {
        in: [
            "func( func( me| ) );;",
        ],
        key: "])",
        out: [
            "func( func( me |) );;",
        ],
    },
    "hit second right brancket": {
        in: [
            "func( func( me| ) );;",
        ],
        key: "2])",
        out: [
            "func( func( me ) |);;",
        ],
    },
    "go to last brancket": {
        in: [
            "func( func( me| ) );;",
        ],
        key: "100])",
        out: [
            "func( func( me ) |);;",
        ],
    },
    "hit second right brancket include lines": {
        in: [
            "func(",
            "  func(",
            "    |me",
            "  )",
            ");;",
        ],
        key: "2])",
        out: [
            "func(",
            "  func(",
            "    me",
            "  )",
            "|);;",
        ],
    },
    "hit first left curly brancket": {
        in: [
            "func{ func{ me| } };;",
        ],
        key: "[{",
        out: [
            "func{ func|{ me } };;",
        ],
    },
    "hit first right curly brancket": {
        in: [
            "func{ func{ me| } };;",
        ],
        key: "]}",
        out: [
            "func{ func{ me |} };;",
        ],
    },
    "d[(: delete to first left brancket": {
        in: [
            "func( func( me| ) );;",
        ],
        key: "d[(",
        out: [
            "func( func| ) );;",
        ],
    },
    "d]): delete to first righy brancket": {
        in: [
            "func( func( me| ) );;",
        ],
        key: "d])",
        out: [
            "func( func( me|) );;",
        ],
    },
    "v[(d": {
        in: [
            "func( func( me| ) );;",
        ],
        key: "v[(d",
        out: [
            "func( func|) );;",
        ],
    },
    "v])d": {
        in: [
            "func( func( me| ) );;",
        ],
        key: "v])d",
        out: [
            "func( func( me| );;",
        ],
    },
};
