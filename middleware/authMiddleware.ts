// import { secret } from '../config';
import { Request, Response } from 'express';
import ApiError from '../exceptions/apiError';
import tokenSetrvice from '../service/tokenService';

export default function (req: Request, res: Response, next: (e?: any) => void) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError());
    }
    const accessToken = authorizationHeader.split(' ')[1];
    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }
    const userData = tokenSetrvice.validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }
    (req as any).user = userData;
    next();
  } catch (e) {
    return next(ApiError.UnauthorizedError());
  }
}
