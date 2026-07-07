import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  fitnessGoal: { type: String, default: 'General wellness' },
  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.model('User', userSchema);
