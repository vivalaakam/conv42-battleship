import {CellStatus} from "./types";

export function gameStatus(board: CellStatus[]) {
    return board.some((v) => v === CellStatus.filled)
}