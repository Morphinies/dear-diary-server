const ApiError = require('../exceptions/apiError');
const menuService = require('../service/menuService');
const userService = require('../service/userService');

class menuController {
  async getList(req, res, next) {
    try {
      const user = await userService.getUserFromCookies(req.cookies);
      if (!user) {
        return next(ApiError.UnauthorizedError());
      }
      const list = await menuService.getList(user.id);
      return res.json(list);
    } catch (e) {
      next(e);
    }
  }

  async getItem(req, res, next) {
    try {
      const id = req.query.id;
      if (!id) {
        return next(ApiError.BadRequest('id is required', []));
      }
      const user = await userService.getUserFromCookies(req.cookies);
      if (!user) {
        return next(ApiError.UnauthorizedError());
      }
      const item = await menuService.getItem(user.id, id);
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
      const updatedItem = await menuService.update(user.id, body);
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
      const updatedItem = await menuService.delete(user.id, itemId);
      if (!updatedItem) {
        return next(ApiError.BadRequest('Не удалось обновить запись', []));
      }
      return res.json(updatedItem);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new menuController();
