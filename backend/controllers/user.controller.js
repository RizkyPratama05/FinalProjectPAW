const {getAllUsers} = require('../models/user.models');

exports.listUsers = async (req, res) => {
  const users = await getAllUsers();
  res.json(users);
};