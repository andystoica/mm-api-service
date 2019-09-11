const User = require('../models/user');

const create = async (req, res) => {
  const user = await User.create(req.body);
  res.send(user);
};

const healthCheck = (req, res) => {
  res.json({ message: 'ok' });
};

module.exports = {
  create,
  healthCheck
};
