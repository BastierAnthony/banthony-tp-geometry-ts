import AbstractGeometry from "./AbstractGeometry";
import Point from "./Point";
import LineString from "./LineString";

export default class WktWriter {
    write(geometry: AbstractGeometry): string{
        let wkt = "";
        if ( geometry instanceof Point ){
            wkt += "POINT";
            if (geometry.isEmpty()){
                wkt += " EMPTY";
            } else {
                wkt += "(";
                wkt += geometry.x().toFixed(1);
                wkt += " ";
                wkt += geometry.y().toFixed(1);
                wkt += ")";
            } 
            return wkt;
        }else if ( geometry instanceof LineString ){
            wkt += "LINESTRING";
            if (geometry.isEmpty()){
                wkt += " EMPTY";
            } else {
                wkt += "(";
                let n = geometry.getNumPoints();
                for (let i=0; i<n; i++){
                    let p = geometry.getPointN(i);
                    wkt += p.x().toFixed(1);
                    wkt += " ";
                    wkt += p.y().toFixed(1);
                    if (i!=n-1){
                        wkt += ", ";
                    }
                }
                wkt += ")";
            }
            return wkt;
        }else{
            throw new TypeError("geometry type not supported");
        }
    }
}