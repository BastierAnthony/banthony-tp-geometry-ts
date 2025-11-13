import Coordinate from "./Coordinate";
export default class Envelope {
    private bottomLeft?: Coordinate;
    private topRight?: Coordinate;
    
    constructor(bottomLeft?: Coordinate, topRight?: Coordinate) {
        this.bottomLeft = bottomLeft || [];
        this.topRight = topRight || [];
    }

    isEmpty(): boolean {
      return !isFinite(this.bottomLeft[0]);
    }

    getXmin(): number{
        return this.bottomLeft[0];
    }
    getYmin(): number{
        return this.bottomLeft[1];
    }

    getXmax(): number{
        return this.topRight[0];
    }

    getYmax(): number{
        return this.topRight[1];
    }

    toString(): string{
        const x_min = this.getXmin();
        const y_min = this.getYmin();
        const x_max = this.getXmax();
        const y_max = this.getYmax();
        return "["+x_min+","+y_min+","+x_max+","+y_max+"]";
    }
}