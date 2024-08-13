import { Router } from 'express';
const diagramRouter = Router();
import authMiddleware from '../middleware/authMiddleware';
import diagramController from '../controllers/diagramController';

// data
diagramRouter.get('/data_list', authMiddleware, diagramController.getDataList);

diagramRouter.post(
  '/update_item',
  authMiddleware,
  diagramController.updateItem
);

diagramRouter.delete('/del_item', authMiddleware, diagramController.deleteItem);

// category
diagramRouter.get(
  '/category_list',
  authMiddleware,
  diagramController.getCategoryList
);
diagramRouter.post(
  '/update_category',
  authMiddleware,
  diagramController.updateCategory
);
diagramRouter.delete(
  '/del_category',
  authMiddleware,
  diagramController.deleteCategory
);

// chapter
diagramRouter.get(
  '/chapter_list',
  authMiddleware,
  diagramController.getChapterList
);

diagramRouter.post(
  '/update_chapter',
  authMiddleware,
  diagramController.updateChapter
);

diagramRouter.delete(
  '/del_chapter',
  authMiddleware,
  diagramController.deleteChapter
);

export default diagramRouter;
