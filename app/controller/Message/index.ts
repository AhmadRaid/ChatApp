import * as messageController from "../../services/Message";
import { Request, Response, NextFunction } from "express";

import { Success, Created } from "../../../utils/response/success/successes";
import {
  InternalServerError,
  BadRequest,
  NotFound,
} from "../../../utils/response/error/errors";

export const getAllMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { message, data, code } = await messageController.getMessages(
      req.params.senderId,
      req.params.recipientId
    );

    if (code === 0) {
      return next(new Success(message, data));
    }

    return next(new BadRequest(message));
  } catch (err) {
    console.log(err);
    return next(new InternalServerError("Internal Server Error", req));
  }
};

export const addMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { message, data, code } = await messageController.addMessage({
      ...req.body,
    });

    if (code === 0) {
      return next(new Success(message, data));
    }

    return next(new BadRequest(message));
  } catch (err) {
    console.log(err);
    return next(new InternalServerError("Internal Server Error", req));
  }
};
