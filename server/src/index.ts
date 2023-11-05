import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Game } from "./game";
import { Server } from "socket.io";
import crypto from "crypto";

const app = express();

const server = createServer(app);

app.use(express.json());
app.use(cors());
const PORT = 3000;
const games = new Map<string, Game>();

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("newGameAI", () => {
    const gameId = crypto.randomUUID();
    games.set(gameId, new Game(socket.id, "ai"));
    socket.emit("gameCreated", { gameId, sId: socket.id });
  });
  socket.on("fire", ({ gameId, pos }) => {
    const game = games.get(gameId);

    if (game && game.currentMove === socket.id) {
      const result = game.computer.fire(pos);

      game.onFire(socket.id, result, game.computer.getBoard());

      io.emit("fireResult", {
        gameId,
        result,
        board: game.computer.getBoard(),
        isGameOver: game.computer.isGameOver(),
      });

      if (game.currentMove === "ai") {
        const pos = game.computer.makeMove(game.getBoard("ai"));

        io.emit("catch", {
          gameId,
          pos,
        });
      }
    }
  });
  socket.on("catchResult", ({ result, board, isGameOver, gameId }) => {
    const game = games.get(gameId);
    if (game && game.currentMove === "ai") {
      game.onFire("ai", result, board);

      if (game.currentMove === "ai") {
        const pos = game.computer.makeMove(game.getBoard("ai"));

        io.emit("catch", {
          gameId,
          pos,
        });
      }
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
