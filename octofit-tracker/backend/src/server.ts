import mongoose from 'mongoose';
import { createApp } from './app';

export { createApp } from './app';

const app = createApp();
const port = Number(process.env.PORT || 8000);
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';

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
  });
}

if (require.main === module) {
  startServer();
}
