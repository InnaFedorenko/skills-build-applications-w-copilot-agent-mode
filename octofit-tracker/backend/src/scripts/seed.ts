import mongoose from 'mongoose';
import { User } from '../models/user';
import { Team } from '../models/team';
import { Activity } from '../models/activity';
import { Leaderboard } from '../models/leaderboard';
import { Workout } from '../models/workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      { name: 'Ada Lovelace', email: 'ada@example.com', role: 'runner', fitnessGoal: 'Marathon prep' },
      { name: 'Grace Hopper', email: 'grace@example.com', role: 'coach', fitnessGoal: 'Strength training' },
      { name: 'Linus Torvalds', email: 'linus@example.com', role: 'cyclist', fitnessGoal: 'Endurance' },
    ]);

    await Team.create([
      { name: 'Alpha Squad', focus: 'endurance', members: 6 },
      { name: 'Beta Crew', focus: 'strength', members: 4 },
    ]);

    await Activity.create([
      { type: 'Run', duration: '30m', calories: 320, userId: users[0]._id },
      { type: 'Strength', duration: '45m', calories: 240, userId: users[1]._id },
      { type: 'Cycling', duration: '60m', calories: 410, userId: users[2]._id },
    ]);

    await Leaderboard.create([
      { rank: 1, name: 'Ada Lovelace', points: 980 },
      { rank: 2, name: 'Grace Hopper', points: 940 },
      { rank: 3, name: 'Linus Torvalds', points: 915 },
    ]);

    await Workout.create([
      { name: 'HIIT Intervals', difficulty: 'Intermediate', duration: '25m' },
      { name: 'Mobility Flow', difficulty: 'Easy', duration: '20m' },
      { name: 'Power Strength', difficulty: 'Hard', duration: '40m' },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
