import { products } from "./productsData.js";
import Database from "better-sqlite3";
import bcrypt from "bcryptjs";

const db = new Database("kp_bags.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS inquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_slug TEXT NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    company TEXT,
    quantity TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'new',
    admin_notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    category_id TEXT NOT NULL,
    category_name TEXT NOT NULL,
    image TEXT,
    specifications TEXT,
    applications TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS gallery (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    desc TEXT,
    src TEXT NOT NULL,
    alt TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Alter inquiries table if it already exists to add new columns (ignoring errors if they exist)
try {
  db.exec("ALTER TABLE inquiries ADD COLUMN status TEXT DEFAULT 'new'");
} catch (e) {
  // Column already exists
}

try {
  db.exec("ALTER TABLE inquiries ADD COLUMN admin_notes TEXT");
} catch (e) {
  // Column already exists
}

// Seed admin user
const adminCheck = db.prepare("SELECT * FROM admins WHERE username = ?").get("admin");
if (!adminCheck) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync("admin123", salt);
  db.prepare("INSERT INTO admins (username, password_hash) VALUES (?, ?)").run("admin", hash);
}

const productCount = db.prepare("SELECT COUNT(*) AS count FROM products").get();

if (productCount.count === 0) {
  const insert = db.prepare(`
    INSERT INTO products (
      slug,
      name,
      description,
      category_id,
      category_name,
      image,
      specifications,
      applications
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertMany = db.transaction((items) => {
    for (const p of items) {
      insert.run(
        p.slug,
        p.name,
        p.description,
        p.categoryId,
        p.categoryName,
        p.image,
        JSON.stringify(p.specifications),
        JSON.stringify(p.applications)
      );
    }
  });

  insertMany(products);

  console.log(`Seeded ${products.length} products.`);
}

export default db;