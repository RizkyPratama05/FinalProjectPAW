const { verifyToken } = require('../utils/jwt.util');

const protect = (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = verifyToken(token);

      if (!decoded) {
        return res.status(401).json({ message: 'Tidak terotorisasi, token tidak valid' });
      }
      req.user = { id: decoded.id, role: decoded.role };
      next();

    } catch (error) {
      res.status(401).json({ message: 'Tidak terotorisasi, token gagal' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Tidak terotorisasi, tidak ada token' });
  }
};

module.exports = { protect };