import {CellStatus} from "./index";

export function cleanBoard(board: CellStatus[]): CellStatus[] {
    return board.map((v) => {
        switch (v) {
            case CellStatus.killed:
                return 2;
            case CellStatus.missed:
                return 1;
            default:
                return 0;
        }
    });
}