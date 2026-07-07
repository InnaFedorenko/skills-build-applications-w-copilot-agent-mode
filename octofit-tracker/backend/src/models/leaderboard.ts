import mongoose, { Schema } from 'mongoose';

const leaderboardSchema = new Schema({
  rank: { type: Number, required: true },
  name: { type: String, required: true },
  points: { type: Number, required: true },
  updatedAt: { type: Date, default: Date.now },
});

export const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);
