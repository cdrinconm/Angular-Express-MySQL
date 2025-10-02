#DROP DATABASE db_fletx;
CREATE DATABASE db_fletx;

USE db_fletx;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(50) NOT NULL,
    contrasena VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL
);

INSERT INTO usuarios (usuario, contrasena, email) VALUES ('admin', 'admin123', 'admin@gmail.com');