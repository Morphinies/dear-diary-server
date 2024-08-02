// import jwt from 'jsonwebtoken'
import { secret } from '../config';
import ApiError from '../exceptions/apiError';
import tokenSetrvice from '../service/tokenService';
// const ApiError = require('../exceptions/apiError');
// const tokenSetrvice = require('../service/tokenService');

export default function (req: any, res: any, next: any) {
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
    req.user = userData;
    next();
  } catch (e) {
    return next(ApiError.UnauthorizedError());
  }
}
