import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('trabbit');
const initDb = async () =>
  db.execAsync(`
  PRAGMA journal_mode = WAL;
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    quantity FLOAT NOT NULL,
    unit_label TEXT NOT NULL
  );
`);

const seedDb = async () =>
  db.execAsync(`
  INSERT INTO tasks (name, quantity, unit_label) VALUES ('lire', 1, 'h');
  INSERT INTO tasks (name, quantity, unit_label) VALUES ('coder', 2, 'h');
  INSERT INTO tasks (name, quantity, unit_label) VALUES ('courses', 0.5, 'h');
`);

export { db, initDb, seedDb };
