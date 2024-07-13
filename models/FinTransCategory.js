const { Schema, model } = require('mongoose');

const FinTransCategory = new Schema({
  type: { type: Number, default: 1 },
  name: { type: String, default: '' },
  userId: { type: String, default: '' },
  updatedAt: { type: Number, default: +new Date() },
  createdAt: { type: Number, default: +new Date() },
});

module.exports = model('trans_category', FinTransCategory);
