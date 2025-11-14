import Envelope from "./Envelope";
import Geometry from "./Geometry";
import GeometryVisitor from "./GeometryVisitor";

export default class GeometryWithCachedEnvelope implements Geometry {
    private original: Geometry;
    private cachedEnvelope?: Envelope | undefined;

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
        const gt = this.original.translate(dx, dy);
        this.cachedEnvelope = undefined;
        return gt
    }

    clone(): GeometryWithCachedEnvelope {
        const gc = new GeometryWithCachedEnvelope(this.original.clone());
        gc.cachedEnvelope = this.getEnvelope();
        return gc;
    }

    accept<T>(visitor:GeometryVisitor<T>): T {
        return this.original.accept(visitor);
    }

    asText(): string {
        return this.original.asText();
    }

    getEnvelope(): Envelope {
        return this.cachedEnvelope ? this.cachedEnvelope : this.cachedEnvelope = this.original.getEnvelope();
    }

}