import { Schema, model } from 'mongoose';

const CalendarData = new Schema({
  menuId: { type: String },
  userId: { type: String },
  deadlineIds: { type: [String] },
});

export default model('calendar_data', CalendarData);
