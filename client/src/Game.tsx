import { CellStatus } from "../../../shared";
import { Board } from "./Board";

export type GameProps = {
  userBoard: CellStatus[];
  opponentBoard: CellStatus[];
  onClickBoard: (pos: number) => void;
};

export function Game({ userBoard, opponentBoard, onClickBoard }: GameProps) {
  return (
    <>
      <Board board={userBoard} />
      <Board board={opponentBoard} clickable onClick={onClickBoard} />
    </>
  );
}