INSERT INTO menu_items (id, name, category, price, description, emoji, prep_time, tag)
VALUES
  ('m1', 'Paneer Tikka Wrap', 'Wraps', 120, 'Char-grilled paneer, mint chutney and crunchy salad rolled in a warm tortilla.', 'W', '8 min', 'Bestseller'),
  ('m2', 'South Indian Thali', 'Meals', 150, 'Sambar, rasam, seasonal vegetables, curd and rice served on a steel plate.', 'T', '12 min', 'Chef pick'),
  ('m3', 'Cold Coffee + Sandwich', 'Combo', 95, 'Iced coffee blended fresh, paired with a grilled veg and cheese sandwich.', 'C', '5 min', 'Quick bite'),
  ('m4', 'Veg Fried Rice', 'Meals', 110, 'Wok-tossed rice with seasonal vegetables, spring onion and soy glaze.', 'F', '10 min', 'Popular'),
  ('m5', 'Fresh Lime Soda', 'Beverages', 45, 'Sweet, salted or mixed, made fresh to order with soda and lime.', 'L', '3 min', NULL),
  ('m6', 'Veg Puff', 'Snacks', 35, 'Flaky puff pastry stuffed with a lightly spiced vegetable filling.', 'P', '2 min', 'Quick bite'),
  ('m7', 'Chicken Roll', 'Wraps', 135, 'Spiced chicken, onions and tangy sauce rolled in flaky paratha.', 'R', '9 min', NULL)
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, category = EXCLUDED.category, price = EXCLUDED.price,
  description = EXCLUDED.description, emoji = EXCLUDED.emoji, prep_time = EXCLUDED.prep_time, tag = EXCLUDED.tag;

INSERT INTO pickup_slots (id, time_label, window_label, counter, capacity, orders_placed)
VALUES
  ('s1', '12:00 PM', '12:00 - 12:15', 'A1', 40, 34),
  ('s2', '12:15 PM', '12:15 - 12:30', 'A1', 40, 40),
  ('s3', '12:30 PM', '12:30 - 12:45', 'A1', 40, 12),
  ('s4', '1:00 PM', '1:00 - 1:15', 'A1', 40, 30),
  ('s5', '1:15 PM', '1:15 - 1:30', 'B2', 40, 6)
ON CONFLICT (id) DO UPDATE SET time_label = EXCLUDED.time_label, window_label = EXCLUDED.window_label,
  counter = EXCLUDED.counter, capacity = EXCLUDED.capacity, orders_placed = EXCLUDED.orders_placed;

INSERT INTO users (name, email, password_hash, role)
VALUES
  ('Priya Sharma', 'student@campusbite.com', '$2a$12$J35Q4hHM0Ef6xtPYaTsyr.QxTHVqZVrjTgOADitqzIJMQ7DQeIIp6', 'student'),
  ('Ramesh Kumar', 'staff@campusbite.com', '$2a$12$J35Q4hHM0Ef6xtPYaTsyr.QxTHVqZVrjTgOADitqzIJMQ7DQeIIp6', 'staff'),
  ('Anjali Desai', 'admin@campusbite.com', '$2a$12$J35Q4hHM0Ef6xtPYaTsyr.QxTHVqZVrjTgOADitqzIJMQ7DQeIIp6', 'admin')
ON CONFLICT (email) DO UPDATE SET
  name = EXCLUDED.name,
  password_hash = EXCLUDED.password_hash,
  role = EXCLUDED.role;

INSERT INTO inventory (menu_item_id, slot_id, pickup_date, total, reserved)
SELECT m.id, s.id, dates.pickup_date, 50, 0
FROM menu_items m CROSS JOIN pickup_slots s CROSS JOIN generate_series(CURRENT_DATE, CURRENT_DATE + 30, INTERVAL '1 day') AS dates(pickup_date)
ON CONFLICT (menu_item_id, slot_id, pickup_date) DO NOTHING;
