import { Schema, model } from 'mongoose';

const DiagramCategory = new Schema({
  userId: { type: String, required: true },
  chapterId: { type: String, required: true },
  updatedAt: { type: Number, default: +new Date() },
  createdAt: { type: Number, default: +new Date() },
  name: { type: String, default: '', required: true },
});

export default model('diagram_category', DiagramCategory);
export type DiagramCategoryType = typeof DiagramCategory;
