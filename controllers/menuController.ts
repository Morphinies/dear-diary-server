import ApiError from '../exceptions/apiError';
import userService from '../service/userService';
import menuService from '../service/menuService';

class menuController {
  async getList(req: any, res: any, next: any) {
    try {
      const typeId = req.query.typeId;
      const params: any = {};
      if (typeId) params.typeId = typeId;
      const user: any = await userService.getUserFromCookies(req.cookies);
      if (!user) {
        return next(ApiError.UnauthorizedError());
      }
      const list = await menuService.getList(user.id, params);
      return res.json(list);
    } catch (e) {
      next(e);
    }
  }

  async getItem(req: any, res: any, next: any) {
    try {
      const id = req.query.id;
      if (!id) {
        return next(ApiError.BadRequest('id is required', []));
      }
      const user: any = await userService.getUserFromCookies(req.cookies);
      if (!user) {
        return next(ApiError.UnauthorizedError());
      }
      const item = await menuService.getItem(user.id, id);
      return res.json(item);
    } catch (e) {
      next(e);
    }
  }

  async update(req: any, res: any, next: any) {
    try {
      const body = req.body;
      if (!body) {
        return next(ApiError.BadRequest('Нет тела запроса', []));
      }
      if (!body.name) {
        return next(ApiError.BadRequest('name is required', []));
      }
      const user: any = await userService.getUserFromCookies(req.cookies);
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

  async delete(req: any, res: any, next: any) {
    try {
      const itemId = req.query.id;
      if (!itemId) {
        return next(ApiError.BadRequest('id is required', []));
      }
      const user: any = await userService.getUserFromCookies(req.cookies);
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

export default new menuController();
