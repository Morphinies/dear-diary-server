import { Router } from 'express';
const menuRouter = Router();
import authMiddleware from '../middleware/authMiddleware';
import menuController from '../controllers/menuController';

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

export default menuRouter;
