import { pool } from "./pool.mjs";

const SQL = `
-- Insert products
INSERT INTO products (name, price, quantity)
VALUES
  ('Product A', 10.99, 100),
  ('Product B', 22.50, 200),
  ('Product C', 15.75, 150);

-- Insert sales
INSERT INTO sales (quantity_sold, total_sale, product_id)
VALUES
  (10, 109.90, 1),
  (15, 337.50, 2),
  (5, 78.75, 3);

-- Insert suppliers
INSERT INTO suppliers (name, phone, email)
VALUES
  ('Supplier A', '123-456-7890', 'supplierA@example.com'),
  ('Supplier B', '987-654-3210', 'supplierB@example.com'),
  ('Supplier C', '555-555-5555', 'supplierC@example.com');
`;

async function fillTables() {
  console.log(" Filling tables...");
  const client = await pool.connect();
  try {
    await client.query(SQL);
    console.log("Tables filled successfully");
  } catch (err) {
    console.error("❌ Error creating tables:", err.message);
    process.exit(1);
  } finally {
    client.release();
  }
}

fillTables();
