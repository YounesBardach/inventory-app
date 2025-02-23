import { pool } from "./pool.mjs";

export async function getAllProducts() {
  const client = await pool.connect();
  try {
    const { rows } = await client.query("SELECT * FROM products");
    return rows;
  } catch (err) {
    console.error("❌ Error loading products:", err.message);
    throw err;
  } finally {
    client.release();
  }
}

export async function getProduct(id) {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(
      "SELECT * FROM products WHERE id = $1",
      [id]
    );
    return rows[0];
  } catch (err) {
    console.error("❌ Error loading product:", err.message);
    throw err;
  } finally {
    client.release();
  }
}

export async function addProduct(name, price, quantity) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "INSERT INTO products (name, price, quantity) VALUES ($1, $2, $3) RETURNING *",
      [name, price, quantity]
    );
    return result.rows[0];
  } catch (err) {
    console.error("❌ Error adding products:", err.message);
    throw err;
  } finally {
    client.release();
  }
}

export async function updateProduct(id, name, price, quantity) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "UPDATE products SET name = $2, price = $3, quantity = $4 WHERE id = $1 RETURNING *",
      [id, name, price, quantity]
    );
    return result.rows[0];
  } catch (err) {
    console.error("❌ Error updating product:", err.message);
    throw err;
  } finally {
    client.release();
  }
}

export async function deleteProduct(id) {
  const client = await pool.connect();
  try {
    const deletedProduct = await client.query(
      "DELETE FROM products WHERE id = $1 RETURNING *",
      [id]
    );
    return deletedProduct.rows[0];
  } catch (err) {
    console.error("❌ Error deleting product:", err.message);
    throw err;
  } finally {
    client.release();
  }
}
