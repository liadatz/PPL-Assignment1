import { expect } from "chai";
import * as S from "../../src/part3/stack";

describe("Stack", () => {
    it("can push", () => {
        expect(S.push(5)([])).to.deep.equal([[5], undefined]);
    });

    it("can pop", () => {
        expect(S.pop([1])).to.deep.equal([[], 1]);
    });

    it("returns the expected result from the assignment example", () => {
        expect(S.stackManip([4, 5, 6])).to.deep.equal([[20, 5, 6], undefined]);
    });
});