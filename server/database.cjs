
const initSqlJs = require("sql.js");
const fs = require("fs");
const path = require("path");

const DB_PATH =
  process.env.DB_PATH || path.join(__dirname, "database.sqlite");

fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

let db;

async function initializeDatabase() {
  const SQL = await initSqlJs();

  if (fs.existsSync(DB_PATH)) {
    const file = fs.readFileSync(DB_PATH);
    db = new SQL.Database(file);
  } else {
    db = new SQL.Database();
  }

  // Orders table
  db.run(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id TEXT UNIQUE NOT NULL,
      customer_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      address TEXT,
      city TEXT,
      items TEXT NOT NULL,
      total REAL NOT NULL,
      status TEXT DEFAULT 'Pending',
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Customers table
  db.run(`
    CREATE TABLE IF NOT EXISTS customers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      phone TEXT,
      address TEXT,
      city TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Inventory table
  db.run(`
    CREATE TABLE IF NOT EXISTS inventory (
      product_id INTEGER PRIMARY KEY,
      stock INTEGER NOT NULL DEFAULT 10
        CHECK (stock >= 0)
    )
  `);

  // Initial stock for 45 products.
  // Existing stock will not be overwritten.
  for (let productId = 1; productId <= 45; productId++) {
    db.run(
      `INSERT OR IGNORE INTO inventory (product_id, stock)
       VALUES (?, ?)`,
      [productId, 10]
    );
  }

  saveDatabase();

  console.log("SQLite database connected successfully.");
  console.log("Inventory table initialized successfully.");
}

function saveDatabase() {
  if (!db) return;

  const data = db.export();
  fs.writeFileSync(DB_PATH, Buffer.from(data));
}

function getDatabase() {
  return db;
}

function getAll(sql, params = []) {
  const statement = db.prepare(sql);
  statement.bind(params);

  const results = [];

  while (statement.step()) {
    results.push(statement.getAsObject());
  }

  statement.free();
  return results;
}

function getOne(sql, params = []) {
  return getAll(sql, params)[0] || null;
}

function run(sql, params = []) {
  db.run(sql, params);
  saveDatabase();
}

module.exports = {
  initializeDatabase,
  getDatabase,
  getAll,
  getOne,
  run,
  saveDatabase
};
