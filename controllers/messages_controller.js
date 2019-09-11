const { Message } = require('../models/message');

const create = async (req, res, next) => {
  try {
    const message = await Message.create(req.body);
    res.send(message);
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
