import ApiError from '../exceptions/apiError';
import userService from '../service/userService';
import graphService from '../service/graphService';

class GraphController {
  // data
  async getDataList(req: any, res: any, next: any) {
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
      const updatedCategory = await graphService.updateItem(user.id, body);
      if (!updatedCategory) {
        return next(ApiError.BadRequest('Не удалось обновить запись', []));
      }
      return res.json(updatedCategory);
    } catch (e) {
      next(e);
    }
  }

  async deleteItem(req: any, res: any, next: any) {
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
      next(e);
    }
  }

  // chapter

  async getChapterList(req: any, res: any, next: any) {
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
      next(e);
    }
  }

  async updateChapter(req: any, res: any, next: any) {
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
      next(e);
    }
  }

  async deleteChapter(req: any, res: any, next: any) {
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
      next(e);
    }
  }
}

export default new GraphController();
