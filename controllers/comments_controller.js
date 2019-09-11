const { Comment, validate } = require('../models/comment');

module.exports = {
  /**
   * CREATE a new comment into the comments collection
   * - validate user input and return 400 on failure
   * - add a new comment and return it with 201 on success
   * - forward exceptions to error handler
   */
  createComment: async (req, res, next) => {
    // Validate incomming data
    const { error } = validate(req.body);
    if (error) return res.status(400).json({ error: `${error.details[0].message}` });

    // Create a new comment
    try {
      const comment = await Comment.create(req.body);
      res.status(201).json(comment);
    } catch (err) {
      next(err);
    }
  },

  readComment: (req, res, next) => {
    res.status(200).json({ data: 'read one comment' });
  },

  readComments: (req, res, next) => {
    res.status(200).json({ data: 'read all comments' });
  },

  updateComment: (req, res, next) => {
    res.status(200).json({ data: 'update one comment' });
  },

  deleteComment: (req, res, next) => {
    res.status(200).json({ data: 'delete one comment' });
  }
};
