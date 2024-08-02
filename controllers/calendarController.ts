import ApiError from '../exceptions/apiError';
import userService from '../service/userService';
import calendarService from '../service/calendarService';

class calendarController {
  async getCalendarData(req: any, res: any, next: any) {
    try {
      const menuId = req.query.menuId;
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
      next(e);
    }
  }

  async updateCalendarData(req: any, res: any, next: any) {
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
      next(e);
    }
  }

  async deleteCalendarData(req: any, res: any, next: any) {
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
      next(e);
    }
  }

  async updateCalendarDayData(req: any, res: any, next: any) {
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
      next(e);
    }
  }
}

export default new calendarController();
