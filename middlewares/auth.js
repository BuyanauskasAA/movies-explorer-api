const jwt = require('jsonwebtoken');
const messages = require('../utils/messages');
const { UnauthorizedError } = require('../errors');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    throw new UnauthorizedError(messages.unauthorized);
  }

  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev_secret',
    );
  } catch (err) {
    throw new UnauthorizedError(messages.unauthorized);
  }

  req.user = payload;

  next();
};
