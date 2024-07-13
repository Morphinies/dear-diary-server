const Router = require('express').Router;
const authMiddleware = require('../middleware/authMiddleware');
const filesController = require('../controllers/filesController');

const filesRouter = new Router();

filesRouter.post('/update', authMiddleware, filesController.updateFile);
filesRouter.delete('/delete', authMiddleware, filesController.deleteFile);

module.exports = filesRouter;
