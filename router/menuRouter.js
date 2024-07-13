const Router = require('express').Router;
const menuRouter = new Router();
const authMiddleware = require('../middleware/authMiddleware');
const menuController = require('../controllers/menuController');

menuRouter.get('', authMiddleware, menuController.getItem);
menuRouter.post('', authMiddleware, menuController.update);
menuRouter.delete('', authMiddleware, menuController.delete);
menuRouter.get('/list', authMiddleware, menuController.getList);
// menuRouter.delete('/list', authMiddleware, menuController.deleteList);
// menuRouter.get('/lists', authMiddleware, menuController.getListsList);
// menuRouter.get('/items', authMiddleware, menuController.getItemsList);
// menuRouter.post('/item', authMiddleware, menuController.updateItem);
// menuRouter.delete('/item', authMiddleware, menuController.deleteItem);
// menuRouter.post('/item_sort', authMiddleware, menuController.updateItemSort);

module.exports = menuRouter;
