import Coordinate from "./Coordinate";
import AbstractGeometry from "./AbstractGeometry";
import Envelope from "../src/Envelope";
import EnvelopeBuilder from "../src/EnvelopeBuilder";
import GeometryVisitor from "./GeometryVisitor";

export default class Point extends AbstractGeometry {
  private coordinate?: Coordinate;

  constructor(coordinate?: Coordinate) {
    super();
    this.coordinate = coordinate || [];
  }

  getCoordinate(): Coordinate {
    return this.coordinate;
  }

  x(): number {
    return this.coordinate.length > 0 ? this.coordinate[0] : Number.NaN ;
  }

  y(): number {
    return this.coordinate.length > 1 ? this.coordinate[1] : Number.NaN ;
  }

  getType(): string {
    return "Point";
  }

  isEmpty(): boolean {
    return this.coordinate.length == 0;
  }

  translate(dx: number, dy: number) {
    this.coordinate[0] += dx;
    this.coordinate[1] += dy;
  }

  clone(): Point {
    return this.isEmpty() ? new Point() : new Point([this.x(), this.y()]);
  }

  getEnvelope(): Envelope {
    const b = new EnvelopeBuilder();
    b.insert(this.getCoordinate());
    return b.build();
  }

  accept(visitor: GeometryVisitor) {
    visitor.visitPoint(this);
  }
}
