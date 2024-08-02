import { Schema, model } from 'mongoose';

const DiagramCategory = new Schema({
  userId: { type: String },
  chapterId: { type: String },
  name: { type: String, default: '' },
  updatedAt: { type: Number, default: +new Date() },
  createdAt: { type: Number, default: +new Date() },
});

export default model('diagram_category', DiagramCategory);
