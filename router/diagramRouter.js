const Router = require('express').Router;
const diagramRouter = new Router();
const authMiddleware = require('../middleware/authMiddleware');
const diagramController = require('../controllers/diagramController');

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

// diagramRouter.post(
//   '/trans_update',
//   authMiddleware,
//   diagramController.updateTransaction
// );

// diagramRouter.post(
//   '/trans_del',
//   authMiddleware,
//   diagramController.delTransaction
// );
// category

// diagramRouter.get(
//   '/trans_category_list',
//   authMiddleware,
//   diagramController.getAllTransCategory
// );

// diagramRouter.post(
//   '/trans_category_update',
//   authMiddleware,
//   diagramController.updateTransCategory
// );

// chapter

module.exports = diagramRouter;
