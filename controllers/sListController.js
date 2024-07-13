const ApiError = require('../exceptions/apiError');
const userService = require('../service/userService');
const sListService = require('../service/sListService');

class SListController {
  async getList(req, res, next) {
    try {
      const menuId = req.query.menuId;
      const user = await userService.getUserFromCookies(req.cookies);
      if (!user) {
        return next(ApiError.UnauthorizedError());
      }
      if (!menuId) {
        return next(ApiError.BadRequest('Not found "menuId"'));
      }
      const list = await sListService.getList(user.id, menuId);
      return res.json(list);
    } catch (e) {
      next(e);
    }
  }

  async updateItem(req, res, next) {
    try {
      const body = req.body;
      if (!body) {
        return next(ApiError.BadRequest('Нет тела запроса', []));
      }
      const user = await userService.getUserFromCookies(req.cookies);
      if (!user) {
        return next(ApiError.UnauthorizedError());
      }
      const updatedItem = await sListService.updateItem(user.id, body);
      if (!updatedItem) {
        return next(ApiError.BadRequest('Не удалось обновить запись', []));
      }
      return res.json(updatedItem);
    } catch (e) {
      next(e);
    }
  }
  async deleteItem(req, res, next) {
    try {
      const item_id = req.query.item_id;
      const user = await userService.getUserFromCookies(req.cookies);
      if (!user) {
        return next(ApiError.UnauthorizedError());
      }
      if (!item_id) {
        return next(ApiError.BadRequest('Not found item_id'));
      }
      const list = await sListService.deleteItem(user.id, item_id);
      return res.json(list);
    } catch (e) {
      next(e);
    }
  }
  async updateItemSort(req, res, next) {
    try {
      const body = req.body;
      if (!body) {
        return next(ApiError.BadRequest('Нет тела запроса', []));
      }
      const user = await userService.getUserFromCookies(req.cookies);
      if (!user) {
        return next(ApiError.UnauthorizedError());
      }
      const updatedItem = await sListService.updateItemSort(user.id, body);
      if (!updatedItem) {
        return next(ApiError.BadRequest('Не удалось обновить запись', []));
      }
      return res.json(updatedItem);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new SListController();
