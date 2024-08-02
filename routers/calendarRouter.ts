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

export default calendarRouter;
