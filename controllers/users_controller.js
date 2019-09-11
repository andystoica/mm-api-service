const { User } = require('../models/user');

const create = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.send(user);
  } catch (err) {
    next(err);
  }
};

const healthCheck = (req, res) => {
  res.json({ message: 'ok' });
};

module.exports = {
  create,
  healthCheck
};
