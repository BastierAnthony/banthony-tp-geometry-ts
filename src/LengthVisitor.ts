import GeometryCollection from "./GeometryCollection";
import GeometryVisitor from "./GeometryVisitor";
import LineString from "./LineString";
import Point from "./Point";

export default class LengthVisitor implements GeometryVisitor<number> {
    private length : number;

    visitPoint(point: Point): number {
        this.length = 0.0;
        return this.length;
    }
    visitLineString(lineString: LineString): number {
        this.length = 0.0;
        let n = lineString.getNumPoints();
        if (n>1){
            let p0 = lineString.getPointN(0);
            for (let i=1; i<n; i++){
                const pi = lineString.getPointN(i);
                const dx = pi.x() - p0.x();
                const dy = pi.y() - p0.y();
                this.length += Math.sqrt(dx*dx + dy*dy);
                p0 = pi;
            }
        }
        return this.length;
    };
    visitGeometryCollection(geometryCollection: GeometryCollection): number {
        this.length = 0.0;
        let n = geometryCollection.getNumGeometries();
        if (n>1){
            for (let i=0; i<n; i++){
                let g = geometryCollection.getGeometryN(i);
                this.length += g.accept(this);
            } 
        }  
        return this.length;
    };

    getResult() : number{
        return this.length;
    };
}