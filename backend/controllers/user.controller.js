// Import fungsi user dari model
const {getAllUsers} = require('../models/user.models');

// Endpoint untuk list semua user
exports.listUsers = async (req, res) => {
  const users = await getAllUsers();
  res.json(users);
};