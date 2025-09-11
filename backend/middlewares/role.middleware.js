// Middleware untuk membatasi akses hanya untuk admin
const isAdmin = (req, res, next) => {
  // Cek apakah role user adalah admin
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Akses hanya untuk admin' });
  }
  next();
};

// Ekspor middleware isAdmin
module.exports = { isAdmin };
