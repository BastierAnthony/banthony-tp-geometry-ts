import Point from "./Point";
import AbstractGeometry from "./AbstractGeometry";
import Envelope from "../src/Envelope";
import EnvelopeBuilder from "../src/EnvelopeBuilder";
import GeometryVisitor from "./GeometryVisitor";
import Geometry from "./Geometry";

export default class GeometryCollection extends AbstractGeometry{
  private geometries?: Array<Geometry>;

  constructor(geometries?: Array<Geometry>) {
    super();
    this.geometries = geometries || [];
  }

  getNumGeometries(): number {
    return this.geometries.length;
  }

  getGeometryN(n?: number) {
    return this.geometries[n];
  }

  getType(): string {
      return "GeometryCollection";
  }

  isEmpty(): boolean {
      return this.geometries.length == 0;
  }

  translate(dx: number, dy: number) {
    for (let geometry of this.geometries){
        geometry.translate(dx, dy);
    }
  }

  clone(): GeometryCollection {
    const clone = new GeometryCollection();
    for (let geometry of this.geometries){
        clone.geometries.push(geometry.clone());
        
    }
    return clone;
  }

  accept(visitor: GeometryVisitor) {
    visitor.visitGeometryCollection(this);
  }
}
