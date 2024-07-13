const Router = require('express').Router;
const listRouter = new Router();
const listController = require('../controllers/listController');
const authMiddleware = require('../middleware/authMiddleware');

listRouter.get('', authMiddleware, listController.getList);
listRouter.post('/item', authMiddleware, listController.updateItem);
listRouter.delete('/item', authMiddleware, listController.deleteItem);
listRouter.post('/item_sort', authMiddleware, listController.updateItemSort);

module.exports = listRouter;
