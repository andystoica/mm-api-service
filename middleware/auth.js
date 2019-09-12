const jwt = require('jsonwebtoken');
const config = require('config');

/**
 * JWT AUTH Middleware
 * - check the client sent the x-auth-token header or return 401
 * - if token is valid, add user information to the request
 * - if token is invalid, return 400
 */
const auth = (req, res, next) => {
  // check client header
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

  try {
    // verify JWT Token
    const payload = jwt.verify(token, config.get('api.jwtPrivateKey'));
    req.user = payload;
    return next();
  } catch (err) {
    return res.status(400).send({ error: 'Access denied. Invalid token.' });
  }
};

module.exports = auth;
