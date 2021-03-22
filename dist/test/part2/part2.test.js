"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const part2_1 = require("../../src/part2/part2");
describe("Assignment 1 Part 2", () => {
    describe("countVowels", () => {
        it("counts vowels", () => {
            chai_1.expect(part2_1.countVowels("This is SOME Text")).to.equal(5);
        });
    });
    describe("runLengthEncoding", () => {
        it("compresses a string", () => {
            chai_1.expect(part2_1.runLengthEncoding("aaaabbbccd")).to.equal("a4b3c2d");
        });
    });
    describe("isPaired", () => {
        it("returns true for a string with paired parens", () => {
            chai_1.expect(part2_1.isPaired("([{}])")).to.be.true;
        });
        it("returns false when the parens are not paired", () => {
            chai_1.expect(part2_1.isPaired("(]")).to.be.false;
        });
    });
});
//# sourceMappingURL=part2.test.js.map