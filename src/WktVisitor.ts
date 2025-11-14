import GeometryVisitor from "./GeometryVisitor";
import LineString from "./LineString";
import Point from "./Point";
import WktWriter from "./WktWriter";

export default class WktVisitor implements GeometryVisitor {
    private buffer : string;

    visitLineString(lineString: LineString) {
        let wkt = "";
        wkt += "LINESTRING";
        if (lineString.isEmpty()){
            wkt += " EMPTY";
        } else {
            wkt += "(";
            let n = lineString.getNumPoints();
            for (let i=0; i<n; i++){
                let p = lineString.getPointN(i);
                wkt += p.x().toFixed(1);
                wkt += " ";
                wkt += p.y().toFixed(1);
                if (i!=n-1){
                    wkt += ", ";
                }
            }
            wkt += ")";
        }
        this.buffer =  wkt;
    };
    
    visitPoint(point: Point) {
        let wkt = "";
        wkt += "POINT";
        if (point.isEmpty()){
            wkt += " EMPTY";
        } else {
            wkt += "(";
            wkt += point.x().toFixed(1);
            wkt += " ";
            wkt += point.y().toFixed(1);
            wkt += ")";
        } 
        this.buffer =  wkt;
    };
    
    getResult() : string{
        return this.buffer;
    };
}
