import { Schema, model } from 'mongoose';

const Role = new Schema({
  value: { type: String, unique: true, default: 'USER' },
});

export default model('role', Role);
export type RoleType = typeof Role;
