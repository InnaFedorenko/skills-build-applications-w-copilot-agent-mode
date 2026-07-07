import mongoose from 'mongoose';
import { createApp } from './app';

export { createApp } from './app';

export function getApiBaseUrl(): string {
  const codespaceName = process.env.CODESPACE_NAME;
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
}

const app = createApp();
const port = Number(process.env.PORT || 8000);
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const apiBaseUrl = getApiBaseUrl();

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

export function startServer() {
  return app.listen(port, () => {
    console.log(`Backend listening on port ${port}`);
    console.log(`API base URL: ${apiBaseUrl}`);
  });
}

if (require.main === module) {
  startServer();
}
