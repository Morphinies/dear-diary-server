import { Request, Response } from 'express';
import ApiError from '../exceptions/apiError';
import userService from '../service/userService';
import sListService from '../service/sListService';

class SListController {
  async getList(req: Request, res: Response, next: (e: Error) => void) {
    try {
      const menuId = req.query.menuId;
      const user: any = await userService.getUserFromCookies(req.cookies);
      if (!user) {
        return next(ApiError.UnauthorizedError());
      }
      if (!menuId) {
        return next(ApiError.BadRequest('Not found "menuId"'));
      }
      const list = await sListService.getList(user.id, menuId);
      return res.json(list);
    } catch (e) {
      next(e as Error);
    }
  }

  async updateItem(req: Request, res: Response, next: (e: Error) => void) {
    try {
      const body = req.body;
      if (!body) {
        return next(ApiError.BadRequest('Нет тела запроса', []));
      }
      const user: any = await userService.getUserFromCookies(req.cookies);
      if (!user) {
        return next(ApiError.UnauthorizedError());
      }
      const updatedItem = await sListService.updateItem(user.id, body);
      if (!updatedItem) {
        return next(ApiError.BadRequest('Не удалось обновить запись', []));
      }
      return res.json(updatedItem);
    } catch (e) {
      next(e as Error);
    }
  }
  async deleteItem(req: Request, res: Response, next: (e: Error) => void) {
    try {
      const item_id = req.query.item_id;
      const user: any = await userService.getUserFromCookies(req.cookies);
      if (!user) {
        return next(ApiError.UnauthorizedError());
      }
      if (!item_id) {
        return next(ApiError.BadRequest('Not found item_id'));
      }
      const list = await sListService.deleteItem(user.id, item_id);
      return res.json(list);
    } catch (e) {
      next(e as Error);
    }
  }
  async updateItemSort(req: Request, res: Response, next: (e: Error) => void) {
    try {
      const body = req.body;
      if (!body) {
        return next(ApiError.BadRequest('Нет тела запроса', []));
      }
      const user: any = await userService.getUserFromCookies(req.cookies);
      if (!user) {
        return next(ApiError.UnauthorizedError());
      }
      const updatedItem = await sListService.updateItemSort(user.id, body);
      if (!updatedItem) {
        return next(ApiError.BadRequest('Не удалось обновить запись', []));
      }
      return res.json(updatedItem);
    } catch (e) {
      next(e as Error);
    }
  }
}

export default new SListController();
