import { Router } from 'express';
const listRouter = Router();
import authMiddleware from '../middleware/authMiddleware';
import listController from '../controllers/listController';

listRouter.get('', authMiddleware, listController.getList);
listRouter.post('/item', authMiddleware, listController.updateItem);
listRouter.delete('/item', authMiddleware, listController.deleteItem);
listRouter.post('/item_sort', authMiddleware, listController.updateItemSort);
listRouter.post('/item_complete', authMiddleware, listController.completeItem);

export default listRouter;
