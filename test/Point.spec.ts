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
    it("test cloning construct", () => {
        const p1 = new Point([3.0,4.0]);
        const p2 = p1.clone();
        expect(p1.getCoordinate()).to.deep.equal(p2.getCoordinate());
        expect(p2.getType()).to.equal("Point");
        expect(p2.isEmpty()).to.equal(false);
    });
    it("test cloning empty point", () => {
        const p1 = new Point();
        const p2 = p1.clone();
        expect(p1.getCoordinate()).to.deep.equal(p2.getCoordinate());
        expect(p2.isEmpty()).to.equal(true);
    });
    it("test cloning translation", () => {
        const p1 = new Point([3.0,4.0]);
        const p2 = p1.clone();
        const dx = 2;
        const dy = -2;
        expect(p1.getCoordinate()).to.deep.equal(p2.getCoordinate());
        p2.translate(dx,dy);
        expect(p1.getCoordinate()).not.to.deep.equal(p2.getCoordinate());
    });
});

