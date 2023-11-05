import { Board } from "./Board";
import { useCallback, useState } from "react";
import {CellStatus, generateBoard} from "../../../shared";

export type SetupProps = {
  onReady: (board: CellStatus[]) => void;
};

export function Setup({ onReady }: SetupProps) {
  const [userBoard, setUserBoard] = useState(
    generateBoard([5, 4, 4, 3, 3, 3, 2, 2, 2, 2], 100)
  );

  const onClickGenerate = useCallback(() => {
    setUserBoard(generateBoard([5, 4, 4, 3, 3, 3, 2, 2, 2, 2], 100));
  }, []);

  const onClickReady = useCallback(() => {
    onReady(userBoard);
  }, [userBoard, onReady]);

  return (
    <>
      <Board board={userBoard} />
      <div>
        <button onClick={onClickGenerate}>Generate</button>
        <button onClick={onClickReady}>Ready</button>
      </div>
    </>
  );
}