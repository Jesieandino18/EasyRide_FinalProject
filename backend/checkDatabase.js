import pool from "./config/db.js";

try {
  await pool.query("SELECT 1");
  console.log("Database connected successfully.");
} catch (error) {
  console.error("Database connection failed:", error.message);
  process.exitCode = 1;
} finally {
  await pool.end();
}