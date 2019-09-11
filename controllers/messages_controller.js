const { Message, validate } = require('../models/message');

module.exports = {
  /**
   * CREATE a new message to the messages collection
   * - validate user input and return 400 on failure
   * - add a new messages and return it with 201 on success
   * - forward exceptions to error handler
   */
  createMessage: async (req, res, next) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).json({ error: `${error.details[0].message}` });

    try {
      const message = await Message.create(req.body);
      res.status(201).json(message);
    } catch (err) {
      next(err);
    }
  },

  readMessage: (req, res, next) => {
    res.status(200).json({ data: 'read one message' });
  },

  readMessages: (req, res, next) => {
    res.status(200).json({ data: 'read all messages' });
  },

  updateMessage: (req, res, next) => {
    res.status(200).json({ data: 'update one message' });
  },

  deleteMessage: (req, res, next) => {
    res.status(200).json({ data: 'delete one message' });
  }
};
