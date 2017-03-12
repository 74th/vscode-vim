import * as assert from "assert";
import { Position, VimStyle } from "../src/VimStyle";
import { VimTests } from "./vim/VimTests";
import { VirtualEditor } from "./VirtualEditor";

let opt: IVimStyleOptions = {
    useErgonomicKeyForMotion: false,
    vimrc: [],
};

let target;
for (target in VimTests) {
    describe("VimStyle " + target + ".", () => {
        let test = VimTests[target];
        for (let specName in test) {
            it(specName, () => {
                let spec = test[specName];
                let ed = new VirtualEditor();
                let vim = new VimStyle(ed, opt);
                ed.SetContent(spec["in"]);
                ed.Type(spec.key);
                let out = ed.GetContent();
                let outText = out[0];
                let specText = spec.out[0];
                for (let i = 1; i < out.length; i++) {
                    outText += "\n" + out[i];
                }
                for (let i = 1; i < spec.out.length; i++) {
                    specText += "\n" + spec.out[i];
                }
                assert.equal(outText, specText);
            });
        }
    });
}
