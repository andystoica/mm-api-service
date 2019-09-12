const { User, validateUser } = require('../models/user');

module.exports = {
  /**
   * AUTHETICATES USER using a JSON Web Token (JWT)
   * - validate user input or return 400 on failure
   * - check if user exist or return 400 on failuer
   * - verify password or return 400 on failure
   * - create JWT and return 200
   * - forward exceptions to error handler
   */
  login: async (req, res, next) => {
    try {
      // Validate user input
      const { error } = validateUser(req.body);
      if (error) return res.status(400).json({ error: `${error.details[0].message}` });

      // Verify the user exists
      const user = await User.findOne({ email: req.body.email });
      if (!user) return res.status(400).json({ error: 'Invalid email or password' });

      // Verify the password matches
      const authenticated = await user.comparePassword(req.body.password);
      if (!authenticated) res.status(400).json({ error: 'Invalid email or password' });

      // Create and return JWT token
      const token = user.generateAuthToken();
      return res.status(200).json({ token });
    } catch (err) {
      // Handle exceptions
      next(err);
    }
  }
};
