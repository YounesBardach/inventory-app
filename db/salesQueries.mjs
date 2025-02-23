import { pool } from "./pool.mjs";

export async function getAllSales() {
  const client = await pool.connect();
  try {
    const { rows } = await client.query("SELECT * FROM sales");
    return rows;
  } catch (err) {
    console.error("❌ Error loading sales:", err.message);
    throw err;
  } finally {
    client.release();
  }
}

export async function getSale(id) {
  const client = await pool.connect();
  try {
    const { rows } = await client.query("SELECT * FROM sales WHERE id = $1", [
      id,
    ]);
    return rows[0];
  } catch (err) {
    console.error("❌ Error loading sale:", err.message);
    throw err;
  } finally {
    client.release();
  }
}

export async function addSale(quantity_sold, total_sale, product_id) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "INSERT INTO sales (quantity_sold, total_sale, product_id) VALUES ($1, $2, $3) RETURNING *",
      [quantity_sold, total_sale, product_id]
    );
    return result.rows[0];
  } catch (err) {
    console.error("❌ Error adding sale:", err.message);
    throw err;
  } finally {
    client.release();
  }
}

export async function updateSale(id, quantity_sold, total_sale, product_id) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "UPDATE sales SET quantity_sold = $2, total_sale = $3, product_id = $4 WHERE id = $1 RETURNING *",
      [id, quantity_sold, total_sale, product_id]
    );
    return result.rows[0];
  } catch (err) {
    console.error("❌ Error updating sale:", err.message);
    throw err;
  } finally {
    client.release();
  }
}

export async function deleteSale(id) {
  const client = await pool.connect();
  try {
    const deletedSale = await client.query(
      "DELETE FROM sales WHERE id = $1 RETURNING *",
      [id]
    );
    return deletedSale.rows[0];
  } catch (err) {
    console.error("❌ Error deleting sale:", err.message);
    throw err;
  } finally {
    client.release();
  }
}
