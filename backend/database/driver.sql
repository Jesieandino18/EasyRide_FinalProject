CREATE DATABASE IF NOT EXISTS easyride_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_general_ci;

USE easyride_db;

CREATE TABLE IF NOT EXISTS drivers (
    id INT NOT NULL AUTO_INCREMENT,
    full_name VARCHAR(150) NOT NULL,
    address VARCHAR(255) NOT NULL,
    contact_number VARCHAR(20) NOT NULL,
    plate_number VARCHAR(30) NOT NULL,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,

    PRIMARY KEY (id),
    UNIQUE KEY uq_drivers_username (username)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;