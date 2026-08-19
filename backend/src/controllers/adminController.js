import { db } from '../config/db.js';

export const adminController = {
  users: async (_req, res, next) => {
    try {
      const result = await db.query(`
        SELECT id, name, email, role, status, created_at AS "joinedAt"
        FROM users
        ORDER BY created_at DESC
      `);
      res.json(result.rows);
    } catch (error) {
      next(error);
    }
  },

  updateUserStatus: async (req, res, next) => {
    try {
      const status = String(req.body.status || '').toUpperCase();
      if (!['ACTIVE', 'SUSPENDED'].includes(status)) return res.status(400).json({ message: 'Invalid user status' });
      const result = await db.query(
        'UPDATE users SET status = $1 WHERE id = $2 RETURNING id, name, email, role, status, created_at AS "joinedAt"',
        [status, req.params.userId]
      );
      if (!result.rowCount) return res.status(404).json({ message: 'User not found' });
      res.json(result.rows[0]);
    } catch (error) {
      next(error);
    }
  },

  analytics: async (req, res, next) => {
    try {
      const range = String(req.query.range || 'TODAY').toUpperCase();
      const days = range === '30D' ? 30 : range === '7D' ? 7 : 1;
      const result = await db.query(`
        SELECT COUNT(*)::int AS "totalOrders",
          COALESCE(SUM(total) FILTER (WHERE status <> 'CANCELLED'), 0)::numeric AS revenue,
          COALESCE(ROUND(100.0 * COUNT(*) FILTER (WHERE status IN ('COLLECTED', 'READY')) / NULLIF(COUNT(*), 0), 0), 0)::int AS "completionRate"
        FROM orders
        WHERE created_at >= CURRENT_DATE - ($1::int - 1)
      `, [days]);
      const popular = await db.query(`
        SELECT oi.name, SUM(oi.quantity)::int AS quantity
        FROM order_items oi JOIN orders o ON o.id = oi.order_id
        WHERE o.created_at >= CURRENT_DATE - ($1::int - 1) AND o.status <> 'CANCELLED'
        GROUP BY oi.name ORDER BY quantity DESC LIMIT 8
      `, [days]);
      res.json({ range, kpis: result.rows[0], popularItems: popular.rows });
    } catch (error) {
      next(error);
    }
  },
};
