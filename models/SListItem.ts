import { Schema, model } from 'mongoose';

const SListItem = new Schema({
  sort: { type: Number },
  menuId: { type: String },
  desc: { type: String, default: '' },
  text: { type: String, default: '' },
  userId: { type: String, default: '' },
  updatedAt: { type: Number, default: +new Date() },
  createdAt: { type: Number, default: +new Date() },
});

export default model('s_list_item', SListItem);
