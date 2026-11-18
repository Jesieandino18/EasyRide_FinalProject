import pool from "../config/db.js";

export const findByUsername = async (username) => {
  const [rows] = await pool.execute(
    "SELECT id, full_name, username, password FROM dispatchers WHERE username = ? LIMIT 1",
    [username]
  );

  return rows[0] || null;
};

export const findById = async (id) => {
  const [rows] = await pool.execute(
    "SELECT id, full_name, username FROM dispatchers WHERE id = ? LIMIT 1",
    [id]
  );

  return rows[0] || null;
};