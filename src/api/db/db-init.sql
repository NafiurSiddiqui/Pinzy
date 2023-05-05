CREATE DATABASE IF NOT EXISTS pintzy_users;

USE pintzy_users;

CREATE TABLE IF NOT EXISTS pintzy_user_info (
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL,
  user_password VARCHAR(255) NOT NULL,
  user_image VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS pintzy_user_pin (
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id INT(11) NOT NULL,
  event_type VARCHAR(255) NOT NULL,
  event_message TEXT NOT NULL,
  event_latitude DECIMAL(10, 8) NOT NULL,
  event_longitude DECIMAL(11, 8) NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  FOREIGN KEY (user_id) REFERENCES pintzy_user_info(id)
);

CREATE TABLE IF NOT EXISTS pintzy_guest_info (
  guest_id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  guest_name VARCHAR(255) NOT NULL DEFAULT 'anonymous',
  limit_count INT(11) NOT NULL DEFAULT 10
);

CREATE TABLE IF NOT EXISTS pintzy_guest_pin (
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  guest_id INT(11) NOT NULL,
  event_type VARCHAR(255) NOT NULL,
  event_message TEXT NOT NULL,
  event_latitude DECIMAL(10, 8) NOT NULL,
  event_longitude DECIMAL(11, 8) NOT NULL,
  event_date DATE NOT NULL,
  event_time TIME NOT NULL,
  FOREIGN KEY (guest_id) REFERENCES pintzy_guest_info(guest_id)
);
