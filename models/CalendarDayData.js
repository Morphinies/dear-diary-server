const { Schema, model } = require('mongoose');

const CalendarDayData = new Schema({
  note: { type: String },
  menuId: { type: String },
  userId: { type: String },
  createdAt: { type: Number, default: +new Date() },
});

module.exports = model('CalendarDayData', CalendarDayData);
