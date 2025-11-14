import "mocha";
import { expect } from "chai";
import Point from "../src/Point";
import LineString from "../src/LineString";
import LogGeometryVisitor from "../src/LogGeometryVisitor";
import WktVisitor from "../src/WktVisitor";
import GeometryWithCachedEnvelope from "../src/GeometryWithCachedEnvelope";

describe("test LineString", () => {
    it("test default constructor", () => {
        const ls = new LineString();
        expect(ls.getNumPoints()).to.equal(0);
        expect(ls.getPointN(1)).to.equal(undefined);
        expect(ls.getPointN(-1)).to.equal(undefined);
        expect(ls.getType()).to.equal("LineString");
        expect(ls.isEmpty()).to.equal(true);
    });
    it("test constructor with coordinates", () => {
        const p1 = new Point([3.0,4.0]);
        const p2 = new Point([1.0,2.0]);
        const ls = new LineString([p1, p2]);
        expect(ls.getNumPoints()).to.equal(2);
        expect(ls.getPointN(0)).to.equal(p1);
        expect(ls.getPointN(1)).to.equal(p2);
        expect(ls.isEmpty()).to.equal(false);
    });
    it("test constructor with empty point list", () => {
        const ls = new LineString([]);
        expect(ls.getNumPoints()).to.equal(0);
        expect(ls.isEmpty()).to.equal(true);
    });
    it("test linestring translation", () => {
            const p1 = new Point([3.0,4.0]);
            const p2 = new Point([1.0,2.0]);
            const ls = new LineString([p1, p2]);
            const dx = 2;
            const dy = -2;
            ls.translate(dx,dy);
            expect(ls.getPointN(0).x()).to.equal(5);
            expect(ls.getPointN(0).y()).to.equal(2);
            expect(ls.getPointN(1).x()).to.equal(3);
            expect(ls.getPointN(1).y()).to.equal(0);
        });
    it("test cloning construct", () => {
            const p1 = new Point([3.0,4.0]);
            const p2 = new Point([1.0,2.0]);
            const ls1 = new LineString([p1, p2]);
            const ls2 = ls1.clone();
            expect(ls1.getPointN(0).x()).to.equal(ls2.getPointN(0).x());
            expect(ls1.getPointN(0).y()).to.equal(ls2.getPointN(0).y());
            expect(ls1.getPointN(1).x()).to.equal(ls2.getPointN(1).x());
            expect(ls1.getPointN(1).y()).to.equal(ls2.getPointN(1).y());
        });


    it("test envelope builder", () => {
        const p1 = new Point([0.0,1.0]);
        const p2 = new Point([2.0,0.0]);
        const p3 = new Point([1.0,3.0]);
        const ls = new LineString([p1, p2, p3]);
        const e = ls.getEnvelope();
        expect(e.toString()).to.equal("[0,0,2,3]"); 
    });

    it("test GeometryVisitor: should work with empty linestring ", () => {
        let result = "";
        const v = new LogGeometryVisitor((message)=>{
            result = message;
        });
        const ls = new LineString();
        ls.accept(v);
        expect(result).to.equal("Je suis une polyligne vide.")
    });

    it("test GeometryVisitor: should work with non empty linestring ", () => {
        let result = "";
        const v = new LogGeometryVisitor((message)=>{
            result = message;
        });
        const p1 = new Point([0.0,1.0]);
        const p2 = new Point([2.0,0.0]);
        const p3 = new Point([1.0,3.0]);
        const ls = new LineString([p1, p2, p3]);
        ls.accept(v);
        expect(result).to.equal("Je suis une polyligne définie par 3 point(s).")
    });

    it("test WktVisitor: should work with empty linestring ", () => {
        const v = new WktVisitor();
        const ls = new LineString();
        ls.accept(v);
        const result = v.getResult();
        expect(result).to.equal("LINESTRING EMPTY")
    });

    it("test WktVisitor: should work with non empty linestring ", () => {
        const v = new WktVisitor();
        const p1 = new Point([3.0,4.0]);
        const p2 = new Point([1.0,2.0]);
        const ls = new LineString([p1, p2]);
        ls.accept(v);
        const result = v.getResult();
        expect(result).to.equal("LINESTRING(3.0 4.0, 1.0 2.0)")
    });

    it("test asText with empty linestring", () => {
        const ls = new LineString();
        const result = ls.asText();
        expect(result).to.equal("LINESTRING EMPTY")
    });
    
    it("test asText with non empty point", () => {
        const p1 = new Point([3.0,4.0]);
        const p2 = new Point([1.0,2.0]);
        const ls = new LineString([p1, p2]);
        const result = ls.asText();
        expect(result).to.equal("LINESTRING(3.0 4.0, 1.0 2.0)")
    });

    it("test cached envelope", () => {
        const p1 = new Point([0.0,1.0]);
        const p2 = new Point([2.0,0.0]);
        const p3 = new Point([1.0,3.0]);
        const ls = new LineString([p1, p2, p3]);
        let g = new GeometryWithCachedEnvelope(ls);
        const a = g.getEnvelope();
        expect(a.toString()).to.equal("[0,0,2,3]");
        const b = g.getEnvelope();
        expect(a).to.equal(b);
    });
});

