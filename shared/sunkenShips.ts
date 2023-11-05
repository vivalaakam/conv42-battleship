import {calcPos, CellStatus} from "./index";

export function sunkenShips(board: number[]): number[] {
    const sunken = [];
    const viewed: number[] = [];

    const check = (pos: number, x: number, y: number): number => {
        const next = calcPos(pos, x, y);
        if (next === -1) {
            return 1;
        }
        viewed.push(next);
        switch (board[next]) {
            case CellStatus.missed:
                return 1;
            case CellStatus.killed:
                return check(next, x, y) * 2;
            default:
                return 0;
        }
    };

    for (let p = 0; p < board.length; p += 1) {
        if (viewed.includes(p)) {
            continue;
        }
        viewed.push(p);
        if (board[p] === CellStatus.killed && check(p, 0, -1) === 1 && check(p, -1, 0) === 1) {
            const s = Math.max(check(p, 0, 1), check(p, 1, 0));
            if (s > 0) {
                sunken.push(s.toString(2).length);
            }
        }
    }

    return sunken.sort((a, b) => a - b);
}