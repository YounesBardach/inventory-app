import "../config.mjs";
import pkg from "pg";
const { Pool } = pkg;

// export const pool = new Pool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   database: process.env.DB_DATABASE,
//   password: process.env.DB_PASSWORD,
//   port: parseInt(process.env.DB_PORT) || 5432,
// });

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Necessary for Railway's PostgreSQL SSL connection
  },
});
