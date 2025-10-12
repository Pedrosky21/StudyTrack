CREATE DATABASE IF NOT EXISTS study_track;
USE study_track;

CREATE TABLE usuario(
	id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(60) NOT NULL,
    email VARCHAR(60) NOT NULL,
    auth0_id VARCHAR(60) NOT NULL
);

CREATE TABLE materia(
	id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(25) NOT NULL,
    descripcion VARCHAR(60),
    imagenURL VARCHAR(265),
    usuario_id INT NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id)
);

CREATE TABLE unidad(
	id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(25) NOT NULL,
    descripcion VARCHAR(60),
    orden INT,
    materia_id INT NOT NULL,
    FOREIGN KEY (materia_id) REFERENCES materia(id) ON DELETE CASCADE
);

CREATE TABLE tema(
	id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(25) NOT NULL,
    descripcion VARCHAR(60),
    orden INT,
    unidad_id INT NOT NULL,
    tema_padre_id INT NULL,
    FOREIGN KEY (unidad_id) REFERENCES unidad(id) ON DELETE CASCADE,
    FOREIGN KEY (tema_padre_id) REFERENCES tema(id) ON DELETE SET NULL
);

CREATE TABLE progreso_tema(
	id INT AUTO_INCREMENT PRIMARY KEY,
    fecha_completado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tema_id INT NOT NULL,
    usuario_id INT NOT NULL,
    FOREIGN KEY (tema_id) REFERENCES tema(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE,
    UNIQUE (usuario_id, tema_id)
);
