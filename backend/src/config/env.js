import dotenv from 'dotenv';

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;

if (databaseUrl && !/^postgres(?:ql)?:\/\/[^:]+:.+@[^/]+\/[^/?]+/.test(databaseUrl)) {
  throw new Error('DATABASE_URL must include a PostgreSQL username and password, for example postgresql://postgres:password@localhost:5432/campusbite');
}

export const env = {
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || 'change_me',
  databaseUrl: databaseUrl || 'postgresql://postgres:postgres@localhost:5432/campusbite',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
};
