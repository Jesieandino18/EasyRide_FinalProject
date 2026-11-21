CREATE DATABASE IF NOT EXISTS easyride_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_general_ci;

USE easyride_db;

CREATE TABLE IF NOT EXISTS dispatchers (
    id INT NOT NULL AUTO_INCREMENT,
    full_name VARCHAR(150) NOT NULL,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_dispatchers_username (username)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;
