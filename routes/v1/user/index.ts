import express, { Router } from "express";
import { Request, Response, NextFunction } from "express";
import * as controller from "../../../app/controller/User";

const router: Router = express.Router();
import isAuth, { IUserRequest } from "../../../Middleware/isAuth";

router.use((req: Request, res: Response, next: NextFunction) => {
  isAuth(req as IUserRequest, res, next).catch(next);
});

router.get("/listing", controller.getAllUser);
router.get("/show-profile/:userId", controller.showProfile);
router.get("/get-my-friend", controller.getMyFriends);
router.post("/send-friend-request", controller.sendFriendRequest);
router.patch(
  "/change-status-friend-request",
  controller.changeStatusFriendRequest
);
router.get("/search-user", controller.searchUser);

export default router;
