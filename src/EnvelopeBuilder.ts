import Coordinate from "./Coordinate";
import Envelope from "./Envelope";

export default class EnvelopeBuilder {
    private xmin: number = Infinity;
    private xmax: number = -Infinity;
    private ymin: number = Infinity;
    private ymax: number = -Infinity;

    insert(coordinate: Coordinate){
        this.xmin = Math.min(this.xmin, coordinate[0]);
        this.xmax = Math.max(this.xmax, coordinate[0]);
        this.ymin = Math.min(this.ymin, coordinate[1]);
        this.ymax = Math.max(this.ymax, coordinate[1]);
    }
    build(): Envelope{
        return new Envelope([this.xmin, this.ymin], [this.xmax, this.ymax] );
    }

}