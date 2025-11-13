import Point from "./Point";
import Geometry from "./Geometry";

export default class LineString implements Geometry{
  private points?: Array<Point>;

  constructor(points?: Array<Point>) {
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
}
