import express, { Router } from "express";
import { Request, Response, NextFunction } from "express";
import * as controller from "../../../app/controller/User";

import isAuth, { IUserRequest } from "../../../Middleware/isAuth";
const router: Router = express.Router();

router.use((req: Request, res: Response, next: NextFunction) => {
  isAuth(req as IUserRequest, res, next).catch(next);
});

router.post("/listing", controller.getAllUser);
router.get("/show-profile/:userId", controller.showProfile);
router.get("/get-my-friend", controller.getMyFriends);
router.post("/send-friend-request", controller.sendFriendRequest);
router.patch(
  "/change-status-friend-request",
  controller.changeStatusFriendRequest
);
router.get("/search-user/:name", controller.searchUser);

export default router;
