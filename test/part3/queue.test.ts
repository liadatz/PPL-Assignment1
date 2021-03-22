import { expect } from "chai";
import * as Q from "../../src/part3/queue";

describe("Queue", () => {
    it("can enqueue", () => {
        expect(Q.enqueue(5)([1, 2, 3])).to.deep.equal([[1, 2, 3, 5], undefined]);
    });

    it("can dequeue", () => {
        expect(Q.dequeue([1, 2, 3])).to.deep.equal([[2, 3], 1]);
    });

    it("returns the expected result from the assignment example", () => {
        expect(Q.queueManip([6, 7, 8])).to.deep.equal([[8, 12, 2], 7]);
    });
});