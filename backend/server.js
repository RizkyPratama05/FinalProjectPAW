require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./database/db'); 

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Selamat datang di API Sistem Pendaftaran Seminar.' });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan pada port ${PORT}`);
});