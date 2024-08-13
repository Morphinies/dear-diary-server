import { Request, Response } from 'express';
import ApiError from '../exceptions/apiError';
import userService from '../service/userService';
import tokenService from '../service/tokenService';
import { validationResult } from 'express-validator';

class UserController {
  async registration(req: Request, res: Response, next: (e: Error) => void) {
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
      next(e as Error);
    }
  }

  async resendLink(req: Request, res: Response, next: (e: Error) => void) {
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
      next(e as Error);
    }
  }

  async login(req: Request, res: Response, next: (e: Error) => void) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 3600 * 1000,
        httpOnly: true,
      });
      return res.json({ data: userData });
    } catch (e) {
      next(e as Error);
    }
  }
  async checkAuth(req: Request, res: Response, next: (e: Error) => void) {
    try {
      const { refreshToken } = req.cookies;
      const tokenData: any = await tokenService.findToken(refreshToken);
      if (!tokenData) {
        next(ApiError.UnauthorizedError());
      }
      const userData = await userService.getUser(tokenData.user);
      if (!userData) {
        next(ApiError.UnauthorizedError());
      }
      return res.json({ ...userData });
    } catch (e) {
      next(e as Error);
    }
  }
  async logout(req: Request, res: Response, next: (e: Error) => void) {
    try {
      const { refreshToken } = req.cookies;
      console.log(refreshToken);
      const token = await userService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.json(token);
    } catch (e) {
      next(e as Error);
    }
  }
  async refresh(req: Request, res: Response, next: (e: Error) => void) {
    try {
      const { refreshToken } = req.cookies;
      const tokens = await userService.refresh(refreshToken);
      res.cookie('refreshToken', tokens.refreshToken, {
        maxAge: 30 * 24 * 3600 * 1000,
        httpOnly: true,
      });
      return res.json({ ...tokens });
    } catch (e) {
      next(e as Error);
    }
  }
  async activate(req: Request, res: Response, next: (e: Error) => void) {
    try {
      console.log('activate');
      const activationLink = req.params.link;
      await userService.activate(activationLink);
      if (!process.env.CLIENT_URL) {
        throw new Error('CLIENT_URL not specified');
      }
      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      next(e as Error);
    }
  }
  async getUsers(req: Request, res: Response, next: (e: Error) => void) {
    try {
      const users = await userService.getAllUsers();
      res.json({ data: users });
    } catch (e) {
      next(e as Error);
    }
  }
}

export default new UserController();
