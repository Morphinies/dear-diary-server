import { Schema, model } from 'mongoose';

const CalendarDayTask = new Schema({
  userId: { type: String, required: true },
  menuId: { type: String, required: true },
  updatedAt: { type: Number, default: +new Date() },
  createdAt: { type: Number, default: +new Date() },
  text: { type: String, required: true, default: '' },
  dayIds: { type: [Number], default: [], required: true },
});

export default model('calendar_day_task', CalendarDayTask);
export type CalendarDayTaskType = typeof CalendarDayTask;
