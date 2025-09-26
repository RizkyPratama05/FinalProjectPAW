CREATE DATABASE IF NOT EXISTS seminar_db;

USE seminar_db;



-- Tabel users

CREATE TABLE users (

  user_id INT AUTO_INCREMENT PRIMARY KEY,

  nama VARCHAR(100) NOT NULL,

  email VARCHAR(100) NOT NULL UNIQUE,

  password VARCHAR(255) NOT NULL,

  role ENUM('user','admin') DEFAULT 'user',

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);



-- Tabel seminars

CREATE TABLE seminars (

  seminar_id INT AUTO_INCREMENT PRIMARY KEY,
  judul VARCHAR(50) NOT NULL, -- diubah panjang datanya
  deskripsi TEXT,
  tanggal DATE NOT NULL,
  lokasi VARCHAR(255) NOT NULL,
  harga INT, -- diubah ke int
  gambar VARCHAR(255),
  created_by INT,
  FOREIGN KEY (created_by) REFERENCES users(user_id) ON DELETE SET NULL
);



-- Tabel registrations (pendaftaran seminar)

CREATE TABLE registrations (

  registration_id INT AUTO_INCREMENT PRIMARY KEY,

  user_id INT NOT NULL,

  seminar_id INT NOT NULL,

  status ENUM('pending','approved','rejected') DEFAULT 'pending',

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,

  FOREIGN KEY (seminar_id) REFERENCES seminars(seminar_id) ON DELETE CASCADE

);



-- Tabel attendance (absensi seminar)

CREATE TABLE attendance (

  attendance_id INT AUTO_INCREMENT PRIMARY KEY,

  registration_id INT NOT NULL,

  status ENUM('hadir','tidak_hadir') DEFAULT 'tidak_hadir',

  FOREIGN KEY (registration_id) REFERENCES registrations(registration_id) ON DELETE CASCADE

);



-- Tabel certificates (sertifikat seminar)

sekarang berikan panduan detail untuk membuat class diagram yang berpedoman node js di visual paradigm online web
ini struktur table database:

CREATE TABLE certificates (

  certificate_id INT AUTO_INCREMENT PRIMARY KEY,

  registration_id INT NOT NULL,

  file_url VARCHAR(255),

  FOREIGN KEY (registration_id) REFERENCES registrations(registration_id) ON DELETE CASCADE

);