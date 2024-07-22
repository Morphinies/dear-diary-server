const Router = require('express').Router;
const calendarRouter = new Router();
const authMiddleware = require('../middleware/authMiddleware');
const calendarController = require('../controllers/calendarController');

calendarRouter.get('', authMiddleware, calendarController.getCalendarData);
calendarRouter.post('', authMiddleware, calendarController.update);
calendarRouter.delete('', authMiddleware, calendarController.delete);

module.exports = calendarRouter;
