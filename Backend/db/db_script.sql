CREATE DATABASE IF NOT EXISTS study_track;
USE study_track;

CREATE TABLE usuario(
	id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(60) NOT NULL,
    email VARCHAR(60) NOT NULL,
    pass VARCHAR(60) NOT NULL
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
    orden INT NOT NULL,
    materia_id INT NOT NULL,
    FOREIGN KEY (materia_id) REFERENCES materia(id)
);

CREATE TABLE tema(
	id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(25) NOT NULL,
    descripcion VARCHAR(60),
    orden INT NOT NULL,
    unidad_id INT NOT NULL,
    tema_padre_id INT NULL,
    FOREIGN KEY (unidad_id) REFERENCES unidad(id),
    FOREIGN KEY (tema_padre_id) REFERENCES tema(id)
);

CREATE TABLE progreso_tema(
	id INT AUTO_INCREMENT PRIMARY KEY,
    fecha_completado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tema_id INT NOT NULL,
    usuario_id INT NOT NULL,
    FOREIGN KEY (tema_id) REFERENCES tema(id),
    FOREIGN KEY (usuario_id) REFERENCES usuario(id),
    UNIQUE (usuario_id, tema_id)
);
