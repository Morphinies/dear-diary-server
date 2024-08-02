import { Router } from 'express';
const listRouter = Router();
import authMiddleware from '../middleware/authMiddleware';
import listController from '../controllers/listController';
// const listController = require('../controllers/listController');
// const authMiddleware = require('../middleware/authMiddleware');

listRouter.get('', authMiddleware, listController.getList);
listRouter.post('/item', authMiddleware, listController.updateItem);
listRouter.delete('/item', authMiddleware, listController.deleteItem);
listRouter.post('/item_sort', authMiddleware, listController.updateItemSort);
listRouter.post('/item_complete', authMiddleware, listController.completeItem);

// module.exports = listRouter;
export default listRouter;
