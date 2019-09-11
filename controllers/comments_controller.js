const { Comment, validate } = require('../models/comment');

const create = async (req, res, next) => {
  // Validate incomming data
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ error: `${error.details[0].message}` });

  // Create a new comment
  try {
    const comment = await Comment.create(req.body);
    res.status(200).json(comment);
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
