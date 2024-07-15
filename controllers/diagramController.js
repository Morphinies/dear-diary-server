const ApiError = require('../exceptions/apiError');
const userService = require('../service/userService');
const diagramService = require('../service/diagramService');

class DiagramController {
  // data

  async getDataList(req, res, next) {
    try {
      const user = await userService.getUserFromCookies(req.cookies);
      if (!user) {
        return next(ApiError.UnauthorizedError());
      }
      const transCategoryList = await diagramService.getDataList(user.id);
      return res.json(transCategoryList);
    } catch (e) {
      next(e);
    }
  }

  // category

  async getCategoryList(req, res, next) {
    try {
      const chapterId = req.query.chapterId;
      if (!chapterId) {
        return next(ApiError.BadRequest('Not found chapterId'));
      }
      const user = await userService.getUserFromCookies(req.cookies);
      if (!user) {
        return next(ApiError.UnauthorizedError());
      }
      const transCategoryList = await diagramService.getCategoryList(
        user.id,
        chapterId
      );
      return res.json(transCategoryList);
    } catch (e) {
      next(e);
    }
  }

  async updateCategory(req, res, next) {
    try {
      const body = req.body;
      if (!body) {
        return next(ApiError.BadRequest('Нет тела запроса', []));
      }
      const user = await userService.getUserFromCookies(req.cookies);
      if (!user) {
        return next(ApiError.UnauthorizedError());
      }
      const updatedCategory = await diagramService.updateCategory(
        user.id,
        body
      );
      if (!updatedCategory) {
        return next(ApiError.BadRequest('Не удалось обновить запись', []));
      }
      return res.json(updatedCategory);
    } catch (e) {
      next(e);
    }
  }

  async deleteCategory(req, res, next) {
    try {
      const id = req.query.id;
      if (!id) {
        return next(ApiError.BadRequest('Not found id'));
      }
      const user = await userService.getUserFromCookies(req.cookies);
      if (!user) {
        return next(ApiError.UnauthorizedError());
      }
      const updatedCategory = await diagramService.deleteCategory(user.id, id);
      if (!updatedCategory) {
        return next(ApiError.BadRequest('Не удалось обновить запись', []));
      }
      return res.json(updatedCategory);
    } catch (e) {
      next(e);
    }
  }

  // chapter

  async getChapterList(req, res, next) {
    try {
      const menuId = req.query.menuId;
      if (!menuId) {
        return next(ApiError.BadRequest('Not found menuId'));
      }
      const user = await userService.getUserFromCookies(req.cookies);
      if (!user) {
        return next(ApiError.UnauthorizedError());
      }
      const chapterList = await diagramService.getChapterList(user.id, menuId);
      return res.json(chapterList);
    } catch (e) {
      next(e);
    }
  }

  async updateChapter(req, res, next) {
    try {
      const body = req.body;
      if (!body) {
        return next(ApiError.BadRequest('Нет тела запроса', []));
      }
      const user = await userService.getUserFromCookies(req.cookies);
      if (!user) {
        return next(ApiError.UnauthorizedError());
      }
      const updatedCategory = await diagramService.updateChapter(user.id, body);
      if (!updatedCategory) {
        return next(ApiError.BadRequest('Не удалось обновить запись', []));
      }
      return res.json(updatedCategory);
    } catch (e) {
      next(e);
    }
  }

  async deleteChapter(req, res, next) {
    try {
      const id = req.query.id;
      if (!id) {
        return next(ApiError.BadRequest('Not found id'));
      }
      const user = await userService.getUserFromCookies(req.cookies);
      if (!user) {
        return next(ApiError.UnauthorizedError());
      }
      const updatedCategory = await diagramService.deleteChapter(user.id, id);
      if (!updatedCategory) {
        return next(ApiError.BadRequest('Не удалось обновить запись', []));
      }
      return res.json(updatedCategory);
    } catch (e) {
      next(e);
    }
  }

  // old

  async updateTransCategory(req, res, next) {
    try {
      const body = req.body;
      if (!body) {
        return next(ApiError.BadRequest('Нет тела запроса', []));
      }
      const user = await userService.getUserFromCookies(req.cookies);
      if (!user) {
        return next(ApiError.UnauthorizedError());
      }
      const updatedCategory = await diagramService.updateTransCategory(
        user.id,
        body
      );
      if (!updatedCategory) {
        return next(ApiError.BadRequest('Не удалось обновить запись', []));
      }
      return res.json(updatedCategory);
    } catch (e) {
      next(e);
    }
  }
  async getAllTransactions(req, res, next) {
    try {
      const user = await userService.getUserFromCookies(req.cookies);
      if (!user) {
        return next(ApiError.UnauthorizedError());
      }
      const transactions = await diagramService.getAllTransactions(user.id);
      return res.json(transactions);
    } catch (e) {
      next(e);
    }
  }
  async updateTransaction(req, res, next) {
    try {
      const body = req.body;
      if (!body) {
        return next(ApiError.BadRequest('Нет тела запроса', []));
      }
      const user = await userService.getUserFromCookies(req.cookies);
      if (!user) {
        return next(ApiError.UnauthorizedError());
      }
      const updatedTransaction = await diagramService.updateTransaction(
        user.id,
        body
      );
      if (!updatedTransaction) {
        return next(ApiError.BadRequest('Не удалось обновить запись', []));
      }
      return res.json(updatedTransaction);
    } catch (e) {
      next(e);
    }
  }
  async delTransaction(req, res, next) {
    try {
      const body = req.body;
      if (!body) {
        return next(ApiError.BadRequest('Нет тела запроса', []));
      }
      const user = await userService.getUserFromCookies(req.cookies);
      if (!user) {
        return next(ApiError.UnauthorizedError());
      }
      const updatedCategory = await diagramService.delTransaction(
        user.id,
        body
      );
      if (!updatedCategory) {
        return next(ApiError.BadRequest('Не удалось обновить запись', []));
      }
      return res.json(updatedCategory);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new DiagramController();
