import { Schema, model } from 'mongoose';

const GraphChapter = new Schema({
  userId: { type: String },
  menuId: { type: String },
  name: { type: String, default: '' },
  unit: { type: String, default: '' },
  updatedAt: { type: Number, default: +new Date() },
  createdAt: { type: Number, default: +new Date() },
});

export default model('graph_chapter', GraphChapter);
