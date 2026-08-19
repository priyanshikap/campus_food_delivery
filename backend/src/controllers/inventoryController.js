import { db } from '../config/db.js';

export const inventoryController = {
  list: async (_req, res, next) => {
    try {
      const result = await db.query(`
        SELECT i.menu_item_id AS "menuItemId", m.name, m.category, i.slot_id AS "slotId",
          s.time_label AS "pickupSlot", i.pickup_date AS "pickupDate", i.total, i.reserved,
          i.total - i.reserved AS available
        FROM inventory i
        JOIN menu_items m ON m.id = i.menu_item_id
        JOIN pickup_slots s ON s.id = i.slot_id
        ORDER BY i.pickup_date, s.id, m.category, m.name
      `);
      res.json(result.rows);
    } catch (error) { next(error); }
  },

  update: async (req, res, next) => {
    try {
      const total = Number(req.body.total);
      if (!Number.isInteger(total) || total < 0) return res.status(400).json({ message: 'Total inventory must be a non-negative integer' });
      const result = await db.query(`
        UPDATE inventory SET total = $1
        WHERE menu_item_id = $2 AND slot_id = $3 AND pickup_date = $4 AND $1 >= reserved
        RETURNING menu_item_id AS "menuItemId", slot_id AS "slotId", pickup_date AS "pickupDate", total, reserved, total - reserved AS available
      `, [total, req.params.menuItemId, req.params.slotId, req.params.pickupDate]);
      if (!result.rowCount) return res.status(409).json({ message: 'Inventory not found or total is below reserved quantity' });
      await db.query('INSERT INTO audit_logs (user_id, action, entity_type, entity_id, details) VALUES ($1, $2, $3, $4, $5)', [req.user.id, 'INVENTORY_UPDATED', 'INVENTORY', `${req.params.menuItemId}:${req.params.slotId}:${req.params.pickupDate}`, JSON.stringify({ total })]);
      res.json(result.rows[0]);
    } catch (error) { next(error); }
  },
};
