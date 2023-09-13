const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    throw new UnauthorizedError('Необходима авторизация!');
  }

  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev_secret',
    );
  } catch (err) {
    throw new UnauthorizedError('Необходима авторизация!');
  }

  req.user = payload;

  next();
};
