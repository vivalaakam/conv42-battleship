export enum CellStatus {
    unknown = 0,
    missed = 1,
    killed = 2,
    filled = 3,
}

export type Ship = {
    isVertical: boolean;
    n: number;
    x: number;
    y: number;
};