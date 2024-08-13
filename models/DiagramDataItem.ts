import { Schema, model } from 'mongoose';

const DiagramDataItem = new Schema({
  userId: { type: String },
  chapterId: { type: String },
  categoryId: { type: String },
  value: { type: Number, default: 0 },
  desc: { type: String, default: '' },
  date: { type: Number, default: +new Date() },
  updatedAt: { type: Number, default: +new Date() },
  createdAt: { type: Number, default: +new Date() },
});

export default model('diagram_data_item', DiagramDataItem);
export type DiagramDataItemType = typeof DiagramDataItem;
