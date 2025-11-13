import Point from "./Point";
import Geometry from "./Geometry";

export default class LineString implements Geometry{
  private points?: Array<Point>;

  constructor(points?: Array<Point>) {
    if (points && points.length==1) {
        this.points = [];
    }else{
        this.points = points ;
    }
  }

  getNumPoints(): number {
    return this.points ? this.points.length : 0;
  }

  getPointN(n?: number) {
    return this.points ? this.points[n] : undefined;
  }

  getType(): string {
      return "LineString";
  }
}
