import "mocha";
import { expect } from "chai";
import Point from "../src/Point";

describe("test Point", () => {
    it("test default constructor", () => {
        const p = new Point();
        expect(p.getCoordinate()).to.deep.equal([]);
        expect(Number.isNaN(p.x()));
        expect(Number.isNaN(p.y()));
        expect(p.getType()).to.equal("Point");
        expect(p.isEmpty()).to.equal(true);
    });
    it("test constructor with coordinates", () => {
        const p = new Point([3.0,4.0]);
        expect(p.getCoordinate()).to.deep.equal([3.0,4.0]);
        expect(p.x()).to.equal(3.0);
        expect(p.y()).to.equal(4.0);
        expect(p.isEmpty()).to.equal(false);
    });
    it("test point translation", () => {
        const p = new Point([3.0,4.0]);
        const dx = 2;
        const dy = -2;
        p.translate(dx,dy);
        expect(p.x()).to.equal(5);
        expect(p.y()).to.equal(2);
    });
    it("test translation with empty point", () => {
        const p = new Point();
        const dx = 2;
        const dy = -2;
        p.translate(dx,dy);
        expect(p.x()).to.deep.equal(Number.NaN);
        expect(p.y()).to.deep.equal(Number.NaN);
    });
});

