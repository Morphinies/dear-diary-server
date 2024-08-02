import ApiError from '../exceptions/apiError';
import userService from '../service/userService';
import listService from '../service/listService';

class ListController {
  async getList(req: any, res: any, next: any) {
    try {
      const menuId = req.query.menuId;
      const user: any = await userService.getUserFromCookies(req.cookies);
      if (!user) {
        return next(ApiError.UnauthorizedError());
      }
      if (!menuId) {
        return next(ApiError.BadRequest('Not found "menuId"'));
      }
      const list = await listService.getList(user.id, menuId);
      return res.json(list);
    } catch (e) {
      next(e);
    }
  }

  async updateItem(req: any, res: any, next: any) {
    try {
      const body = req.body;
      if (!body) {
        return next(ApiError.BadRequest('Нет тела запроса', []));
      }
      const user: any = await userService.getUserFromCookies(req.cookies);
      if (!user) {
        return next(ApiError.UnauthorizedError());
      }
      const updatedItem = await listService.updateItem(user.id, body);
      if (!updatedItem) {
        return next(ApiError.BadRequest('Не удалось обновить запись', []));
      }
      return res.json(updatedItem);
    } catch (e) {
      next(e);
    }
  }
  async deleteItem(req: any, res: any, next: any) {
    try {
      const item_id = req.query.item_id;
      if (!item_id) {
        return next(ApiError.BadRequest('Not found item_id'));
      }
      const user: any = await userService.getUserFromCookies(req.cookies);
      if (!user) {
        return next(ApiError.UnauthorizedError());
      }
      const list = await listService.deleteItem(user.id, item_id);
      return res.json(list);
    } catch (e) {
      next(e);
    }
  }
  async updateItemSort(req: any, res: any, next: any) {
    try {
      const body = req.body;
      if (!body) {
        return next(ApiError.BadRequest('Нет тела запроса', []));
      }
      const user: any = await userService.getUserFromCookies(req.cookies);
      if (!user) {
        return next(ApiError.UnauthorizedError());
      }
      const updatedItem = await listService.updateItemSort(user.id, body);
      if (!updatedItem) {
        return next(ApiError.BadRequest('Не удалось обновить запись', []));
      }
      return res.json(updatedItem);
    } catch (e) {
      next(e);
    }
  }
  async completeItem(req: any, res: any, next: any) {
    try {
      const body = req.body;
      if (!body) {
        return next(ApiError.BadRequest('Нет тела запроса', []));
      }
      const user: any = await userService.getUserFromCookies(req.cookies);
      if (!user) {
        return next(ApiError.UnauthorizedError());
      }
      const updatedItem = await listService.completeItem(user.id, body);
      if (!updatedItem) {
        return next(ApiError.BadRequest('Не удалось обновить запись', []));
      }
      return res.json(updatedItem);
    } catch (e) {
      next(e);
    }
  }
}

export default new ListController();
