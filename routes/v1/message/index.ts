import express, { Router } from "express";
import { Request, Response } from "express";
import * as controller from "../../../app/controller/Message";

const router: Router = express.Router();

router.get("/get-messages/:senderId/:recipientId", controller.getAllMessages);


router.post("/send-meesage", controller.addMessage);

export default router;
