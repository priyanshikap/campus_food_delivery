import { db } from '../config/db.js';

export const slotController = {
  list: async (_req, res, next) => {
    try {
      const result = await db.query(`
        SELECT id, time_label AS time, window_label AS window, counter, capacity, orders_placed AS "ordersPlaced", active
        FROM pickup_slots
        WHERE active = TRUE
        ORDER BY id
      `);
      res.json(result.rows);
    } catch (error) {
      next(error);
    }
  },

  manage: async (_req, res, next) => {
    try {
      const result = await db.query(`SELECT id, time_label AS time, window_label AS window, counter, capacity, orders_placed AS "ordersPlaced", active FROM pickup_slots ORDER BY id`);
      res.json(result.rows);
    } catch (error) { next(error); }
  },

  create: async (req, res, next) => {
    try {
      const { id, time, window = time, counter, capacity } = req.body;
      const result = await db.query(`INSERT INTO pickup_slots (id, time_label, window_label, counter, capacity) VALUES ($1,$2,$3,$4,$5) RETURNING id, time_label AS time, window_label AS window, counter, capacity, orders_placed AS "ordersPlaced", active`, [id, time, window, counter, capacity]);
      res.status(201).json(result.rows[0]);
    } catch (error) { next(error); }
  },

  update: async (req, res, next) => {
    try {
      const { time, window = time, counter, capacity, active = true } = req.body;
      const result = await db.query(`UPDATE pickup_slots SET time_label=$1, window_label=$2, counter=$3, capacity=$4, active=$5 WHERE id=$6 RETURNING id, time_label AS time, window_label AS window, counter, capacity, orders_placed AS "ordersPlaced", active`, [time, window, counter, capacity, active, req.params.slotId]);
      if (!result.rowCount) return res.status(404).json({ message: 'Pickup slot not found' });
      res.json(result.rows[0]);
    } catch (error) { next(error); }
  },

  remove: async (req, res, next) => {
    try {
      const result = await db.query('DELETE FROM pickup_slots WHERE id = $1 AND orders_placed = 0 RETURNING id', [req.params.slotId]);
      if (!result.rowCount) return res.status(409).json({ message: 'Slot not found or already has bookings' });
      res.status(204).send();
    } catch (error) { next(error); }
  },
};
