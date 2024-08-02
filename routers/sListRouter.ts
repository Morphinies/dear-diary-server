import { Router } from 'express';
const sListRouter = Router();
import authMiddleware from '../middleware/authMiddleware';
import sListController from '../controllers/sListController';

sListRouter.get('', authMiddleware, sListController.getList);
sListRouter.post('/item', authMiddleware, sListController.updateItem);
sListRouter.delete('/item', authMiddleware, sListController.deleteItem);
sListRouter.post('/item_sort', authMiddleware, sListController.updateItemSort);

export default sListRouter;
