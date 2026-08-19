import { db } from '../config/db.js';

function orderId() {
  return `CB-${Math.floor(1000 + Math.random() * 9000)}-${Date.now().toString(36).slice(-4).toUpperCase()}`;
}

async function loadOrder(id, userId) {
  const result = await db.query(`
    SELECT o.id, o.status, o.pickup_date AS "pickupDate", o.total, o.created_at AS "createdAt",
      o.confirmed_at AS "confirmedAt",
      json_build_object('id', s.id, 'time', s.time_label, 'window', s.window_label, 'counter', s.counter,
        'capacity', s.capacity, 'ordersPlaced', s.orders_placed) AS "pickupSlot",
      COALESCE((SELECT json_agg(json_build_object('id', oi.menu_item_id, 'name', oi.name, 'price', oi.price, 'qty', oi.quantity)
        ORDER BY oi.name) FROM order_items oi WHERE oi.order_id = o.id), '[]') AS items,
      COALESCE((SELECT json_agg(json_build_object('status', h.status, 'at', h.created_at) ORDER BY h.created_at)
        FROM order_status_history h WHERE h.order_id = o.id), '[]') AS history,
      COALESCE((SELECT row_to_json(p) FROM (SELECT method, status FROM payments WHERE order_id = o.id) p), NULL) AS payment
    FROM orders o JOIN pickup_slots s ON s.id = o.pickup_slot_id
    WHERE o.id = $1 AND o.user_id = $2
  `, [id, userId]);
  return result.rows[0] || null;
}

export const orderController = {
  list: async (req, res, next) => {
    try {
      const result = await db.query('SELECT id FROM orders WHERE user_id = $1 ORDER BY created_at DESC', [req.user.id]);
      const orders = [];
      for (const row of result.rows) orders.push(await loadOrder(row.id, req.user.id));
      res.json(orders);
    } catch (error) {
      next(error);
    }
  },

  get: async (req, res, next) => {
    try {
      const order = await loadOrder(req.params.orderId, req.user.id);
      if (!order) return res.status(404).json({ message: 'Order not found' });
      res.json(order);
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    const client = await db.connect();
    try {
      const { items, pickupDate, pickupSlotId, paymentMethod = 'CARD' } = req.body;
      if (!Array.isArray(items) || items.length === 0 || !pickupDate || !pickupSlotId) {
        return res.status(400).json({ message: 'Items, pickup date, and pickup slot are required' });
      }
      await client.query('BEGIN');
      const slotResult = await client.query('SELECT * FROM pickup_slots WHERE id = $1 AND active = TRUE FOR UPDATE', [pickupSlotId]);
      const slot = slotResult.rows[0];
      if (!slot || slot.orders_placed >= slot.capacity) throw Object.assign(new Error('Pickup slot is full'), { status: 409 });

      const itemIds = items.map((item) => item.id);
      const menuResult = await client.query('SELECT * FROM menu_items WHERE id = ANY($1::varchar[]) AND available = TRUE', [itemIds]);
      const menuById = new Map(menuResult.rows.map((item) => [item.id, item]));
      let total = 0;
      for (const item of items) {
        const menuItem = menuById.get(item.id);
        if (!menuItem || !Number.isInteger(item.qty) || item.qty < 1) throw Object.assign(new Error('Invalid menu item or quantity'), { status: 400 });
        total += Number(menuItem.price) * item.qty;
      }

      const id = orderId();
      await client.query('INSERT INTO orders (id, user_id, status, pickup_date, pickup_slot_id, total) VALUES ($1, $2, $3, $4, $5, $6)', [id, req.user.id, 'PENDING', pickupDate, pickupSlotId, total]);
      for (const item of items) {
        const menuItem = menuById.get(item.id);
        await client.query('INSERT INTO order_items (order_id, menu_item_id, name, price, quantity) VALUES ($1, $2, $3, $4, $5)', [id, item.id, menuItem.name, menuItem.price, item.qty]);
        const inventory = await client.query(
          `UPDATE inventory SET reserved = reserved + $1
           WHERE menu_item_id = $2 AND slot_id = $3 AND pickup_date = $4
             AND reserved + $1 <= total RETURNING menu_item_id`,
          [item.qty, item.id, pickupSlotId, pickupDate]
        );
        if (!inventory.rowCount) throw Object.assign(new Error(`Insufficient inventory for ${menuItem.name}`), { status: 409 });
      }
      await client.query('INSERT INTO order_status_history (order_id, status) VALUES ($1, $2)', [id, 'PENDING']);
      await client.query('INSERT INTO payments (order_id, method, status) VALUES ($1, $2, $3)', [id, paymentMethod, 'PAID']);
      await client.query('UPDATE pickup_slots SET orders_placed = orders_placed + 1 WHERE id = $1', [pickupSlotId]);
      await client.query('COMMIT');
      res.status(201).json(await loadOrder(id, req.user.id));
    } catch (error) {
      await client.query('ROLLBACK');
      next(error.status ? error : Object.assign(error, { status: 500 }));
    } finally {
      client.release();
    }
  },

  updateStatus: async (req, res, next) => {
    const client = await db.connect();
    try {
      const status = String(req.body.status || '').toUpperCase();
      if (status !== 'CANCELLED') return res.status(400).json({ message: 'Unsupported status update' });
      await client.query('BEGIN');
      const orderResult = await client.query(
        `SELECT id, status, confirmed_at AS "confirmedAt", pickup_slot_id AS "pickupSlotId", pickup_date AS "pickupDate"
         FROM orders WHERE id = $1 AND user_id = $2 FOR UPDATE`,
        [req.params.orderId, req.user.id]
      );
      const order = orderResult.rows[0];
      if (!order) throw Object.assign(new Error('Order not found'), { status: 404 });
      if (order.status !== 'CONFIRMED' || !order.confirmedAt || Date.now() - new Date(order.confirmedAt).getTime() > 30000) {
        throw Object.assign(new Error('Orders can only be cancelled within 30 seconds after confirmation'), { status: 409 });
      }
      const result = await client.query(
        'UPDATE orders SET status = $1 WHERE id = $2 RETURNING id',
        [status, req.params.orderId]
      );
      if (!result.rowCount) throw Object.assign(new Error('Order not found'), { status: 404 });
      await client.query(`UPDATE inventory i SET reserved = i.reserved - oi.quantity FROM order_items oi WHERE oi.order_id = $1 AND i.menu_item_id = oi.menu_item_id AND i.slot_id = $2 AND i.pickup_date = $3`, [req.params.orderId, order.pickupSlotId, order.pickupDate]);
      await client.query('UPDATE pickup_slots SET orders_placed = GREATEST(orders_placed - 1, 0) WHERE id = $1', [order.pickupSlotId]);
      await client.query('INSERT INTO order_status_history (order_id, status) VALUES ($1, $2)', [req.params.orderId, status]);
      await client.query('INSERT INTO audit_logs (user_id, action, entity_type, entity_id) VALUES ($1, $2, $3, $4)', [req.user.id, 'ORDER_CANCELLED', 'ORDER', req.params.orderId]);
      await client.query('COMMIT');
      res.json(await loadOrder(req.params.orderId, req.user.id));
    } catch (error) {
      await client.query('ROLLBACK');
      next(error);
    } finally {
      client.release();
    }
  },
};
