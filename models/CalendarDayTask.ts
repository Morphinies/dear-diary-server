import { Schema, model } from 'mongoose';

const CalendarDayTask = new Schema({
  text: { type: String },
  userId: { type: String },
  menuId: { type: String },
  dayIds: { type: [Number], default: [] },
  updatedAt: { type: Number, default: +new Date() },
  createdAt: { type: Number, default: +new Date() },
});

export default model('calendar_day_task', CalendarDayTask);
