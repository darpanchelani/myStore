import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const dir_name = path.dirname(fileURLToPath(import.meta.url));
const databasePath = path.join(dir_name, '../../data/prices.db');

const database = new sqlite3.Database(databasePath, (error) => {
  if (error){
    console.error('Failed to connect to database', error);
  }else{
    console.log('Connected to Database');
  }
});

database.run(`
  CREATE TABLE IF NOT EXISTS prices (
    id INTEGER PRIMARY KEY,
    value REAL NOT NULL,
    currency_code TEXT NOT NULL
  )
`);

export default database;