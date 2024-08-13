import { Schema, model } from 'mongoose';

const User = new Schema({
  activationLink: { type: String },
  password: { type: String, required: true },
  isActivated: { type: Boolean, default: false },
  email: { type: String, unique: true, required: true },
});

export default model('user', User);
export type UserType = typeof User;
