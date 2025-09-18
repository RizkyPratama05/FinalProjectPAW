
const express = require('express');
const router = express.Router();
const db = require('../database/db');
const { protect } = require('../middlewares/auth.middleware');
router.put('/password', protect, async (req, res) => {
  const user_id = req.user && req.user.id ? req.user.id : null;
  const { oldPassword, newPassword } = req.body;
  const bcrypt = require('bcrypt');
  if (!user_id) {
    return res.status(401).json({ message: 'Tidak terotorisasi' });
  }
  try {
    // Ambil password lama dari database
    const [rows] = await db.query('SELECT password FROM users WHERE user_id = ?', [user_id]);
    if (!rows[0]) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }
    const match = await bcrypt.compare(oldPassword, rows[0].password);
    if (!match) {
      return res.status(400).json({ message: 'Password lama salah' });
    }
    // Hash password baru
    const hashedNew = await bcrypt.hash(newPassword, 10);
    await db.query('UPDATE users SET password = ? WHERE user_id = ?', [hashedNew, user_id]);
    res.json({ message: 'Password berhasil diupdate' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// ...existing code...

// GET semua user
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM users");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET user by id
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [req.params.id]);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE user
router.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  const bcrypt = require('bcrypt');
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      "INSERT INTO users (nama, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );
    res.json({ id: result.insertId, nama: name, email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE user
router.put("/:id", async (req, res) => {
  const { name, email } = req.body;
  try {
    await db.query(
      "UPDATE users SET name = ?, email = ? WHERE id = ?",
      [name, email, req.params.id]
    );
    res.json({ message: "User updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE user
router.delete("/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM users WHERE id = ?", [req.params.id]);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
