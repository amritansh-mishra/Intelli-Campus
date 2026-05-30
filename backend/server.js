import './loadEnv.js';
import app from './app.js';
import { connectDB } from './config/db.js';

const PORT = process.env.PORT || 5001;

async function start() {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}/api`));
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
}

start();
