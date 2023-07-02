import express, { Application } from "express";
const app: Application = express();
import mainRoute from "./routes/mainRoute";
import { Server, Socket } from "socket.io";
import { createServer } from "http";
const cors = require('cors');
//import  { } from "./app/controller/";
import { Request, Response, NextFunction } from "express";
import { handleSuccess } from "./utils/response/success";
require("dotenv").config();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

interface User {
  userId: string;
  socketId: string;
}

let users: Map<String,User> = new Map();

const addUser = (userId: string, socketId: string) => {
  if (!users.has(userId)) {
    users.set(userId, { userId, socketId });
  }
};

const removeUser = (socketId: string) => {
  for (const [userId, user] of users) {
    if (user.socketId === socketId) {
      users.delete(userId);
      break;
    }
  }
};

const getUser = (userId: string) => {
  return users.get(userId);
};

io.on("connection", (socket) => {
  console.log(`A user Connected: ${socket.id}`);

  const userId = socket.handshake.query.userId;
  
  if (typeof userId === 'string') {
    addUser(userId, socket.id);
  }

  socket.on("send_message", (dataMessage) => {
    const { senderId, recipientId, message, date } = dataMessage

    const user = getUser(recipientId);
console.log(user);

    if (user) {
      io.to(user.socketId).emit("receive_message", {
        senderId,
        message,
        date
      });
    }else{
      console.log('sdad');
      
    }
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
    removeUser(socket.id);

  });
});

app.use("/chat", (req: Request, res: Response) => {
  res.status(404).send("Chat Page");
});

app.use("/api", mainRoute);

app.use("*", (req: Request, res: Response) =>
  res.status(404).send("NOT FOUND PAGE Ahmad Raid")
);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  if (error instanceof Error) {
    console.log("Global Error", error);
    res.status(500).json(error);
  }
  return handleSuccess(error, req, res);
});

export { server, app };
