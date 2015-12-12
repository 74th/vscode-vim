import {VirtualEditor} from "./VirtualEditor";
import {Position,VimStyle} from "../src/VimStyle";
import {VimStyleTests} from "./VimStyleTests";
var assert = require("assert");
var exec = require("child_process").exec;
var fs = require("fs");

for (var target in VimStyleTests) {
	describe("NeoVim" + target, function(){
		this.timeout(500);
		var test = VimStyleTests[target];
		for (var specName in test) {
			(function(specName) {
				it(specName, function(done) {
					var spec = test[specName];
					var text = spec["in"][0];
					for (var i = 1; i < spec["in"].length; i++) {
						text += "\n" + spec["in"][i];
					}
					fs.writeFile("NeoVimInput", text);
					text = "/|\n";
					text += ":normal x\n";
					var list = spec["key"].split("_");
					for (var i = 0; i < list.length; i++){
						text += ":normal " + list[i] + "\n";
					}
					text += ":normal i|\n";
					text += ":w! NeoVimOutput\n";
					text += ":q!\n";
					fs.writeFile("NeoVimKey", text);
					var child = exec("nvim -u NONE -s NeoVimKey NeoVimInput");
					child.on("exit", function() {
						var i = 0;
						fs.readFile("NeoVimOutput", function(err, text) {
							var out = text.toString().split("\n");
							assert.equal(out.length -1, spec["out"].length);
							for (var i = 0; i < spec["out"].length; i++){
								assert.equal(out[i],spec["out"][i]);
							}
							done();
						});
					});
				});
			})(specName);
		}
	});
} 