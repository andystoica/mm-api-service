const { Message, validate } = require('../models/message');

const create = async (req, res, next) => {
  // Validate incomming data
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ error: `${error.details[0].message}` });

  // Create a new message
  try {
    const message = await Message.create(req.body);
    res.status(200).json(message);
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
