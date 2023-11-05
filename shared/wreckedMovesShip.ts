import { CellStatus } from "./types";
import { calcPos } from "./utils";

export function getWreckedMovesShip(board: CellStatus[]): number[] {
    const wrecked = [];
    const viewed: number[] = [];
  
    const check = (pos: number, x: number, y: number): number => {
      const next = calcPos(pos, x, y);
      if (next === -1) {
        return -1;
      }
  
      viewed.push(next);
  
      switch (board[next]) {
        case CellStatus.killed:
          return check(next, x, y);
        case CellStatus.unknown:
          return next;
        default:
          return -1;
      }
    };
  
    for (let p = 0; p < board.length; p += 1) {
      if (viewed.includes(p)) {
        continue;
      }
      viewed.push(p);
      if (board[p] === CellStatus.killed) {
        wrecked.push(
          check(p, 0, -1),
          check(p, -1, 0),
          check(p, 0, 1),
          check(p, 1, 0)
        );
      }
    }
  
    return wrecked.filter((v) => v !== -1);
  }