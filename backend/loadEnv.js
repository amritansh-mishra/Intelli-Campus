import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: path.resolve(__dirname, './.env') });

if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = 'intelli-campus-dev-secret-change-me';
  console.warn(
    '[env] JWT_SECRET was missing — using a development default. Set JWT_SECRET in backend/.env for production.'
  );
}
