const { Schema, model } = require('mongoose');

const CalendarData = new Schema({
  menuId: { type: String },
  userId: { type: String },
  deadlineMenuList: { type: [String] },
  createdAt: { type: Number, default: +new Date() },
});

module.exports = model('CalendarData', CalendarData);
