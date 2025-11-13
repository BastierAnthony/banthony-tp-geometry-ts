import "mocha";
import { expect } from "chai";
import Envelope from "../src/Envelope";
import EnvelopeBuilder from "../src/EnvelopeBuilder";

describe("test Envelope", () => {
    it("test default constructor", () => {
        const e = new Envelope();
        expect(e.isEmpty()).to.equal(true);
    });
    it("test get minmax", () => {
        const e = new Envelope([1.0,1.0],[3.0,4.0]);
        expect(e.isEmpty()).to.equal(false);
        expect(e.getXmin()).to.equal(1);
        expect(e.getYmin()).to.equal(1);
        expect(e.getXmax()).to.equal(3);
        expect(e.getYmax()).to.equal(4);
    });
    it("test single coordinate", () => {
        const e = new Envelope([1.0,1.0]);
        expect(e.isEmpty()).to.equal(false);
        expect(e.getXmin()).to.equal(1);
        expect(e.getYmin()).to.equal(1);
    });
});

describe("test Envelope Builder", () => {
    it("test default build", () => {
        const b = new EnvelopeBuilder();
        const e = b.build();
        const i = "Infinity";
        const m = "-Infinity";
        expect(e.toString()).to.equal("["+i+","+i+","+m+","+m+"]"); 
        expect(e.isEmpty()).to.equal(true);
    });
    it("test build with coordinates", () => {
        const b = new EnvelopeBuilder();
        b.insert([0.0,1.0]);
        b.insert([2.0,0.0]);
        b.insert([1.0,3.0]);
        const e = b.build();
        expect(e.toString()).to.equal("[0,0,2,3]"); 
        expect(e.getXmin()).to.equal(0);
        expect(e.getYmin()).to.equal(0);
        expect(e.getXmax()).to.equal(2);
        expect(e.getYmax()).to.equal(3);
        expect(e.isEmpty()).to.equal(false);
    });
    it("test build with single coordinate", () => {
        const b = new EnvelopeBuilder();
        b.insert([1.0,1.0]);
        const e = b.build();
        expect(e.toString()).to.equal("[1,1,1,1]"); 
        expect(e.getXmin()).to.equal(1);
        expect(e.getYmin()).to.equal(1);
        expect(e.getXmax()).to.equal(1);
        expect(e.getYmax()).to.equal(1);
    });
});
