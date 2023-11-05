import {calcPos, CellStatus} from "./index";

const MARK_LIST = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

function check(board: CellStatus[], pos: number, x: number, y: number): (number | null)[] {
    const next = calcPos(pos, x, y);
    if (next === -1) {
        return [];
    }

    switch (board[next]) {
        case CellStatus.filled:
            return [null];
        case CellStatus.killed:
            return check(board, next, x, y).concat(next);
        default:
            return [];
    }
}

/**
 * 
 * @param board 
 * @param pos 
 * @returns 
 */
export function checkFire(board: CellStatus[], pos: number): [boolean, CellStatus[]] {
    if (board[pos] === CellStatus.unknown) {
        board[pos] = CellStatus.missed;
    }

    if (board[pos] === CellStatus.missed || board[pos] === CellStatus.killed) {
        return [false, board];
    }

    board[pos] = CellStatus.killed;

    const positions = new Set([pos, ...check(board, pos, 0, -1), ...check(board, pos, 0, 1), ...check(board, pos, -1, 0), ...check(board, pos, 1, 0)]);
    if (!positions.has(null)) {
        for (const pos of Array.from(positions)) {
            for (const [x, y] of MARK_LIST) {
                const next = calcPos(pos as number, x, y);
                if (next !== -1 && board[next] === CellStatus.unknown) {
                    board[next] = CellStatus.missed;
                }
            }
        }
    }

    return [true, board];
}