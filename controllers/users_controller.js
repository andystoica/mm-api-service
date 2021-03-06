const _ = require('lodash');
const { User, validateUser } = require('../models/user');

module.exports = {
  /**
   * CREATE A USER into the users collection
   * - validate user input and return 400 on failure
   * - check if user dlready exists and return 400 if it does
   * - add a new user and return it with 201 on success
   * - forward exceptions to error handler
   */
  createOneUser: async (req, res, next) => {
    try {
      // Validate input
      const { error } = validateUser(req.body);
      if (error) return res.status(400).json({ error: `${error.details[0].message}` });

      // Check if user exists
      let user = await User.findOne({ email: req.body.email });
      if (user) return res.status(400).json({ error: 'User already registered' });

      // Save to db
      user = new User(_.pick(req.body, ['name', 'email', 'password']));
      await user.save();

      // Return user data to client
      res.status(201).json(_.pick(user, ['_id', 'name', 'email']));
    } catch (err) {
      // Handle errors
      next(err);
    }
  },

  /**
   * GET USER DETAILS by their ID
   * - find the user in the database
   * - return 404 if user not found
   * - return 200 on success with user details
   * - forward exceptions to error handler
   */
  readOneUser: async (req, res, next) => {
    try {
      // Find user
      const user = await User.findOne({ _id: req.params.id });
      if (!user) return res.status(404).json({ error: 'User not found' });

      // Return user data
      res.status(200).json(_.pick(user, ['_id', 'name', 'email']));
    } catch (err) {
      // Handle errors
      next(err);
    }
  },

  /**
   * GET ALL USERS DETAILS
   * - permanently deny root with 405
   */
  readManyUsers: (req, res, next) => {
    res.status(405).json({ error: 'Method Not Allowed' });
  },

  /**
   * UPDATE USER DETAILS for a specific user
   * - find the user and return 404 if not found
   * - verify crendential and return 401 on failure
   * - update the remaining user details
   * - save to db and return 200 on success
   * - forward exceptions to error handler
   */
  updateOneUser: async (req, res, next) => {
    try {
      // Find user
      const user = await User.findOne({ _id: req.params.id });
      if (!user) return res.status(404).json({ error: 'User not found' });

      // Authentificate user request
      const authenticated = await user.comparePassword(req.body.password, user.password);
      if (!authenticated) return res.status(401).json({ error: 'Unauthorized' });

      // Update user details
      user.email = req.body.email || user.email;
      user.name = req.body.name || user.name;
      if (user.newPassword) user.password = user.newPassword;

      // Save to db
      await user.save();
      res.status(200).json(_.pick(user, ['_id', 'name', 'email']));
    } catch (err) {
      // Handle errors
      next(err);
    }
  },

  /**
   * DELETE USER by id
   * - find user by id and return 404 if not found
   * - return 200 and deleted user if successful
   * - forward exceptions to error handler
   */
  deleteOneUser: async (req, res, next) => {
    try {
      // Find and delete user
      const user = await User.findOneAndDelete({ _id: req.params.id });
      if (!user) return res.status(404).json({ error: 'User not found' });

      // Return deleted user details
      return res.status(200).json(_.pick(user, ['_id', 'name', 'email']));
    } catch (err) {
      // Handle errors
      next(err);
    }
  }
};
