import pool from "../config/db.js";

const fetchActiveArrivals = async () => {
  const [rows] = await pool.execute(
    `
      SELECT
        arrival.id AS request_id,
        arrival.driver_id,
        arrival.status,

        driver.full_name,
        driver.plate_number,
        driver.contact_number,

        arrival.latitude,
        arrival.longitude,
        arrival.accuracy_meters,
        arrival.distance_meters,

        DATE_FORMAT(
          arrival.location_recorded_at,
          '%Y-%m-%dT%H:%i:%s.%fZ'
        ) AS location_recorded_at,

        DATE_FORMAT(
          arrival.requested_at,
          '%Y-%m-%dT%H:%i:%s.%fZ'
        ) AS requested_at,

        DATE_FORMAT(
          arrival.confirmed_at,
          '%Y-%m-%dT%H:%i:%s.%fZ'
        ) AS confirmed_at

      FROM driver_active_arrivals AS active

      INNER JOIN driver_arrival_requests AS arrival
        ON arrival.id = active.request_id
        AND arrival.driver_id = active.driver_id

      INNER JOIN drivers AS driver
        ON driver.id = arrival.driver_id

      WHERE arrival.status IN ('pending', 'confirmed')

      ORDER BY arrival.requested_at ASC, arrival.id ASC
    `
  );

  return rows.map((row) => ({
    request_id: row.request_id,
    driver_id: row.driver_id,
    status: row.status,
    full_name: row.full_name,
    plate_number: row.plate_number,
    contact_number: row.contact_number,
    latitude: Number(row.latitude),
    longitude: Number(row.longitude),
    accuracy_meters: Number(row.accuracy_meters),
    distance_meters: Number(row.distance_meters),
    location_recorded_at: row.location_recorded_at,
    requested_at: row.requested_at,
    confirmed_at: row.confirmed_at,
  }));
};

export { fetchActiveArrivals };