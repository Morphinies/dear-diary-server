const { Schema, model } = require('mongoose');

const Menu = new Schema({
  typeId: { type: Number },
  sort: { type: Number, default: 0 },
  icon: { type: String, default: '' },
  name: { type: String, default: '' },
  userId: { type: String, default: '' },
  updatedAt: { type: Number, default: +new Date() },
  createdAt: { type: Number, default: +new Date() },
});

module.exports = model('Menu', Menu);
