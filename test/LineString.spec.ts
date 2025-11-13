import "mocha";
import { expect } from "chai";
import Point from "../src/Point";
import LineString from "../src/LineString";

describe("test LineString", () => {
    it("test default constructor", () => {
        const ls = new LineString();
        expect(ls.getNumPoints()).to.equal(0);
        expect(ls.getPointN(1)).to.equal(undefined);
        expect(ls.getPointN(-1)).to.equal(undefined);
        expect(ls.getType()).to.equal("LineString");
    });
    it("test constructor with coordinates", () => {
        const p1 = new Point([3.0,4.0]);
        const p2 = new Point([1.0,2.0]);
        const ls = new LineString([p1, p2]);
        expect(ls.getNumPoints()).to.equal(2);
        expect(ls.getPointN(0)).to.equal(p1);
        expect(ls.getPointN(1)).to.equal(p2);
    });
    it("should return undefined for single coordinate", () => {
        const p1 = new Point([3.0,4.0]);
        const ls = new LineString([p1]);
        expect(ls.getNumPoints()).to.equal(0);
        expect(ls.getPointN(0)).to.equal(undefined);
    });
});

