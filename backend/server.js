require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./database/db');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/certificates', express.static(path.join(__dirname, 'public/certificates')));
// Agar file gambar seminar bisa diakses dari frontend
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', require('./api/auth.routes'));
app.use('/api/user', require('./api/user.routes'));
app.use('/api/seminar', require('./api/seminar.routes'));
app.use('/api/registration', require('./api/registration.routes'));
app.use('/api/attendance', require('./api/attendance.routes'));
app.use('/api/certificate', require('./api/certificate.routes'));

app.get('/', (req, res) => {
  res.json({ message: 'Selamat datang di API Sistem Pendaftaran Seminar.' });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan pada port ${PORT}`);
});