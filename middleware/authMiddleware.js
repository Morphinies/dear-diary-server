const jwt = require('jsonwebtoken');
const { secret } = require('../config');
const ApiError = require('../exceptions/apiError');
const tokenSetrvice = require('../service/tokenService');

module.exports = function (req, res, next) {
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
};

// module.exports = function (req, res, next) {
//   if (req.method === 'OPTIONS') {
//     next();
//   }
//   try {
//     const token = req.headers.authorization.split(' ')[1];
//     if (!token) {
//       return res.status(403).json({ message: 'Пользователь не авторизован' });
//     }
//     const decodedData = jwt.verify(token, secret);
//     req.user = decodedData;
//     next();
//   } catch (err) {
//     console.log(err);
//     return res.status(403).json({ message: 'Пользователь не авторизован' });
//   }
// };
