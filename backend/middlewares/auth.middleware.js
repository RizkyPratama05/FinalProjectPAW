// Import fungsi verifikasi token JWT
const { verifyToken } = require('../utils/jwt.util');

// Middleware untuk proteksi route, hanya user dengan token valid yang bisa akses
const protect = (req, res, next) => {
  let token;

  // Cek apakah ada header authorization dan format Bearer
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Ambil token dari header
      token = req.headers.authorization.split(' ')[1];

      // Verifikasi token
      const decoded = verifyToken(token);

      if (!decoded) {
        // Token tidak valid
        return res.status(401).json({ message: 'Tidak terotorisasi, token tidak valid' });
      }
      // Simpan data user ke req.user
      req.user = { id: decoded.id, role: decoded.role };
      next();

    } catch (error) {
      // Token gagal diverifikasi
      res.status(401).json({ message: 'Tidak terotorisasi, token gagal' });
    }
  }

  // Jika tidak ada token
  if (!token) {
    res.status(401).json({ message: 'Tidak terotorisasi, tidak ada token' });
  }
};

// Ekspor middleware protect
module.exports = { protect };