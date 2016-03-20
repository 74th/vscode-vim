import {VirtualEditor} from "./VirtualEditor";
import {Position, VimStyle} from "../src/VimStyle";
import {VimStyleTests} from "./VimStyleTests";
let assert = require("assert");
let exec = require("child_process").exec;
let fs = require("fs");

for (let target in VimStyleTests) {
    describe("OriginalVim" + target, function() {
        this.timeout(500);
        let test = VimStyleTests[target];
        for (let specName in test) {
            (function(specName) {
                it(specName, function(done) {
                    let spec = test[specName];
                    let text = spec["in"][0];
                    for (let i = 1; i < spec["in"].length; i++) {
                        text += "\n" + spec["in"][i];
                    }
                    fs.writeFile("OriginalVimInput", text);
                    text = "/|\n";
                    text += ":normal x\n";
                    let list = spec["key"].split("_");
                    for (let i = 0; i < list.length; i++) {
                        text += ":normal " + list[i] + "\n";
                    }
                    text += ":normal i|\n";
                    text += ":w! OriginalVimOutput\n";
                    text += ":q!\n";
                    fs.writeFile("OriginalVimKey", text);
                    let child = exec("vim -u NONE -s OriginalVimKey OriginalVimInput");
                    child.on("exit", function() {
                        let i = 0;
                        fs.readFile("OriginalVimOutput", function(err, text) {
                            let out = text.toString().split("\n");
                            assert.equal(out.length - 1, spec["out"].length);
                            for (let i = 0; i < spec["out"].length; i++) {
                                assert.equal(out[i], spec["out"][i]);
                            }
                            done();
                        });
                    });
                });
            })(specName);
        }
    });
} 