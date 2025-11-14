import Point from "./Point";
import AbstractGeometry from "./AbstractGeometry";
import Envelope from "../src/Envelope";
import EnvelopeBuilder from "../src/EnvelopeBuilder";
import GeometryVisitor from "./GeometryVisitor";

export default class LineString extends AbstractGeometry{
  private points?: Array<Point>;

  constructor(points?: Array<Point>) {
    super();
    this.points = points || [];
  }

  getNumPoints(): number {
    return this.points.length;
  }

  getPointN(n?: number) {
    return this.points[n];
  }

  getType(): string {
      return "LineString";
  }

  isEmpty(): boolean {
      return this.points.length == 0;
  }

  translate(dx: number, dy: number) {
    for (let point of this.points){
        point.translate(dx, dy);
    }
  }

  clone(): LineString {
    const clone = new LineString();
    for (let point of this.points){
        clone.points.push(point.clone());
        
    }
    return clone;
  }

  accept(visitor: GeometryVisitor) {
    visitor.visitLineString(this);
  }
}
