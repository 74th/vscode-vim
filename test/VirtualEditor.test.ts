import {VirtualEditor} from "./VirtualEditor";
import {Position, VimStyle} from "../src/VimStyle";
import {VimTests} from "./vim/VimTests";
let assert = require("assert");

let ed = new VirtualEditor();
let opt: IVimStyleOptions = {
    useErgonomicKeyForMotion: false
};
let vim = new VimStyle(ed, opt);

let target;
for (target in VimTests) {
    describe("VimStyle " + target, () => {
        let test = VimTests[target];
        for (let specName in test) {
            (function(specName) {
                it(specName, () => {
                    let spec = test[specName];
                    ed.SetContent(spec["in"]);
                    ed.Type(spec.key);
                    let out = ed.GetContent();
                    assert.equal(out.length, spec.out.length);
                    for (let i = 0; i < spec.out.length; i++) {
                        assert.equal(out[i], spec.out[i]);
                    }
                });
            })(specName);
        }
    });
}