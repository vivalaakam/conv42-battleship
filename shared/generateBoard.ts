import { Buf } from "./buf";
import { CellStatus, Ship } from "./types";
import { pos } from "./utils";

export function generateBoard(
  shipList: number[],
  boardSize: number = 100
): CellStatus[] {
  let board = new Array(boardSize).fill(0);
  for (const ship of shipList) {
    board = placeOnBoard(board, getRandomShip(board, ship));
  }
  return board.map((v) =>
    v === CellStatus.filled ? CellStatus.filled : CellStatus.unknown
  );
}

function placeOnBoard(board: CellStatus[], ship: Ship): CellStatus[] {
  for (
    let x = ship.x - 1;
    x < ship.x + (ship.isVertical ? 2 : ship.n + 1);
    x += 1
  ) {
    for (
      let y = ship.y - 1;
      y < ship.y + (ship.isVertical ? ship.n + 1 : 2);
      y += 1
    ) {
      if (x > -1 && x < 10 && y > -1 && y < 10) {
        board[pos(x, y)] = CellStatus.missed;
      }
    }
  }
  for (let x = ship.x; x < ship.x + (ship.isVertical ? 1 : ship.n); x += 1) {
    for (let y = ship.y; y < ship.y + (ship.isVertical ? ship.n : 1); y += 1) {
      board[pos(x, y)] = CellStatus.filled;
    }
  }
  return board;
}

function getRandomShip(board: number[], size: number): Ship {
  const variants = [];
  for (let x = 0; x < 10; x += 1) {
    let buf = new Buf(size);
    for (let y = 0; y < 10; y += 1) {
      buf.push(Math.abs(board[pos(x, y)]));
      if (buf.pushes >= size && buf.sum === 0) {
        variants.push({ isVertical: true, x: x, y: y - size + 1, n: size });
      }
    }
  }
  for (let y = 0; y < 10; y += 1) {
    let buf = new Buf(size);
    for (let x = 0; x < 10; x += 1) {
      buf.push(Math.abs(board[pos(x, y)]));
      if (buf.pushes >= size && buf.sum === 0) {
        variants.push({ isVertical: false, x: x - size + 1, y: y, n: size });
      }
    }
  }
  return variants[Math.floor(Math.random() * variants.length)];
}