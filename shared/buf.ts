export class Buf {
    private size: number;
    private _vals: number[];
    private index: number = 0;

    constructor(size: number) {
        this.size = size;
        this._vals = Array.from({length: size}).fill(0) as number[]
    }

    private _pushes: number = 0;

    get pushes() {
        return this._pushes;
    }

    private _sum: number = 0;

    get sum() {
        return this._sum
    }

    get values() {
        return [...this._vals]
    }

    push(val: number) {
        if (this._pushes >= this.size) {
            this._sum -= this._vals[this.index];
        }

        this._sum += val;
        this._vals[this.index] = val;
        this._pushes += 1;
        this.index += 1;
        if (this.index >= this.size) {
            this.index = 0;
        }
    }
}