const _ = require('lodash');
const { Message, validate } = require('../models/message');

module.exports = {
  /**
   * CREATE a new message to the messages collection
   * - validate user input and return 400 on failure
   * - add a new messages and return it with 201 on success
   * - forward exceptions to error handler
   */
  createMessage: async (req, res, next) => {
    // Validate input
    const { error } = validate(req.body);
    if (error) return res.status(400).json({ error: `${error.details[0].message}` });

    try {
      // Create new message
      const message = await Message.create(_.pick(req.body, ['userId', 'message']));
      return res.status(201).json(message);
    } catch (err) {
      // Handle exceptions
      next(err);
    }
  },

  /**
   * GET SINGLE MESSAGE by ID
   * - find the message in the database
   * - return 404 if message not found
   * - return 200 on success with message details
   * - forward exceptions to error handler
   */
  readMessage: async (req, res, next) => {
    try {
      // Find the message
      const message = await Message.findOne({ _id: req.params.id });
      if (!message) return res.status(400).json({ error: 'Message not found' });

      // Return message
      return res.status(200).json(message);
    } catch (err) {
      // Handle exceptions
      next(err);
    }
  },

  /**
   * GET ALL MESSAGES from the messages collection
   * - get pagination settings from query string or
   * - return first 20 messages by default
   * - forward exceptions to error handler
   */
  readMessages: async (req, res, next) => {
    try {
      // Pagination settings
      const offset = parseInt(req.query.offset) || 0;
      const limit = parseInt(req.query.limit) || 20;

      // Get messages
      const messages = await Message.find({})
        .skip(offset)
        .limit(limit);

      // Return messages
      res.status(200).json(messages);
    } catch (err) {
      // Handle exceptions
      next(err);
    }
  },

  /**
   * UPDATE ONE MESSAGE by ID
   * - validate user input or return 400 on failure
   * - find the message or return 404 if not found
   * - update the record and return 200
   * - forward exception to error handler
   */
  updateMessage: async (req, res, next) => {
    try {
      // Validate user input
      const { error } = validate(req.body);
      if (error) return res.status(400).json({ error: `${error.details[0].message}` });

      // Find the message
      const message = await Message.findById(req.params.id);
      if (!message) return res.status(404).json({ error: 'Message not found' });

      // Update the message
      message.message = req.body.message;
      await message.save();
      return res.status(200).json(message);
    } catch (err) {
      // Handle exceptions
      next(err);
    }
  },

  /**
   * DELETE MESSAGE by id
   * - find message by ID and return 404 if not found
   * - return 200 and deleted user if successful
   * - forward exceptions to error handler
   */
  deleteMessage: async (req, res, next) => {
    try {
      // Find the message and delete
      const message = await Message.findByIdAndDelete(req.params.id);
      if (!message) return res.status(404).json({ error: 'Message not found' });

      // Return the deleted message
      return res.status(200).json(message);
    } catch (err) {
      // Handle exceptions
      next(err);
    }
  }
};
