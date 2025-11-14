import GeometryVisitor from "./GeometryVisitor";
import LineString from "./LineString";
import Point from "./Point";

export default class LogGeometryVisitor implements GeometryVisitor {

    constructor(
        private log = console.log
    ){
        
    }

    visitLineString(lineString: LineString) {
        if (lineString.isEmpty()){
            this.log("Je suis une polyligne vide.");
        } else {
            const n = lineString.getNumPoints();
            this.log("Je suis une polyligne définie par "+n+" point(s).");
        }

    };

    visitPoint(point: Point) {
        if (point.isEmpty()){
            this.log("Je suis un point vide.");
        } else {
            const x = point.x().toFixed(1);
            const y = point.y().toFixed(1);
            this.log("Je suis un point avec x="+x+" et y="+y+".");
        }
    };
}