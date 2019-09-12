const _ = require('lodash');
const { Comment, validateComment } = require('../models/comment');

module.exports = {
  /**
   * CREATE a new comment into the comments collection
   * - validate user input and return 400 on failure
   * - add a new comment and return it with 201 on success
   * - forward exceptions to error handler
   */
  createComment: async (req, res, next) => {
    try {
      // Validate incomming data
      const { error } = validateComment(req.body);
      if (error) return res.status(400).json({ error: `${error.details[0].message}` });

      // Create a new comment
      const comment = await Comment.create(_.pick(req.body, ['userId', 'parentId', 'comment']));
      return res.status(201).json(comment);
    } catch (err) {
      // Handle exceptions
      next(err);
    }
  },

  /**
   * GET ONE COMMENT by ID
   * - find the comment or return 404 if not found
   * - return the comment with 200
   * - forward exceptions to error handler
   */
  readComment: async (req, res, next) => {
    try {
      // Find the comment
      const comment = await Comment.findById(req.params.id);
      if (!comment) return res.status(404).json({ error: 'Comment not found' });

      // Return the comment
      return res.status(200).json(comment);
    } catch (err) {
      // Handle exceptions
      next(err);
    }
  },

  /**
   * GET ALL COMMENTS from the comments collection
   * - get pagination settings from query string or
   * - return first 20 comments by default
   * - forward exceptions to error handler
   */
  readComments: async (req, res, next) => {
    try {
      // Pagination settings
      const offset = parseInt(req.query.offset) || 0;
      const limit = parseInt(req.query.limit) || 20;

      //
      const comments = await Comment.find({})
        .skip(offset)
        .limit(limit);

      // Return comments
      return res.status(200).json(comments);
    } catch (err) {
      // Handle exceptions
      next(err);
    }
  },

  /**
   * UPDATE COMMENT by ID
   * - validate user input and return 400 on failure
   * - find the comment or return 404 on failure
   * - update the comment
   * - return the updated comment
   * - forward exceptions to error handler
   */
  updateComment: async (req, res, next) => {
    try {
      // Validate input
      const { error } = validateComment(res.body);
      if (error) return res.status(400).json({ error: `${error.details[0].message}` });

      // Find the comment
      const comment = await Comment.findById(req.params.id);
      if (!comment) return res.status(404).json({ error: 'Comment not found' });

      // Update the comment and return
      comment.comment = req.body.comment;
      await comment.save();
      return res.status(200).json(comment);
    } catch (err) {
      next(err);
    }
  },

  /**
   * DELETE COMMENT by ID
   * - find the comment or return 404 on failure
   * - delete the comment
   * - return 200 and the deleted comment to the caller
   * - forward exceptions to error handler
   */
  deleteComment: async (req, res, next) => {
    try {
      // Find the comment
      const comment = await Comment.findByIdAndDelete(req.params.id);
      if (!comment) return res.status(404).json({ error: 'Comment not found' });

      // Return the deleted comment
      res.status(200).json(comment);
    } catch (err) {
      // Handle exceptions
      next(err);
    }
  }
};
