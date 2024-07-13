const Router = require('express').Router;
const financeRouter = new Router();
const authMiddleware = require('../middleware/authMiddleware');
const financeController = require('../controllers/financeController');

financeRouter.get(
  '/trans_category_list',
  authMiddleware,
  financeController.getAllTransCategory
);
financeRouter.post(
  '/trans_category_update',
  authMiddleware,
  financeController.updateTransCategory
);

financeRouter.get(
  '/trans_list',
  authMiddleware,
  financeController.getAllTransactions
);
financeRouter.post(
  '/trans_update',
  authMiddleware,
  financeController.updateTransaction
);
financeRouter.post(
  '/trans_del',
  authMiddleware,
  financeController.delTransaction
);

module.exports = financeRouter;
