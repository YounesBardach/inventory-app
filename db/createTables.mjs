import { pool } from "./pool.mjs";

const SQL = `
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255),
  price DECIMAL(10,2),
  quantity INT
);

CREATE TABLE IF NOT EXISTS sales (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  quantity_sold INT,
  total_sale DECIMAL(10,2),
  product_id INTEGER,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS suppliers (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255),
  phone VARCHAR(50),
  email VARCHAR(255)
);
`;

async function createTables() {
  console.log("creating tables...");
  const client = await pool.connect();
  try {
    await client.query(SQL);
    console.log("Tables created successfully");
  } catch (err) {
    console.error("❌ Error creating tables:", err.message);
    process.exit(1);
  } finally {
    client.release();
  }
}

createTables();
