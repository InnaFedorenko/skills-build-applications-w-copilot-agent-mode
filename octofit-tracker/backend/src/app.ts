import express, { type Express, type Request, type Response } from 'express';

export function getApiBaseUrl(): string {
  const codespaceName = process.env.CODESPACE_NAME;
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
}

export function createApp(): Express {
  const app = express();
  const baseUrl = getApiBaseUrl();

  app.use(express.json());

  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      status: 'ok',
      message: 'OctoFit Tracker backend is running',
      apiBaseUrl: `${baseUrl}/api`,
    });
  });

  const users = [
    { id: 1, name: 'Ada Lovelace', email: 'ada@example.com', role: 'runner' },
    { id: 2, name: 'Grace Hopper', email: 'grace@example.com', role: 'coach' },
  ];

  const teams = [
    { id: 1, name: 'Alpha Squad', members: 6, focus: 'endurance' },
    { id: 2, name: 'Beta Crew', members: 4, focus: 'strength' },
  ];

  const activities = [
    { id: 1, type: 'Run', duration: '30m', calories: 320 },
    { id: 2, type: 'Strength', duration: '45m', calories: 240 },
  ];

  const leaderboard = [
    { rank: 1, name: 'Ada Lovelace', points: 100 },
    { rank: 2, name: 'Grace Hopper', points: 95 },
  ];

  const workouts = [
    { id: 1, name: 'HIIT', difficulty: 'Intermediate' },
    { id: 2, name: 'Mobility Flow', difficulty: 'Easy' },
  ];

  app.get(['/api/users', '/api/users/'], (_req: Request, res: Response) => {
    res.json({ users });
  });

  app.get(['/api/teams', '/api/teams/'], (_req: Request, res: Response) => {
    res.json({ teams });
  });

  app.get(['/api/activities', '/api/activities/'], (_req: Request, res: Response) => {
    res.json({ activities });
  });

  app.get(['/api/leaderboard', '/api/leaderboard/'], (_req: Request, res: Response) => {
    res.json({ leaderboard });
  });

  app.get(['/api/workouts', '/api/workouts/'], (_req: Request, res: Response) => {
    res.json({ workouts });
  });

  return app;
}
