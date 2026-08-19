import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { db } from '../config/db.js';

const directory = fileURLToPath(new URL('../../database/', import.meta.url));

export async function seedDatabase() {
  await db.query(await fs.readFile(`${directory}/schema.sql`, 'utf8'));
  await db.query(await fs.readFile(`${directory}/seed.sql`, 'utf8'));
  await db.end();
  return { ok: true };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  seedDatabase()
    .then(() => console.log('CampusBite database ready'))
    .catch((error) => {
      console.error(error.message);
      process.exitCode = 1;
    });
}
