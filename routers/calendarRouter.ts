import { Router } from 'express';
const calendarRouter = Router();
import authMiddleware from '../middleware/authMiddleware';
import calendarController from '../controllers/calendarController';

calendarRouter.get('/data', authMiddleware, calendarController.getCalendarData);
calendarRouter.post(
  '/data',
  authMiddleware,
  calendarController.updateCalendarData
);
calendarRouter.delete(
  '/data',
  authMiddleware,
  calendarController.deleteCalendarData
);
calendarRouter.post(
  '/day_data',
  authMiddleware,
  calendarController.updateCalendarDayData
);
calendarRouter.post(
  '/day_task',
  authMiddleware,
  calendarController.updateCalendarDayTask
);
calendarRouter.delete(
  '/day_task',
  authMiddleware,
  calendarController.deleteCalendarDayTask
);

export default calendarRouter;
