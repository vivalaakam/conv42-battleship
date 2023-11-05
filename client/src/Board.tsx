import { Cell } from "./Cell";
import styles from "./Board.module.css";
import {CellStatus} from "../../../shared";

export type BoardProps = {
  board: CellStatus[];
  onClick?: (pos: number) => void;
  clickable?: boolean;
};

export function Board({ board, onClick, clickable = false }: BoardProps) {
  return (
    <div className={styles.board}>
      {board.map((cell, index) => {
        return (
          <Cell
            key={`${index}_${cell}`}
            pos={index}
            state={cell}
            clickable={clickable}
            onClick={onClick}
          />
        );
      })}
    </div>
  );
}