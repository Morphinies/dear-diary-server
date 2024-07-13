const { Schema, model } = require('mongoose');

const FinTrans = new Schema({
  category: { type: Object },
  sum: { type: Number, default: 0 },
  num: { type: Number, default: 1 },
  type: { type: Number, default: 1 },
  desc: { type: String, default: '' },
  userId: { type: String, default: '' },
  date: { type: Number, default: +new Date() },
  updatedAt: { type: Number, default: +new Date() },
  createdAt: { type: Number, default: +new Date() },
});

module.exports = model('transaction', FinTrans);
