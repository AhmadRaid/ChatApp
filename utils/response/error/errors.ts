import { GeneralError } from "./GeneralError";
import {
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST,
  UNAUTHORIZED,
  UNPROCESSABLE_ENTITY,
  NOT_FOUND,
  ACCESS_DENIED,
} from "../../httpCode";

import { Request, Response, NextFunction } from 'express';

export class BadRequest extends GeneralError {
  constructor(message: string, data: any = undefined) {
    super(message, BAD_REQUEST, data);
  }
}

export class InternalServerError extends GeneralError {
  constructor(
    message: string,
    req: Request<{}, {}, any, {}>,
    data: any = undefined
  ) {
    super(message, INTERNAL_SERVER_ERROR, data);
  }
}

export class Unauthorized extends GeneralError {
  constructor(message: string, data: any = undefined) {
    super(message, UNAUTHORIZED, data);
  }
}

export class AccessDenied extends GeneralError {
  constructor(message: string, data: any = undefined) {
    super(message, ACCESS_DENIED, data);
  }
}

export class UnprocessableEntity extends GeneralError {
  constructor(message: string, data: any = undefined) {
    super(message, UNPROCESSABLE_ENTITY, data);
  }
}

export class NotFound extends GeneralError {
  constructor(message: string, data: any = undefined) {
    super(message, NOT_FOUND, data);
  }
}
