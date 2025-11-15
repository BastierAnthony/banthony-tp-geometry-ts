import "mocha";
import { expect } from "chai";
import GeometryCollection from "../src/GeometryCollection";
import Point from "../src/Point";
import LineString from "../src/LineString";
import GeometryWithCachedEnvelope from "../src/GeometryWithCachedEnvelope";
import LogGeometryVisitor from "../src/LogGeometryVisitor";
import LengthVisitor from   "../src/LengthVisitor";

describe("test GeometryCollection", () => {
    it("test default constructor", () => {
        const ls = new GeometryCollection();
        expect(ls.getNumGeometries()).to.equal(0);
        expect(ls.getGeometryN(1)).to.equal(undefined);
        expect(ls.getGeometryN(-1)).to.equal(undefined);
        expect(ls.getType()).to.equal("GeometryCollection");
        expect(ls.isEmpty()).to.equal(true);
    });

    it("test constructor with geometries", () => {
            const p1 = new Point([3.0,4.0]);
            const p2 = new Point([0.0,0.0]);
            const p3 = new Point([1.0,1.0]);
            const p4 = new Point([5.0,5.0]);
            const ls = new LineString([p2, p3, p4]);
            const gc = new GeometryCollection([p1, ls]);
            expect(gc.getNumGeometries()).to.equal(2);
            expect(gc.getGeometryN(0)).to.equal(p1);
            expect(gc.getGeometryN(1)).to.equal(ls);
            expect(gc.isEmpty()).to.equal(false);
    });
    it("test translation", () => {
            const p1 = new Point([3.0,4.0]);
            const p2 = new Point([0.0,0.0]);
            const p3 = new Point([1.0,1.0]);
            const p4 = new Point([5.0,5.0]);
            const ls = new LineString([p2, p3, p4]);
            const gc = new GeometryCollection([p1, ls]);
            const dx = 2;
            const dy = -2;
            gc.translate(dx,dy);
            expect(gc.getGeometryN(0).x()).to.equal(5);
            expect(gc.getGeometryN(0).y()).to.equal(2);
            expect(gc.getGeometryN(1).getPointN(0).x()).to.equal(2);
            expect(gc.getGeometryN(1).getPointN(0).y()).to.equal(-2);
    });
    it("test cloning construct", () => {
            const p1 = new Point([3.0,4.0]);
            const p2 = new Point([0.0,0.0]);
            const p3 = new Point([1.0,1.0]);
            const p4 = new Point([5.0,5.0]);
            const ls = new LineString([p2, p3, p4]);
            const gc1 = new GeometryCollection([p1, ls]);
            const gc2 = gc1.clone();
            expect(gc1).to.deep.equal(gc2);
            expect(gc1).not.to.equal(gc2);
    });

    it("test asText with empty geometrycollection", () => {
            const gc = new GeometryCollection();
            const result = gc.asText();
            expect(result).to.equal("GEOMETRYCOLLECTION EMPTY")
    });
        
    it("test asText with non empty linestring", () => {
        const p1 = new Point([3.0,4.0]);
        const p2 = new Point([0.0,0.0]);
        const p3 = new Point([1.0,1.0]);
        const p4 = new Point([5.0,5.0]);
        const ls = new LineString([p2, p3, p4]);
        const gc = new GeometryCollection([p1, ls]);
        const result = gc.asText();
        expect(result).to.equal("GEOMETRYCOLLECTION(POINT(3.0 4.0),LINESTRING(0.0 0.0, 1.0 1.0, 5.0 5.0))")
    });

    it("test envelope builder", () => {
        const p1 = new Point([3.0,4.0]);
        const p2 = new Point([0.0,0.0]);
        const p3 = new Point([1.0,1.0]);
        const p4 = new Point([5.0,5.0]);
        const ls = new LineString([p2, p3, p4]);
        const gc1 = new GeometryCollection([p1, ls]);
        const e = gc1.getEnvelope();
        expect(e.toString()).to.equal("[0,0,5,5]"); 
    });
    
    it("test cached envelope", () => {
        const p1 = new Point([3.0,4.0]);
        const p2 = new Point([0.0,0.0]);
        const p3 = new Point([1.0,1.0]);
        const p4 = new Point([5.0,5.0]);
        const ls = new LineString([p2, p3, p4]);
        const gc1 = new GeometryCollection([p1, ls]);
        let gc2 = new GeometryWithCachedEnvelope(gc1);
        const a = gc2.getEnvelope();
        expect(a.toString()).to.equal("[0,0,5,5]");
        const b = gc2.getEnvelope();
        expect(a).to.equal(b);
    });

    it("should return Je suis une geometry collection vide. ", ()=> {
            let result = "";
            const v = new LogGeometryVisitor((message)=>{
                result = message;
            });
            const gc = new GeometryCollection();
            gc.accept(v);
            expect(result).to.equal("Je suis une geometry collection vide.");
        });
    it("should return Je suis un point avec x=2.0 et y=3.0.", ()=> {
        let result = "";
        const v = new LogGeometryVisitor((message)=>{
            result = message;
        });
        const p1 = new Point([3.0,4.0]);
        const p2 = new Point([0.0,0.0]);
        const p3 = new Point([1.0,1.0]);
        const p4 = new Point([5.0,5.0]);
        const ls = new LineString([p2, p3, p4]);
        const gc = new GeometryCollection([p1, ls]);
        gc.accept(v);
        expect(result).to.equal("Je suis une geometry collection composée de 2 géométrie(s).");
    });


    it("test lenVisitor with empty geometrycollection", () => {
            const v = new LengthVisitor();
            const gc = new GeometryCollection();
            gc.accept(v);
            const result = v.getResult();
            expect(result).to.equal(0.0);
    });

    it("test lenVisitor with non empty geometrycollection", () => {
        const v = new LengthVisitor();
        const p1 = new Point([0.0,1.0]);
        const p2 = new Point([1.0,1.0]);
        const p3 = new Point([1.0,2.0]);
        const p4 = new Point([5.0,2.0]);
        const ls1 = new LineString([p2, p3, p4]);
        const p5 = new Point([0.0,1.0]);
        const p6 = new Point([1.0,1.0]);
        const ls2 = new LineString([p1, p2]);
        const gc = new GeometryCollection([p1, ls1, ls2]);
        gc.accept(v);
        const result = v.getResult();
        expect(result).to.equal(6.0);
    });
});