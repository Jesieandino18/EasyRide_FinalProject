import pool from "../config/db.js";

export const saveLocation = async (driverId, location) => {
  await pool.execute(
    `
      INSERT INTO driver_locations (
        driver_id,
        latitude,
        longitude,
        accuracy_meters,
        recorded_at
      )
      VALUES (?, ?, ?, ?, UTC_TIMESTAMP(3))
      ON DUPLICATE KEY UPDATE
        latitude = VALUES(latitude),
        longitude = VALUES(longitude),
        accuracy_meters = VALUES(accuracy_meters),
        recorded_at = VALUES(recorded_at)
    `,
    [
      driverId,
      location.latitude,
      location.longitude,
      location.accuracy,
    ]
  );
};

export const findLocation = async (driverId) => {
  const [rows] = await pool.execute(
    `
      SELECT
        driver_id,
        latitude,
        longitude,
        accuracy_meters,
        DATE_FORMAT(
          recorded_at,
          '%Y-%m-%dT%H:%i:%s.%fZ'
        ) AS recorded_at
      FROM driver_locations
      WHERE driver_id = ?
      LIMIT 1
    `,
    [driverId]
  );

  const location = rows[0];

  if (!location) return null;

  return {
    driver_id: location.driver_id,
    latitude: Number(location.latitude),
    longitude: Number(location.longitude),
    accuracy: Number(location.accuracy_meters),
    recorded_at: location.recorded_at,
  };
};