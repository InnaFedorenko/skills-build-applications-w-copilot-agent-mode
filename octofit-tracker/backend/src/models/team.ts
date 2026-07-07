import mongoose, { Schema } from 'mongoose';

const teamSchema = new Schema({
  name: { type: String, required: true },
  focus: { type: String, required: true },
  members: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export const Team = mongoose.model('Team', teamSchema);
