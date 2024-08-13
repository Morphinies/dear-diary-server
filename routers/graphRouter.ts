import { Router } from 'express';
const graphRouter = Router();
import authMiddleware from '../middleware/authMiddleware';
import graphController from '../controllers/graphController';

// data
graphRouter.get('/data_list', authMiddleware, graphController.getDataList);

graphRouter.post('/update_item', authMiddleware, graphController.updateItem);

graphRouter.delete('/del_item', authMiddleware, graphController.deleteItem);

// chapter
graphRouter.get(
  '/chapter_list',
  authMiddleware,
  graphController.getChapterList
);

graphRouter.post(
  '/update_chapter',
  authMiddleware,
  graphController.updateChapter
);

graphRouter.delete(
  '/del_chapter',
  authMiddleware,
  graphController.deleteChapter
);

export default graphRouter;
