import { Request, Response, NextFunction } from "express";
import * as authController from "../../services/Auth";
import { Success, Created } from "../../../utils/response/success/successes";
import {
  InternalServerError,
  BadRequest,
  NotFound,
} from "../../../utils/response/error/errors";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    console.log(req.body);
    
    const { message, data, code } = await authController.signUp({
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

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { message, data, code } = await authController.login({
      ...req.body,
    });

    if (code === 0) {
      return next(new Success(message, data));
    }

   // return next(new BadRequest(message));
   res.status(400).json({ Error: message });

  } catch (err) {
    console.log(err);
    return next(new InternalServerError("Internal Server Error", req));
  }
};
