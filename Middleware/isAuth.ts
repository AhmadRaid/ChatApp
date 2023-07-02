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
    
    return next(new Unauthorized('Unauthorized'));
  }

  if (!authorization.startsWith('Bearer')) {
    return next(new Unauthorized('Unauthorized'));
  }

  const token = authorization.split(' ')[1];

  try {
    const decodedToken = verifyAccessToken(token);

    if (!decodedToken) {
      return next(new Unauthorized('Unauthorized'));
    }

    const user = await User.findOne({ _id: decodedToken.data.id });
    if (!user) {

      return next(new Unauthorized('Unauthorized'));
    }

    req.user = user;
    return next();
  } catch (err) {
    console.log(err);
    return next(new Unauthorized('Unauthorized'));
  }
}

export default isAuth;
