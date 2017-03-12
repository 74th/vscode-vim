export let ChangingText = {};

ChangingText["replace character"] = {
    "r:replace character": {
        in: ["a|aa"],
        key: "rb",
        out: ["a|ba"],
    },
    "Nr:replace characters": {
        in: ["a|aaaa"],
        key: "4rb",
        out: ["abbb|b"],
    },
    "Nr:fail replacing": {
        in: ["a|aaaa"],
        key: "5rb",
        out: ["a|aaaa"],
    },
    "gr:replace character": {
        in: ["a|aa"],
        key: "grb",
        out: ["a|ba"],
    },
    "Ngr:replace characters withou affecting layout": {
        in: ["a|a"],
        key: "5grb",
        out: ["abbbb|b"],
    },
    "v..r:replace character": {
        in: ["a|aaaa"],
        key: "v2lrb",
        out: ["a|bbba"],
    },
};
