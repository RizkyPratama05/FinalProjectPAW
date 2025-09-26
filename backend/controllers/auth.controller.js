// Import fungsi user dari model
const {createUser , findUserByEmail} = require('../models/user.models');
// Import bcrypt untuk hashing dan verifikasi password
const bcrypt = require('bcrypt');
// Import fungsi untuk membuat JWT
const {createToken} = require('../utils/jwt.util');

// Endpoint untuk registrasi user baru
exports.register = async (req, res) => {
    const {nama, email, password, role} = req.body;
    // Cek apakah email sudah terdaftar
    const userExists = await findUserByEmail(email);
    if (userExists) {
        return res.status(400).json({message: 'Email sudah terdaftar'});
    }

    // Buat user baru
    await createUser(nama, email, password, role || 'user');
    res.status(201).json({message: 'User berhasil didaftarkan'});
};

exports.registerAdmin = async (req, res) => {
  const {nama, email, password} = req.body;
  const userExists = await findUserByEmail(email);
  if (userExists) {
    return res.status(400).json({message: 'Email sudah terdaftar'});
  }

  await createUser(nama, email, password, "admin");
  res.status(201).json({message: 'Admin berhasil dibuat'});
};

// Endpoint untuk login user
exports.login = async (req, res) => {
    const {email, password} = req.body;
    const logger = require('../logger');
    logger.info(`Login attempt: email=${email}`);
    // Cari user berdasarkan email
    const user = await findUserByEmail(email);
    if (!user) {
        logger.warn(`Login failed: email not found (${email})`);
        return res.status(400).json({message: 'Email tidak ditemukan'});
    }
    // Verifikasi password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        logger.warn(`Login failed: wrong password for email=${email}`);
        return res.status(400).json({message: 'Password salah'});
    }

    // Generate token JWT
    logger.info(`Login success: email=${email}, user_id=${user.user_id}`);
    const token = createToken({id: user.user_id, role: user.role});
    res.json({token, role: user.role, nama: user.nama});
};
