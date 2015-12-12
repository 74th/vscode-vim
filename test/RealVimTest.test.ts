import {VirtualEditor} from "./VirtualEditor";
import {Position,VimStyle} from "../src/VimStyle";
import {VimStyleTests} from "./VimStyleTests";
var assert = require("assert");
var exec = require("child_process").exec;
var fs = require("fs");

for (var target in VimStyleTests) {
	describe("RealVim" + target, function(){
		this.timeout(500);
		var test = VimStyleTests[target];
		for (var specName in test) {
			(function(specName) {
				it(specName, function(done) {
					var spec = test[specName];
					var text = spec["in"][0].replace("|","");
					for (var i = 1; i < spec["in"].length; i++) {
						text += "\n" + spec["in"][i].replace("|","");
					}
					fs.writeFile("RealVimInput", text);
					text = ":normal gg\n";
					for (var i = 0; i < spec["in"].length; i++) {
						var index = spec["in"][i].indexOf("|");
						if (index != -1) {
							text += ":normal " + (i + 1) + "G0\n";
							if (index > 1) {
								text += ":normal " + (index-1) + "l\n";
							}
							break;
						}
					}
					var list = spec["key"].split("_");
					for (var i = 0; i < list.length; i++){
						text += ":normal " + list[i] + "\n";
					}
					text += ":normal a|\n";
					text += ":w! RealVimOutput\n";
					text += ":q\n";
					fs.writeFile("RealVimKey", text);
					var child = exec("vim -u NONE -s RealVimKey RealVimInput");
					child.on("exit", function() {
						var i = 0;
						fs.readFile("RealVimOutput", function(err, text) {
							console.log("☆" + text.toString());
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