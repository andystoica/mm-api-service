const { User, validate } = require('../models/user');

module.exports = {
  /**
   * CREATE a new user to the users collection
   * - validate user input and return 400 on failure
   * - add a new user and return it with 201 on success
   * - forward exceptions to error handler
   */
  createUser: async (req, res, next) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).json({ error: `${error.details[0].message}` });

    try {
      const user = await User.create(req.body);
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  },

  readUser: (req, res, next) => {
    res.status(200).json({ data: 'read one user' });
  },

  readUsers: (req, res, next) => {
    res.status(405).json({ error: 'Method Not Allowed' });
  },

  updateUser: (req, res, next) => {
    res.status(200).json({ data: 'update one user' });
  },

  deleteUser: (req, res, next) => {
    res.status(200).json({ data: 'delete one user' });
  }
};
