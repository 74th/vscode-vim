import {VirtualEditor} from "./VirtualEditor";
import {Position,VimStyle} from "../src/VimStyle";
import {VimStyleTests} from "./VimStyleTests";
var assert = require("assert");

var ed = new VirtualEditor();
var vim = new VimStyle(ed);

for (var target in VimStyleTests) {
    describe("VimStyle " + target, () => {
        var test = VimStyleTests[target];
        for (var specName in test) {
            (function(specName) {
                it(specName, () => {
                    var spec = test[specName];
                    ed.SetContent(spec["in"]);
                    ed.Type(spec.key);
                    var out = ed.GetContent();
                    assert.equal(out.length,spec.out.length);
                    for (var i = 0; i < spec.out.length; i++) {
                        assert.equal(out[i], spec.out[i]);
                    }
                });
            })(specName);
        }
    });
} 