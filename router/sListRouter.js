const Router = require('express').Router;
const sListRouter = new Router();
const authMiddleware = require('../middleware/authMiddleware');
const sListController = require('../controllers/sListController');

sListRouter.get('', authMiddleware, sListController.getList);
sListRouter.post('/item', authMiddleware, sListController.updateItem);
sListRouter.delete('/item', authMiddleware, sListController.deleteItem);
sListRouter.post('/item_sort', authMiddleware, sListController.updateItemSort);

module.exports = sListRouter;
