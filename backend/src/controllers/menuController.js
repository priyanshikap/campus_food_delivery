import { db } from '../config/db.js';

export const menuController = {
  list: async (_req, res, next) => {
    try {
      const result = await db.query(`
        SELECT m.id, m.name, m.category, m.price, m.description, m.emoji,
          m.prep_time AS "prepTime", m.tag, m.available,
          COALESCE(inv.stock_by_slot, '{}'::jsonb) AS "stockBySlot"
        FROM menu_items m
        LEFT JOIN (
          SELECT menu_item_id,
            jsonb_object_agg(
              pickup_date::text || ':' || slot_id,
              jsonb_build_object('total', total, 'reserved', reserved)
            ) AS stock_by_slot
          FROM inventory
          GROUP BY menu_item_id
        ) inv ON inv.menu_item_id = m.id
        WHERE m.available = TRUE
        ORDER BY category, name
      `);
      res.json(result.rows);
    } catch (error) {
      next(error);
    }
  },

  manage: async (_req, res, next) => {
    try {
      const result = await db.query(`SELECT id, name, category, price, description, emoji, prep_time AS "prepTime", tag, available FROM menu_items ORDER BY category, name`);
      res.json(result.rows);
    } catch (error) { next(error); }
  },

  create: async (req, res, next) => {
    try {
      const { id, name, category, price, description = '', emoji = '🍽️', prepTime = '10 min', tag = null } = req.body;
      const result = await db.query(`INSERT INTO menu_items (id, name, category, price, description, emoji, prep_time, tag) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id, name, category, price, description, emoji, prep_time AS "prepTime", tag, available`, [id, name, category, price, description, emoji, prepTime, tag]);
      res.status(201).json(result.rows[0]);
    } catch (error) { next(error); }
  },

  update: async (req, res, next) => {
    try {
      const { name, category, price, description = '', emoji = '🍽️', prepTime = '10 min', tag = null, available = true } = req.body;
      const result = await db.query(`UPDATE menu_items SET name=$1, category=$2, price=$3, description=$4, emoji=$5, prep_time=$6, tag=$7, available=$8 WHERE id=$9 RETURNING id, name, category, price, description, emoji, prep_time AS "prepTime", tag, available`, [name, category, price, description, emoji, prepTime, tag, available, req.params.itemId]);
      if (!result.rowCount) return res.status(404).json({ message: 'Menu item not found' });
      res.json(result.rows[0]);
    } catch (error) { next(error); }
  },

  remove: async (req, res, next) => {
    try {
      const result = await db.query('DELETE FROM menu_items WHERE id = $1 RETURNING id', [req.params.itemId]);
      if (!result.rowCount) return res.status(404).json({ message: 'Menu item not found' });
      res.status(204).send();
    } catch (error) { next(error); }
  },
};
