import { Router } from 'express';
const menuRouter = Router();
import authMiddleware from '../middleware/authMiddleware';
import menuController from '../controllers/menuController';

menuRouter.get('', authMiddleware, menuController.getItem);
menuRouter.post('', authMiddleware, menuController.update);
menuRouter.delete('', authMiddleware, menuController.delete);
menuRouter.get('/list', authMiddleware, menuController.getList);

export default menuRouter;
