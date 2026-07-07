import mongoose, { Schema } from 'mongoose';

const activitySchema = new Schema({
  type: { type: String, required: true },
  duration: { type: String, required: true },
  calories: { type: Number, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

export const Activity = mongoose.model('Activity', activitySchema);
