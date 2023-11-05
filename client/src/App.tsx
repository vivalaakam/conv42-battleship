import { useCallback, useEffect, useState } from "react";
import styles from "./App.module.css";
import socket from "socket.io-client";
import { Setup } from "./Setup";
import { Game } from "./Game";
import { CellStatus, checkFire, cleanBoard, gameStatus } from "../../../shared";

const io = socket("http://localhost:3000");

function App() {
  const [scene, setScene] = useState("setup");
  const [opponentBoard, setOpponentBoard] = useState(Array(100).fill(0));
  const [userBoard, setUserBoard] = useState(Array(100).fill(0));
  const [gameId, setGameId] = useState<string | null>(null);

  const onCatch = useCallback(
    ({ pos }: { pos: number }) => {
      const [result, newBoard] = checkFire(userBoard, pos);
      const isGameOver = !gameStatus(newBoard);

      io.emit("catchResult", {
        gameId,
        result,
        board: cleanBoard(newBoard),
        isGameOver,
      });

      if (isGameOver) {
        setScene("finishlose");
      } else {
        setUserBoard(newBoard);
      }
    },
    [userBoard, gameId]
  );

  const onGameCreated = useCallback(({ gameId: gid }: { gameId: string }) => {
    setGameId(gid);
    setScene("game");
  }, []);

  const onFireResult = useCallback(
    ({ board, isGameOver }: { board: CellStatus[]; isGameOver: boolean }) => {
      if (isGameOver) {
        setScene("finishwin");
        return;
      }

      setOpponentBoard(board);
    },
    []
  );

  const onClickReady = useCallback((board: CellStatus[]) => {
    setUserBoard(board);
    io.emit("newGameAI");
  }, []);

  const onClickBoard = useCallback(
    (pos: number) => {
      io.emit("fire", { gameId, pos });
    },
    [gameId]
  );

  useEffect(() => {
    io.on("gameCreated", onGameCreated);
    io.on("fireResult", onFireResult);
    io.on("catch", onCatch);
    return () => {
      io.off("gameCreated", onGameCreated);
      io.off("fireResult", onFireResult);
      io.off("catch", onCatch);
    };
  }, [onGameCreated, onFireResult, onCatch]);

  return (
    <main className={styles.main}>
      {scene === "setup" && <Setup onReady={onClickReady} />}
      {scene === "game" && (
        <Game
          userBoard={userBoard}
          opponentBoard={opponentBoard}
          onClickBoard={onClickBoard}
        />
      )}
      {scene === "finishwin" && <div>Game Over. You win</div>}
      {scene === "finishlose" && <div>Game Over. You lose</div>}
    </main>
  );
}

export default App;
