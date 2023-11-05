import styles from "./Cell.module.css";
import { useCallback } from "react";
import {CellStatus} from "../../../shared";

export type CellProps = {
  pos: number;
  state: CellStatus;
  onClick?: (pos: number) => void;
  clickable?: boolean;
};

const states = [
  styles.cellUnknown,
  styles.cellMissed,
  styles.cellKilled,
  styles.cellFilled,
];

export function Cell({ pos, state, clickable, onClick }: CellProps) {
  const onClickCell = useCallback(() => {
    if (clickable && state === CellStatus.unknown && onClick) {
      onClick(pos);
    }
  }, [clickable, onClick, pos, state]);

  return (
    <div
      onClick={onClickCell}
      className={`${styles.cell} ${states[state]} ${
        clickable && state === CellStatus.unknown && styles.active
      }`}
    />
  );
}