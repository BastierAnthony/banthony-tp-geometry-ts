import GeometryCollection from "./GeometryCollection";
import GeometryVisitor from "./GeometryVisitor";
import LineString from "./LineString";
import Point from "./Point";

export default class WktVisitor implements GeometryVisitor {
    private buffer : string;

    visitLineString(lineString: LineString) {
        let wkt = "LINESTRING";
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
        let wkt = "POINT";
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

    visitGeometryCollection(geometryCollection: GeometryCollection) {
        let wkt = "GEOMETRYCOLLECTION";
        if (geometryCollection.isEmpty()){
            wkt += " EMPTY";
        } else {
            const visitor = new WktVisitor();
            wkt += "(";
            let n = geometryCollection.getNumGeometries();
            for (let i=0; i<n; i++){
                let g = geometryCollection.getGeometryN(i);
                g.accept(visitor);
                wkt += visitor.getResult();
                if (i!=n-1){
                    wkt += ",";
                }
            }
            wkt += ")";
        } 
        this.buffer = wkt;
    }
    
    getResult() : string{
        return this.buffer;
    };
}
