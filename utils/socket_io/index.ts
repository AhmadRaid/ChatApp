import { Server, Socket } from "socket.io";
import { createServer } from "http";
import { app } from "../../server";
const server = createServer(app);
const io = new Server(server);

io.on("connection", (socket: Socket) => {
  console.log("xx 2");

  // Handle socket events here

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});
