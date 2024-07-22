const ApiError = require('../exceptions/apiError');
const userService = require('../service/userService');
const calendarService = require('../service/calendarService');

class calendarController {
  async getCalendarData(req, res, next) {
    try {
      const id = req.query.menuId;
      if (!id) {
        return next(ApiError.BadRequest('menuId is required', []));
      }
      const user = await userService.getUserFromCookies(req.cookies);
      if (!user) {
        return next(ApiError.UnauthorizedError());
      }
      const item = await calendarService.getCalendarData(user.id, id);
      return res.json(item);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const body = req.body;
      if (!body) {
        return next(ApiError.BadRequest('Нет тела запроса', []));
      }
      if (!body.name) {
        return next(ApiError.BadRequest('name is required', []));
      }
      const user = await userService.getUserFromCookies(req.cookies);
      if (!user) {
        return next(ApiError.UnauthorizedError());
      }
      const updatedItem = await calendarService.update(user.id, body);
      if (!updatedItem) {
        return next(ApiError.BadRequest('Не удалось обновить запись', []));
      }
      return res.json(updatedItem);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const itemId = req.query.id;
      if (!itemId) {
        return next(ApiError.BadRequest('id is required', []));
      }
      const user = await userService.getUserFromCookies(req.cookies);
      if (!user) {
        return next(ApiError.UnauthorizedError());
      }
      const updatedItem = await calendarService.delete(user.id, itemId);
      if (!updatedItem) {
        return next(ApiError.BadRequest('Не удалось обновить запись', []));
      }
      return res.json(updatedItem);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new calendarController();
