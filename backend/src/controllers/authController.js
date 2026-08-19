import bcrypt from 'bcryptjs';
import { db } from '../config/db.js';
import { generateToken } from '../utils/generateToken.js';

function sessionFor(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user),
  };
}

export const authController = {
  login: async (req, res, next) => {
    try {
      const email = String(req.body.email || '').trim().toLowerCase();
      const password = String(req.body.password || '');
      const result = await db.query('SELECT * FROM users WHERE LOWER(email) = $1 AND status = \'ACTIVE\'', [email]);
      const user = result.rows[0];
      if (!user || !(await bcrypt.compare(password, user.password_hash))) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      res.json(sessionFor(user));
    } catch (error) {
      next(error);
    }
  },

  register: async (req, res, next) => {
    try {
      const name = String(req.body.name || '').trim();
      const email = String(req.body.email || '').trim().toLowerCase();
      const password = String(req.body.password || '');
      if (!name || !email || password.length < 6) {
        return res.status(400).json({ message: 'Name, email, and a password of at least 6 characters are required' });
      }
      const passwordHash = await bcrypt.hash(password, 12);
      const result = await db.query(
        'INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role',
        [name, email, passwordHash, 'student']
      );
      res.status(201).json(sessionFor(result.rows[0]));
    } catch (error) {
      if (error.code === '23505') return res.status(409).json({ message: 'An account with this email already exists' });
      next(error);
    }
  },
};
