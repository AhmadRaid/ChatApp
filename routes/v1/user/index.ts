import express, { Router } from "express";
import { Request, Response } from "express";
import * as controller from "../../../app/controller/User";

const router: Router = express.Router();

router.post("/listing", controller.getAllUser);
router.post("/send-friend-request", controller.sendFriendRequest);

export default router;
