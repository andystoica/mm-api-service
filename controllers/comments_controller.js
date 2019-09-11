const { Comment } = require('../models/comment');

const create = async (req, res, next) => {
  try {
    const comment = await Comment.create(req.body);
    res.send(comment);
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
