import * as userController from "../../services/User";
import { Request, Response, NextFunction } from "express";
import { friendRequest } from "../../models";
import { IFriendRequest } from "../../models/interfaces/friendRequest";
import { Success, Created } from "../../../utils/response/success/successes";
import {
  InternalServerError,
  BadRequest,
  NotFound,
} from "../../../utils/response/error/errors";

export interface IuserRequest extends Request {
  user: {
    _id: string;
  };
}

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

    // return next(new BadRequest(message));
    res.status(400).json({ Error: message });
  } catch (err) {
    console.log(err);
    return next(new InternalServerError("Internal Server Error", req));
  }
};

export const showProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { message, data, code } = await userController.showProfile(
      req.params.userId
    );

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

export const getMyFriends = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    let senderId = req.user._id;

    const { message, data, code } = await userController.getMyFriends(senderId);

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

    //return next(new BadRequest(message));
    res.status(400).json({ Error: message });
  } catch (err) {
    console.log(err);
    return next(new InternalServerError("Internal Server Error", req));
  }
};

export const sendFriendRequest = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    let senderId = req.user._id;
    const { message, data, code } = await userController.sendFriendRequest({
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

export const changeStatusFriendRequest = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    let recipientId = req.user._id;

    const { message, data, code } =
      await userController.changeStatusFriendRequest(req.params.id, {
        recipientId,
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

export const searchUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { message, data, code } = await userController.searchUser(
      req.params.name
    );

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
