import Envelope from "./Envelope";
import GeometryVisitor from "./GeometryVisitor";
export default interface Geometry {
    getType(): string;
    isEmpty(): boolean;
    translate(dx:number, dy:number);
    clone(): Geometry;
    getEnvelope(): Envelope;
    accept<T>(visitor:GeometryVisitor<T>): T;
    asText(): string;
}