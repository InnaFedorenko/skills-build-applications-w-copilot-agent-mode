import mongoose, { Schema } from 'mongoose';

const workoutSchema = new Schema({
  name: { type: String, required: true },
  difficulty: { type: String, required: true },
  duration: { type: String, default: '30m' },
  createdAt: { type: Date, default: Date.now },
});

export const Workout = mongoose.model('Workout', workoutSchema);
