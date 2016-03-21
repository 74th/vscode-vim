import {VirtualEditor} from "./VirtualEditor";
import {Position, VimStyle} from "../src/VimStyle";
import {VimTests} from "./vim/VimTests";
let assert = require("assert");

let opt: IVimStyleOptions = {
    useErgonomicKeyForMotion: false
};

let target;
for (target in VimTests) {
    describe("VimStyle " + target, () => {
        let test = VimTests[target];
        for (let specName in test) {
            (function(specName) {
                it(specName, () => {
                    let spec = test[specName];
                    let ed = new VirtualEditor();
                    let vim = new VimStyle(ed, opt);
                    ed.SetContent(spec["in"]);
                    ed.Type(spec.key);
                    let out = ed.GetContent();
                    assert.equal(out.length, spec.out.length);
                    let outText = out[0];
                    let specText = spec.out[0];
                    for (let i = 1; i < spec.out.length; i++) {
                        outText += "\n" + out[i];
                        specText += "\n" + spec.out[i];
                    }
                    assert.equal(outText, specText);
                });
            })(specName);
        }
    });
}