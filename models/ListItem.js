const { Schema, model } = require('mongoose');

const ListItem = new Schema({
  sort: { type: Number },
  menuId: { type: String },
  deadline: { type: Number },
  text: { type: String, default: '' },
  userId: { type: String, default: '' },
  priority: { type: Number, default: 1 },
  isCompleted: { type: Boolean, default: false },
  updatedAt: { type: Number, default: +new Date() },
  createdAt: { type: Number, default: +new Date() },
});

module.exports = model('ListItem', ListItem);
