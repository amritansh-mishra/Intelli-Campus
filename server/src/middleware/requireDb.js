import mongoose from 'mongoose';

export function requireDb(_req, res, next) {
  if (mongoose.connection.readyState === 1) {
    return next();
  }
  return res.status(503).json({
    message:
      'Database is not connected. Start MongoDB, then run `npm run seed` in the server folder.',
  });
}
