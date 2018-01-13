export let TextObjects: { [key: string]: { [key: string]: any } } = {};

TextObjects["delete inner word"] = {
    "diw": {
        in: ["aaa b|bb ccc ddd"],
        key: "diw",
        out: ["aaa | ccc ddd"],
    },
    "d2iw": {
        in: ["aaa b|bb ccc ddd"],
        key: "d2iw",
        out: ["aaa |ccc ddd"],
    },
    "d2iw 2": {
        in: ["aaa b|bb$ccc ddd"],
        key: "d2iw",
        out: ["aaa |ccc ddd"],
    },
    "d2iw 3": {
        in: ["aaa bbb ccc d|dd "],
        key: "d2iw",
        out: ["aaa bbb ccc |"],
    },
    "d3iw": {
        in: ["aaa b|bb ccc ddd"],
        key: "d3iw",
        out: ["aaa | ddd"],
    },
    "d2iw for lf": {
        in: [
            "aaa b|bb",
            "ccc ddd",
        ],
        key: "d2iw",
        out: ["aaa | ddd"],
    },
    "d2iw for if and space": {
        in: [
            "aaa b|bb ",
            "ccc ddd",
        ],
        key: "d2iw",
        out: [
            "aaa| ",
            "ccc ddd",
        ],
    },
    "d3iw for lf": {
        in: [
            "aaa b|bb",
            "ccc ddd",
        ],
        key: "d3iw",
        out: ["aaa |ddd"],
    },
    "d3iw for lf and space": {
        in: [
            "aaa b|bb ",
            "ccc ddd",
        ],
        key: "d3iw",
        out: [
            "aaa | ddd",
        ],
    },
};
TextObjects["delete outer word"] = {
    "daw": {
        in: ["aaa b|bb ccc ddd"],
        key: "daw",
        out: ["aaa |ccc ddd"],
    },
    "daw 2": {
        in: ["aaa b|bb$ccc ddd"],
        key: "daw",
        out: ["aaa|$ccc ddd"],
    },
    "daw 4": {
        in: ["aaa bbb ccc d|dd"],
        key: "daw",
        out: ["aaa bbb ccc|"],
    },
    "daw 5": {
        in: ["aaa bbb ccc d|dd "],
        key: "daw",
        out: ["aaa bbb ccc |"],
    },
    "daw 3": {
        in: ["aaa$b|bb$ccc ddd"],
        key: "daw",
        out: ["aaa$|$ccc ddd"],
    },
    "d2aw": {
        in: ["aaa b|bb ccc ddd"],
        key: "d2aw",
        out: ["aaa |ddd"],
    },
    "d2aw 2": {
        in: ["aaa b|bb$ccc ddd"],
        key: "d2aw",
        out: ["aaa|ccc ddd"],
    },
    "d3aw": {
        in: ["aaa b|bb ccc ddd"],
        key: "d3aw",
        out: ["aa|a"],
    },
    "d2aw for lf": {
        in: [
            "aaa b|bb",
            "ccc ddd",
        ],
        key: "d2aw",
        out: ["aaa |ddd"],
    },
    "d2aw for if and space": {
        in: [
            "aaa b|bb ",
            "ccc ddd",
        ],
        key: "d2aw",
        out: [
            "aaa |ddd",
        ],
    },
    "d3aw for lf": {
        in: [
            "aaa b|bb",
            "ccc ddd eee",
        ],
        key: "d3aw",
        out: ["aaa |eee"],
    },
    "d3aw for lf and space": {
        in: [
            "aaa b|bb ",
            "ccc ddd eee",
        ],
        key: "d3aw",
        out: [
            "aaa |eee",
        ],
    },
};

TextObjects["di("] = {
    "di(": {
        in: ["(  (|  ) )"],
        key: "di(",
        out: ["(  (|) )"],
    },
    "d2i)": {
        in: ["( ( ) (|  ) ( ) )"],
        key: "d2i)",
        out: ["(|)"],
    },
    "di{": {
        in: ["{  {|  } }"],
        key: "di{",
        out: ["{  {|} }"],
    },
    "d2i}": {
        in: ["{ { } {|  } { } }"],
        key: "d2i}",
        out: ["{|}"],
    },
    "di<": {
        in: ["<  <|  > >"],
        key: "di<",
        out: ["<  <|> >"],
    },
    "d2i>": {
        in: ["< < > <|  > < > >"],
        key: "d2i>",
        out: ["<|>"],
    },
    "di[": {
        in: ["[  [|  ] ]"],
        key: "di[",
        out: ["[  [|] ]"],
    },
    "d2i]": {
        in: ["[ [ ] [|  ] [ ] ]"],
        key: "d2i]",
        out: ["[|]"],
    },
    "d3i[": {
        in: ["[ [ ] [|  ] [ ] ]"],
        key: "d3i]",
        out: ["[ [ ] [|  ] [ ] ]"],
    },
};

TextObjects["da("] = {
    "da(": {
        in: ["(  (|  ) )"],
        key: "da(",
        out: ["(  | )"],
    },
    "d2a)": {
        in: [" ( ( ) (|  ) ( ) ) "],
        key: "d2a)",
        out: [" | "],
    },
    "da{": {
        in: ["{  {|  } }"],
        key: "da{",
        out: ["{  | }"],
    },
    "d2a}": {
        in: [" { { } {|  } { } } "],
        key: "d2a}",
        out: [" | "],
    },
    "da<": {
        in: ["<  <|  > >"],
        key: "da<",
        out: ["<  | >"],
    },
    "d2a>": {
        in: [" < < > <|  > < > > "],
        key: "d2a>",
        out: [" | "],
    },
    "da[": {
        in: ["[  [|  ] ]"],
        key: "da[",
        out: ["[  | ]"],
    },
    "d2a]": {
        in: [" [ [ ] [|  ] [ ] ] "],
        key: "d2a]",
        out: [" | "],
    },
    "d3a[": {
        in: ["[ [ ] [|  ] [ ] ]"],
        key: "d3a]",
        out: ["[ [ ] [|  ] [ ] ]"],
    },
};

TextObjects["di'"] = {
    "di'": {
        in: ["'  '|  ' '"],
        key: "di'",
        out: ["'  '|' '"],
    },
    "di\"": {
        in: ["\"  \"|  \" \""],
        key: "di\"",
        out: ["\"  \"|\" \""],
    },
    "di`": {
        in: ["`  `|  ` `"],
        key: "di`",
        out: ["`  `|` `"],
    },
};

TextObjects["da'"] = {
    "da'": {
        in: ["'  '|  ' '"],
        key: "da'",
        out: ["'  |'"],
    },
    "da\"": {
        in: ["\"  \"|  \" \""],
        key: "da\"",
        out: ["\"  |\""],
    },
    "da`": {
        in: ["`  `|  ` `"],
        key: "da`",
        out: ["`  |`"],
    },
};
