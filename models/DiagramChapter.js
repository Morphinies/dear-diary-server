const { Schema, model } = require('mongoose');

const DiagramChapter = new Schema({
  userId: { type: String },
  menuId: { type: String },
  name: { type: String, default: '' },
  unit: { type: String, default: '' },
  updatedAt: { type: Number, default: +new Date() },
  createdAt: { type: Number, default: +new Date() },
});

module.exports = model('diagram_chapter', DiagramChapter);
