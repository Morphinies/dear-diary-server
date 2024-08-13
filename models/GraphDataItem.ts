import { Schema, model } from 'mongoose';

const GraphDataItem = new Schema({
  userId: { type: String },
  chapterId: { type: String },
  value: { type: Number, default: 0 },
  desc: { type: String, default: '' },
  date: { type: Number, default: +new Date() },
  updatedAt: { type: Number, default: +new Date() },
  createdAt: { type: Number, default: +new Date() },
});

export default model('graph_data_item', GraphDataItem);
export type GraphDataItemType = typeof GraphDataItem;
