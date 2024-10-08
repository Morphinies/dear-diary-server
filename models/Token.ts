import { Schema, model } from 'mongoose';

const Token = new Schema({
  refreshToken: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

export default model('token', Token);
export type TokenType = typeof Token;
