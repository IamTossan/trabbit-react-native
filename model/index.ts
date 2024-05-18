import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('trabbit');
const initDb = async () =>
  db.execAsync(`
  PRAGMA journal_mode = WAL;
  DROP TABLE IF EXISTS tasks;
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    amount FLOAT NOT NULL,
    unit_label TEXT NOT NULL
  );
`);

const seedDb = async () =>
  db.execAsync(`
  INSERT INTO tasks (name, amount, unit_label) VALUES ('lire', 1, 'h');
  INSERT INTO tasks (name, amount, unit_label) VALUES ('coder', 2, 'h');
  INSERT INTO tasks (name, amount, unit_label) VALUES ('courses', 0.5, 'h');
  INSERT INTO tasks (name, amount, unit_label) VALUES ('courir', 1, 'h');
  INSERT INTO tasks (name, amount, unit_label) VALUES ('repos', 1, 'h');
  INSERT INTO tasks (name, amount, unit_label) VALUES ('danser', 1, 'h');
  INSERT INTO tasks (name, amount, unit_label) VALUES ('cuisinier', 1, 'h');
  INSERT INTO tasks (name, amount, unit_label) VALUES ('sortir', 1, 'h');
  INSERT INTO tasks (name, amount, unit_label) VALUES ('jouer', 1, 'h');
  INSERT INTO tasks (name, amount, unit_label) VALUES ('faire le menage', 1, 'h');
`);

export { db, initDb, seedDb };
