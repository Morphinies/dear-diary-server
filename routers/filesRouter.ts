import { Router } from 'express';
import authMiddleware from '../middleware/authMiddleware';
import filesController from '../controllers/filesController';

const filesRouter = Router();

filesRouter.post('/update', authMiddleware, filesController.updateFile);
filesRouter.delete('/delete', authMiddleware, filesController.deleteFile);

export default filesRouter;
