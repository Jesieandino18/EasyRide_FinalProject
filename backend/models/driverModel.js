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

export const findDriverForLogin = async (username) => {
  const [rows] = await pool.execute(
    "SELECT id, full_name, address, contact_number, plate_number, username, password FROM drivers WHERE username = ? LIMIT 1",
    [username]
  );

  return rows[0] || null;
};

export const findDriverById = async (id) => {
  const [rows] = await pool.execute(
    "SELECT id, full_name, address, contact_number, plate_number, username FROM drivers WHERE id = ? LIMIT 1",
    [id]
  );

  return rows[0] || null;
};