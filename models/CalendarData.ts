import { Schema, model } from 'mongoose';

const CalendarData = new Schema({
  menuId: { type: String, required: true },
  userId: { type: String, required: true },
  deadlineIds: { type: [String], required: true, default: [] },
});

export default model('calendar_data', CalendarData);
export type CalendarDataType = typeof CalendarData;
