import { Request, Response, NextFunction } from 'express';
import { Unauthorized } from '../utils/response/error/errors';
import { verifyAccessToken } from '../utils/jwt';
import { User } from '../app/models';

export interface IUserRequest extends Request {
  user: {
    _id: string,
  };
}

async function isAuth(req: IUserRequest, res: Response, next: NextFunction) {
  const {
    headers: { authorization },
  } = req;

  if (!authorization) {
    console.log("1");
    
    return next(new Unauthorized('Unauthorized'));
  }

  if (!authorization.startsWith('Bearer')) {
    console.log("2");

    return next(new Unauthorized('Unauthorized'));
  }

  const token = authorization.split(' ')[1];

  try {
    console.log("3");
    const decodedToken = verifyAccessToken(token);
    console.log("31");

    if (!decodedToken) {
      console.log("4");

      return next(new Unauthorized('Unauthorized'));
    }
    console.log("5");

    const user = await User.findOne({ _id: decodedToken.data.id });
    if (!user) {
      console.log("6");

      return next(new Unauthorized('Unauthorized'));
    }
    console.log("7");

    req.user = user;
    return next();
  } catch (err) {
    console.log("8");
    console.log(err);
    return next(new Unauthorized('Unauthorized'));
  }
}

export default isAuth;
