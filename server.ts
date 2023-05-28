import express, { Application } from "express";
const app: Application = express();
import mainRoute from "./routes/mainRoute";

import { Request, Response, NextFunction } from "express";
import { handleSuccess } from "./utils/response/success";
//import { handleError }  from "./utils/response/error";
require("dotenv").config();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

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

export default app;
