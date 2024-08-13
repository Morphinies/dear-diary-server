import { Schema, model } from 'mongoose';

const DiagramChapter = new Schema({
  name: { type: String, default: '' },
  unit: { type: String, default: '' },
  userId: { type: String, required: true },
  menuId: { type: String, required: true },
  updatedAt: { type: Number, default: +new Date() },
  createdAt: { type: Number, default: +new Date() },
});

export default model('diagram_chapter', DiagramChapter);
export type DiagramChapterType = typeof DiagramChapter;
