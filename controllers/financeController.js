const ApiError = require('../exceptions/apiError');
const userService = require('../service/userService');
const financeService = require('../service/financeService');

class FinanceController {
  async getAllTransCategory(req, res, next) {
    try {
      const user = await userService.getUserFromCookies(req.cookies);
      if (!user) {
        return next(ApiError.UnauthorizedError());
      }
      const transCategoryList = await financeService.getAllTransCategory(
        user.id
      );
      return res.json(transCategoryList);
    } catch (e) {
      next(e);
    }
  }
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
      const updatedCategory = await financeService.updateTransCategory(
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
      const transactions = await financeService.getAllTransactions(user.id);
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
      const updatedTransaction = await financeService.updateTransaction(
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
      const updatedCategory = await financeService.delTransaction(
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

module.exports = new FinanceController();
