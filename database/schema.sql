CREATE TABLE IF NOT EXISTS users (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(190) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('citizen', 'admin') NOT NULL DEFAULT 'citizen',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS reports (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  reference VARCHAR(20) NOT NULL UNIQUE,
  user_id BIGINT UNSIGNED NULL,
  category ENUM('Road Damage', 'Street Lighting', 'Water Supply', 'Waste Management', 'Drainage', 'Other') NOT NULL,
  description TEXT NOT NULL,
  location VARCHAR(255) NOT NULL,
  latitude DECIMAL(10,7) NULL,
  longitude DECIMAL(10,7) NULL,
  status ENUM('Under Review', 'In Progress', 'Resolved') NOT NULL DEFAULT 'Under Review',
  priority ENUM('Critical', 'High', 'Medium', 'Low') NOT NULL DEFAULT 'Medium',
  department VARCHAR(120) NULL,
  assigned_to VARCHAR(120) NULL,
  evidence_name VARCHAR(255) NULL,
  administrative_note TEXT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_reports_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_reports_status (status),
  INDEX idx_reports_created_at (created_at)
);

INSERT INTO users (name, email, password_hash, role)
VALUES (
  'System Administrator',
  'test@example.com',
  '$2y$10$sW68zCKXdS6lCGyEMitxU.6QZPInrLovZqUBJdbMPHrGnayLlznc6',
  'admin'
)
ON DUPLICATE KEY UPDATE
  name = VALUES(name),
  password_hash = VALUES(password_hash),
  role = VALUES(role);