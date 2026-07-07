"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = require("../models/user");
const team_1 = require("../models/team");
const activity_1 = require("../models/activity");
const leaderboard_1 = require("../models/leaderboard");
const workout_1 = require("../models/workout");
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            user_1.User.deleteMany({}),
            team_1.Team.deleteMany({}),
            activity_1.Activity.deleteMany({}),
            leaderboard_1.Leaderboard.deleteMany({}),
            workout_1.Workout.deleteMany({}),
        ]);
        const users = await user_1.User.create([
            { name: 'Ada Lovelace', email: 'ada@example.com', role: 'runner', fitnessGoal: 'Marathon prep' },
            { name: 'Grace Hopper', email: 'grace@example.com', role: 'coach', fitnessGoal: 'Strength training' },
            { name: 'Linus Torvalds', email: 'linus@example.com', role: 'cyclist', fitnessGoal: 'Endurance' },
        ]);
        await team_1.Team.create([
            { name: 'Alpha Squad', focus: 'endurance', members: 6 },
            { name: 'Beta Crew', focus: 'strength', members: 4 },
        ]);
        await activity_1.Activity.create([
            { type: 'Run', duration: '30m', calories: 320, userId: users[0]._id },
            { type: 'Strength', duration: '45m', calories: 240, userId: users[1]._id },
            { type: 'Cycling', duration: '60m', calories: 410, userId: users[2]._id },
        ]);
        await leaderboard_1.Leaderboard.create([
            { rank: 1, name: 'Ada Lovelace', points: 980 },
            { rank: 2, name: 'Grace Hopper', points: 940 },
            { rank: 3, name: 'Linus Torvalds', points: 915 },
        ]);
        await workout_1.Workout.create([
            { name: 'HIIT Intervals', difficulty: 'Intermediate', duration: '25m' },
            { name: 'Mobility Flow', difficulty: 'Easy', duration: '20m' },
            { name: 'Power Strength', difficulty: 'Hard', duration: '40m' },
        ]);
        console.log('Database seeding complete');
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
