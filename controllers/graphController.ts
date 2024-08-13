import { Request, Response } from 'express';
import ApiError from '../exceptions/apiError';
import userService from '../service/userService';
import graphService from '../service/graphService';

class GraphController {
  // data
  async getDataList(req: Request, res: Response, next: (e: Error) => void) {
    try {
      const chapterId = req.query.chapterId;
      if (!chapterId) {
        return next(ApiError.BadRequest('Not found chapterId'));
      }
      const user: any = await userService.getUserFromCookies(req.cookies);
      if (!user) {
        return next(ApiError.UnauthorizedError());
      }
      const transCategoryList = await graphService.getDataList(
        user.id,
        chapterId
      );
      return res.json(transCategoryList);
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
      const updatedCategory = await graphService.updateItem(user.id, body);
      if (!updatedCategory) {
        return next(ApiError.BadRequest('Не удалось обновить запись', []));
      }
      return res.json(updatedCategory);
    } catch (e) {
      next(e as Error);
    }
  }

  async deleteItem(req: Request, res: Response, next: (e: Error) => void) {
    try {
      const id = req.query.id;
      if (!id) {
        return next(ApiError.BadRequest('Not found id'));
      }
      const user: any = await userService.getUserFromCookies(req.cookies);
      if (!user) {
        return next(ApiError.UnauthorizedError());
      }
      const deletedItem = await graphService.deleteItem(user.id, id);
      if (!deletedItem) {
        return next(ApiError.BadRequest('Не удалось обновить запись', []));
      }
      return res.json(deletedItem);
    } catch (e) {
      next(e as Error);
    }
  }

  // chapter

  async getChapterList(req: Request, res: Response, next: (e: Error) => void) {
    try {
      const menuId = req.query.menuId;
      if (!menuId) {
        return next(ApiError.BadRequest('Not found menuId'));
      }
      const user: any = await userService.getUserFromCookies(req.cookies);
      if (!user) {
        return next(ApiError.UnauthorizedError());
      }
      const chapterList = await graphService.getChapterList(user.id, menuId);
      return res.json(chapterList);
    } catch (e) {
      next(e as Error);
    }
  }

  async updateChapter(req: Request, res: Response, next: (e: Error) => void) {
    try {
      const body = req.body;
      if (!body) {
        return next(ApiError.BadRequest('Нет тела запроса', []));
      }
      const user: any = await userService.getUserFromCookies(req.cookies);
      if (!user) {
        return next(ApiError.UnauthorizedError());
      }
      const updatedCategory = await graphService.updateChapter(user.id, body);
      if (!updatedCategory) {
        return next(ApiError.BadRequest('Не удалось обновить запись', []));
      }
      return res.json(updatedCategory);
    } catch (e) {
      next(e as Error);
    }
  }

  async deleteChapter(req: Request, res: Response, next: (e: Error) => void) {
    try {
      const id = req.query.id;
      if (!id) {
        return next(ApiError.BadRequest('Not found id'));
      }
      const user: any = await userService.getUserFromCookies(req.cookies);
      if (!user) {
        return next(ApiError.UnauthorizedError());
      }
      const updatedCategory = await graphService.deleteChapter(user.id, id);
      if (!updatedCategory) {
        return next(ApiError.BadRequest('Не удалось обновить запись', []));
      }
      return res.json(updatedCategory);
    } catch (e) {
      next(e as Error);
    }
  }
}

export default new GraphController();
