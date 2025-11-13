import "mocha";
import { expect } from "chai";
import WktWriter from "../src/WktWriter";
import Point from "../src/Point";
import LineString from "../src/LineString";

describe("test WktWriter", () => {
    it("test empty point", () => {
        const p = new Point();
        const w = new WktWriter();
        const wkt = w.write(p);
        expect(wkt).to.equal("POINT EMPTY");
    });

    it("test point wkt", () => {
        const g = new Point([3.0,4.0]);
        const w = new WktWriter();
        const wkt = w.write(g);
        expect(wkt).to.equal("POINT(3.0 4.0)");
    });

    it("test empty linestring", () => {
        const l = new LineString();
        const w = new WktWriter();
        const wkt = w.write(l);
        expect(wkt).to.equal("LINESTRING EMPTY");
    });

    it("test linestring wkt", () => {
        const p1 = new Point([3.0,4.0]);
        const p2 = new Point([1.0,2.0]);
        const ls = new LineString([p1, p2]);
        const w = new WktWriter();
        const wkt = w.write(ls);
        expect(wkt).to.equal("LINESTRING(3.0 4.0, 1.0 2.0)");
    });
});

