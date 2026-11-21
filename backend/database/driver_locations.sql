USE easyride_db;

CREATE TABLE IF NOT EXISTS driver_locations (
    driver_id INT NOT NULL,
    latitude DECIMAL(10,7) NOT NULL,
    longitude DECIMAL(10,7) NOT NULL,
    accuracy_meters DOUBLE NOT NULL,
    recorded_at DATETIME(3) NOT NULL,

    PRIMARY KEY (driver_id),

    CONSTRAINT fk_driver_locations_driver
        FOREIGN KEY (driver_id)
        REFERENCES drivers(id)
        ON DELETE CASCADE
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;