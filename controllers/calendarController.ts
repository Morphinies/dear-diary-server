import { Request, Response } from 'express';
import ApiError from '../exceptions/apiError';
import userService from '../service/userService';
import calendarService from '../service/calendarService';

class calendarController {
  async getCalendarData(req: Request, res: Response, next: (e: Error) => void) {
    try {
      const menuId = req.query.menuId as string | undefined;
      if (!menuId) {
        return next(ApiError.BadRequest('menuId is required', []));
      }
      const user: any = await userService.getUserFromCookies(req.cookies);
      if (!user) {
        return next(ApiError.UnauthorizedError());
      }
      const item = await calendarService.getCalendarData(user.id, menuId);
      return res.json(item);
    } catch (e) {
      next(e as Error);
    }
  }

  async updateCalendarData(
    req: Request,
    res: Response,
    next: (e: Error) => void
  ) {
    try {
      const body = req.body;
      if (!body) {
        return next(ApiError.BadRequest('Нет тела запроса', []));
      }
      const user: any = await userService.getUserFromCookies(req.cookies);
      if (!user) {
        return next(ApiError.UnauthorizedError());
      }
      const updatedItem = await calendarService.updateCalendarData(
        user.id,
        body
      );
      if (!updatedItem) {
        return next(ApiError.BadRequest('Не удалось обновить запись', []));
      }
      return res.json(updatedItem);
    } catch (e) {
      next(e as Error);
    }
  }

  async deleteCalendarData(
    req: Request,
    res: Response,
    next: (e: Error) => void
  ) {
    try {
      const itemId = req.query.id;
      if (!itemId) {
        return next(ApiError.BadRequest('id is required', []));
      }
      const user: any = await userService.getUserFromCookies(req.cookies);
      if (!user) {
        return next(ApiError.UnauthorizedError());
      }
      const updatedItem = await calendarService.deleteCalendarData(
        user.id,
        itemId
      );
      if (!updatedItem) {
        return next(ApiError.BadRequest('Не удалось обновить запись', []));
      }
      return res.json(updatedItem);
    } catch (e) {
      next(e as Error);
    }
  }

  async updateCalendarDayData(
    req: Request,
    res: Response,
    next: (e: Error) => void
  ) {
    try {
      const body = req.body;
      if (!body) {
        return next(ApiError.BadRequest('Нет тела запроса', []));
      }
      const user: any = await userService.getUserFromCookies(req.cookies);
      if (!user) {
        return next(ApiError.UnauthorizedError());
      }
      const updatedItem = await calendarService.updateCalendarDayData(
        user.id,
        body
      );
      if (!updatedItem) {
        return next(ApiError.BadRequest('Не удалось обновить запись', []));
      }
      return res.json(updatedItem);
    } catch (e) {
      next(e as Error);
    }
  }

  async updateCalendarDayTask(
    req: Request,
    res: Response,
    next: (e: Error) => void
  ) {
    try {
      const body = req.body;
      if (!body) {
        return next(ApiError.BadRequest('Нет тела запроса', []));
      }
      const user: any = await userService.getUserFromCookies(req.cookies);
      if (!user) {
        return next(ApiError.UnauthorizedError());
      }
      const updatedItem = await calendarService.updateCalendarDayTask(
        user.id,
        body
      );
      if (!updatedItem) {
        return next(ApiError.BadRequest('Не удалось обновить запись', []));
      }
      return res.json(updatedItem);
    } catch (e) {
      next(e as Error);
    }
  }

  async deleteCalendarDayTask(
    req: Request,
    res: Response,
    next: (e: Error) => void
  ) {
    try {
      const itemId = req.query.id as string | undefined;
      if (!itemId) {
        return next(ApiError.BadRequest('id is required', []));
      }
      const user: any = await userService.getUserFromCookies(req.cookies);
      if (!user) {
        return next(ApiError.UnauthorizedError());
      }
      const updatedItem = await calendarService.deleteCalendarDayTask(
        user.id,
        itemId
      );
      if (!updatedItem) {
        return next(ApiError.BadRequest('Не удалось обновить запись', []));
      }
      return res.json(updatedItem);
    } catch (e) {
      next(e as Error);
    }
  }
}

export default new calendarController();
