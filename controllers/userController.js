const ApiError = require('../exceptions/apiError');
const tokenService = require('../service/tokenService');
const userService = require('../service/userService');
const { validationResult } = require('express-validator');

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest('Ошибка при валидации', errors.array())
        );
      }
      const { email, password } = req.body;
      const userData = await userService.registration(email, password);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 3600 * 1000,
        httpOnly: true,
      });
      return res.json({ data: userData });
    } catch (e) {
      next(e);
    }
  }

  async resendLink(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest('Ошибка при валидации', errors.array())
        );
      }
      const { email } = req.body;
      const userData = await userService.resendLink(email);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 3600 * 1000,
        httpOnly: true,
      });
      return res.json({ data: userData });
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 3600 * 1000,
        httpOnly: true,
      });
      return res.json({ data: userData });
    } catch (e) {
      next(e);
    }
  }
  async checkAuth(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const tokenData = await tokenService.findToken(refreshToken);
      if (!tokenData) {
        next(ApiError.UnauthorizedError());
      }
      const userData = await userService.getUser(tokenData.user);
      if (!userData) {
        next(ApiError.UnauthorizedError());
      }
      return res.json({ ...userData });
    } catch (e) {
      next(e);
    }
  }
  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      console.log(refreshToken);
      const token = await userService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }
  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 3600 * 1000,
        httpOnly: true,
      });
      return res.json({ ...userData });
    } catch (e) {
      next(e);
    }
  }
  async activate(req, res, next) {
    try {
      console.log('activate');
      const activationLink = req.params.link;
      await userService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      next(e);
    }
  }
  async getUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      res.json({ data: users });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
