import pool from "../config/db.js";

export const findDriverByUsername = async (username) => {
  const [rows] = await pool.execute(
    "SELECT id FROM drivers WHERE username = ? LIMIT 1",
    [username]
  );

  return rows[0] || null;
};

export const insert = async (driver) => {
  const [result] = await pool.execute(
    "INSERT INTO drivers (full_name, address, contact_number, plate_number, username, password) VALUES (?, ?, ?, ?, ?, ?)",
    [
      driver.full_name,
      driver.address,
      driver.contact_number,
      driver.plate_number,
      driver.username,
      driver.password,
    ]
  );

  return result.insertId;
};