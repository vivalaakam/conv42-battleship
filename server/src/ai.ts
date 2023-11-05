import {CellStatus, checkFire, cleanBoard, gameStatus, generateBoard, getWreckedMovesShip,} from "../../shared";


export class AI {
    board: CellStatus[];

    constructor() {
        this.board = generateBoard([5, 4, 4, 3, 3, 3, 2, 2, 2, 2], 100);
    }

    makeMove(board: CellStatus[]) {
        const wrecked = getWreckedMovesShip(board);

        if (wrecked.length) {
            return wrecked[0];
        }

        return this.randomMove(board);
    }

    randomMove(board: CellStatus[]) {
        const states = board.reduce<number[]>((acc, cur, i) => {
            if (cur === CellStatus.unknown) {
                acc.push(i);
            }
            return acc;
        }, []);

        return states[Math.floor(Math.random() * states.length)];
    }

    fire(pos: number) {
        const [result, board] = checkFire(this.board, pos);
        this.board = board;
        return result;
    }

    getBoard() {
        return cleanBoard(this.board);
    }

    isGameOver() {
        return !gameStatus(this.board);
    }
}