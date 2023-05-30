import express, { Router } from "express";
import { Request, Response , NextFunction} from "express";
import * as controller from "../../../app/controller/Message";

const router: Router = express.Router();

import isAuth, { IUserRequest } from "../../../Middleware/isAuth";

router.use((req: Request, res: Response, next: NextFunction) => {
  isAuth(req as IUserRequest, res, next).catch(next);
});
router.get("/get-messages/:recipientId", controller.getAllMessages);


router.post("/send-meesage", controller.sendMessage);

export default router;
