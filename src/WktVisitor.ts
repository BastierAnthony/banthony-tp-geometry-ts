import GeometryVisitor from "./GeometryVisitor";
import LineString from "./LineString";
import Point from "./Point";
import WktWriter from "./WktWriter";

export default class WktVisitor implements GeometryVisitor {
    private buffer : string;

    visitLineString(lineString: LineString) {
        const writer = new WktWriter();
        this.buffer =  writer.write(lineString);
    };
    
    visitPoint(point: Point) {
        const writer = new WktWriter();
        this.buffer =  writer.write(point);
    };
    
    getResult() : string{
        return this.buffer;
    };
}
