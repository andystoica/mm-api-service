const mongoose = require('mongoose');

/**
 * Validate Object ID is a valid ID
 * - check the ID and return 400 if not provided or invalid
 * - continue to next middleware on success
 * - if token is invalid, return 400
 * - forward exceptions to error handler
 */
const oid = (req, res, next) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ error: 'ID not found' });
    }
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ error: 'Invalid ID' });
    }
    next();
  } catch (err) {
    return next(err);
  }
};

module.exports = oid;
