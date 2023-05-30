import * as messageController from "../../services/Message";
import { Request, Response, NextFunction } from "express";

import { Success, Created } from "../../../utils/response/success/successes";
import {
  InternalServerError,
  BadRequest,
  NotFound,
} from "../../../utils/response/error/errors";

export const getAllMessages = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    let senderId = req.user._id;
    const { message, data, code } = await messageController.getMessages(
      senderId,
      req.params.recipientId
    );

    if (code === 0) {
      return next(new Success(message, data));
    }

    //return next(new BadRequest(message));
    res.status(400).json({ Error: message });

  } catch (err) {
    console.log(err);
    return next(new InternalServerError("Internal Server Error", req));
  }
};

export const sendMessage = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    let senderId = req.user._id;
    

    const { message, data, code } = await messageController.sendMessage({
      senderId,
      ...req.body,
    });

    if (code === 0) {
      return next(new Success(message, data));
    }

    //return next(new BadRequest(message));
    res.status(400).json({ Error: message });

  } catch (err) {
    console.log(err);
    return next(new InternalServerError("Internal Server Error", req));
  }
};
