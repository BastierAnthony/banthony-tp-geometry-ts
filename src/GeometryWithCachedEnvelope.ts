import Envelope from "./Envelope";
import Geometry from "./Geometry";
import GeometryVisitor from "./GeometryVisitor";

export default class GeometryWithCachedEnvelope implements Geometry {
    private original: Geometry;
    private cachedEnvelope: Envelope;

    constructor(original:Geometry){
        this.original = original;
    }

    getType(): string {
        return this.original.getType();
    }

    isEmpty(): boolean {
        return this.original.isEmpty();
    }

    translate(dx: number, dy: number) {
        this.original.translate(dx, dy);
    }

    clone(): Geometry {
        return this.original.clone();
    }

    accept(visitor: GeometryVisitor) {
        this.original.accept(visitor);
    }

    asText(): string {
        return this.original.asText();
    }

    getEnvelope(): Envelope {
        return this.cachedEnvelope ? this.cachedEnvelope : this.cachedEnvelope = this.original.getEnvelope();
    }

}