import {VirtualEditor} from "./VirtualEditor";
import {Position, VimStyle} from "../src/VimStyle";
import {VimTests} from "./vim/VimTests";
let assert = require("assert");
let exec = require("child_process").exec;
let fs = require("fs");

for (let target in VimTests) {
    describe("NeoVim" + target, function() {
        this.timeout(500);
        let test = VimTests[target];
        for (let specName in test) {
            (function(specName) {
                it(specName, function(done) {
                    let spec = test[specName];
                    let text = spec["in"][0];
                    for (let i = 1; i < spec["in"].length; i++) {
                        text += "\n" + spec["in"][i];
                    }
                    fs.writeFile("NeoVimInput", text);
                    text = "/|\n";
                    text += ":normal x\n";
                    let list = spec["key"].split("_");
                    for (let i = 0; i < list.length; i++) {
                        text += ":exe \":normal " + list[i].replace("\n", "\\<CR>") + "\"\n";
                    }
                    text += ":normal i|\n";
                    text += ":w! NeoVimOutput\n";
                    text += ":q!\n";
                    fs.writeFile("NeoVimKey", text);
                    let child = exec("nvim -u NONE -s NeoVimKey NeoVimInput");
                    child.on("exit", function() {
                        let i = 0;
                        fs.readFile("NeoVimOutput", function(err, text) {
                            let out = text.toString().split("\n");
                            let outText = out[0];
                            let specText = spec.out[0];
                            for (let i = 1; i < spec["out"].length; i++) {
                                outText += "\n" + out[i];
                                specText += "\n" + spec.out[i];
                            }
                            assert.equal(outText, specText);
                            done();
                        });
                    });
                });
            })(specName);
        }
    });
} 