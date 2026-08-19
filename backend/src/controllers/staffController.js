import { db } from '../config/db.js';

const STAFF_STATUSES = ['PENDING', 'CONFIRMED', 'PREPARING', 'READY', 'COLLECTED', 'REJECTED', 'CANCELLED'];

export const staffController = {
  orders: async (_req, res, next) => {
    try {
      const result = await db.query(`
        SELECT o.id, o.status, o.pickup_date AS "pickupDate", o.total, o.created_at AS "createdAt", o.confirmed_at AS "confirmedAt",
          u.name AS customer, u.email,
          json_build_object('id', s.id, 'time', s.time_label, 'window', s.window_label, 'counter', s.counter,
            'capacity', s.capacity, 'ordersPlaced', s.orders_placed) AS "pickupSlot",
          COALESCE((SELECT json_agg(json_build_object('id', oi.menu_item_id, 'name', oi.name, 'price', oi.price, 'qty', oi.quantity)
            ORDER BY oi.name) FROM order_items oi WHERE oi.order_id = o.id), '[]') AS items
        FROM orders o
        JOIN users u ON u.id = o.user_id
        JOIN pickup_slots s ON s.id = o.pickup_slot_id
        ORDER BY o.created_at DESC
      `);
      res.json(result.rows);
    } catch (error) {
      next(error);
    }
  },

  updateOrderStatus: async (req, res, next) => {
    const client = await db.connect();
    try {
      const status = String(req.body.status || '').toUpperCase();
      if (!STAFF_STATUSES.includes(status)) return res.status(400).json({ message: 'Invalid order status' });
      await client.query('BEGIN');
      const result = await client.query(
        `UPDATE orders SET status = $1::varchar, confirmed_at = CASE WHEN $1::varchar = 'CONFIRMED' THEN NOW() ELSE confirmed_at END
         WHERE id = $2 AND ($1::varchar <> 'REJECTED' OR status = 'PENDING') RETURNING id, status, confirmed_at AS "confirmedAt"`,
        [status, req.params.orderId]
      );
      if (!result.rowCount) return res.status(404).json({ message: 'Order not found' });
      if (status === 'REJECTED') {
        await client.query(`
          UPDATE inventory i SET reserved = GREATEST(0, i.reserved - oi.quantity)
          FROM order_items oi
          WHERE oi.order_id = $1 AND i.menu_item_id = oi.menu_item_id AND i.slot_id = (SELECT pickup_slot_id FROM orders WHERE id = $1) AND i.pickup_date = (SELECT pickup_date FROM orders WHERE id = $1)
        `, [req.params.orderId]);
      }
      await client.query('INSERT INTO order_status_history (order_id, status) VALUES ($1, $2)', [req.params.orderId, status]);
      await client.query('INSERT INTO audit_logs (user_id, action, entity_type, entity_id, details) VALUES ($1, $2, $3, $4, $5)', [req.user.id, 'ORDER_STATUS_CHANGED', 'ORDER', req.params.orderId, JSON.stringify({ status })]);
      await client.query('COMMIT');
      res.json(result.rows[0]);
    } catch (error) {
      await client.query('ROLLBACK');
      next(error);
    } finally {
      client.release();
    }
  },
};
