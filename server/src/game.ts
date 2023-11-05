import {AI} from "./ai";
import {CellStatus} from "../../shared";

export class Game {
    currentMove: string
    computer: AI
    private _boards: Record<string, CellStatus[]>;

    constructor(player1: string, player2: string) {
        this._player1 = player1
        this._player2 = player2
        this._boards = {
            [this._player1]: Array.from({length: 100}, () => CellStatus.unknown),
            [this._player2]: Array.from({length: 100}, () => CellStatus.unknown)
        }
        this.currentMove = this._player1
        this.computer = new AI();
    }

    private _player1: string
    private _player2: string

    get player1(): string {
        return this._player1;
    }

    onFire(player: string, result: boolean, board: CellStatus[]) {
        this.setBoard(player, board);
        if (!result) {
            if (this.currentMove === this._player1) {
                this.currentMove = this._player2
            } else {
                this.currentMove = this._player1
            }
        }
    }

    setBoard(player: string, board: CellStatus[]) {
        this._boards[player] = board;
    }

    getBoard(player: string): CellStatus[] {
        return this._boards[player];
    }
}