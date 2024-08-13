import { Schema, model } from 'mongoose';

const CalendarDayData = new Schema({
  note: { type: String },
  date: { type: Number },
  userId: { type: String },
  menuId: { type: String },
  completedDayTaskIds: { type: [String] },
});

export default model('calendar_day_data', CalendarDayData);
