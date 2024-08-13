import { Schema, model } from 'mongoose';

const CalendarDayData = new Schema({
  userId: { type: String, required: true },
  menuId: { type: String, required: true },
  note: { type: String, required: true, default: '' },
  date: { type: Number, required: true, default: +new Date() },
  completedDayTaskIds: { type: [String], required: true, default: [] },
});

export default model('calendar_day_data', CalendarDayData);
export type CalendarDayDataType = typeof CalendarDayData;
