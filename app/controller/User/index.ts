import * as userController from "../../services/User";
import { Request, Response, NextFunction } from "express";

import { Success, Created } from "../../../utils/response/success/successes";
import {
  InternalServerError,
  BadRequest,
  NotFound,
} from "../../../utils/response/error/errors";

export const getAllUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { message, data, code } = await userController.getAllUser({
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

export const addUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { message, data, code } = await userController.addUser({
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
