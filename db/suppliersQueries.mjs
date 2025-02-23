import { pool } from "./pool.mjs";

export async function getAllSuppliers() {
  const client = await pool.connect();
  try {
    const { rows } = await client.query("SELECT * FROM suppliers");
    return rows;
  } catch (err) {
    console.error("❌ Error loading suppliers:", err.message);
    throw err;
  } finally {
    client.release();
  }
}

export async function getSupplier(id) {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(
      "SELECT * FROM suppliers WHERE id = $1",
      [id]
    );
    return rows[0];
  } catch (err) {
    console.error("❌ Error loading supplier:", err.message);
    throw err;
  } finally {
    client.release();
  }
}

export async function addSupplier(name, phone, email) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "INSERT INTO suppliers (name, phone, email) VALUES ($1, $2, $3) RETURNING *",
      [name, phone, email]
    );
    return result.rows[0];
  } catch (err) {
    console.error("❌ Error adding supplier:", err.message);
    throw err;
  } finally {
    client.release();
  }
}

export async function updateSupplier(id, name, phone, email) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "UPDATE suppliers SET name = $2, phone = $3, email = $4 WHERE id = $1 RETURNING *",
      [id, name, phone, email]
    );
    return result.rows[0];
  } catch (err) {
    console.error("❌ Error updating supplier:", err.message);
    throw err;
  } finally {
    client.release();
  }
}

export async function deleteSupplier(id) {
  const client = await pool.connect();
  try {
    const deletedSupplier = await client.query(
      "DELETE FROM suppliers WHERE id = $1 RETURNING *",
      [id]
    );
    return deletedSupplier.rows[0];
  } catch (err) {
    console.error("❌ Error deleting supplier:", err.message);
    throw err;
  } finally {
    client.release();
  }
}
