const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const messages = require('../utils/messages');
const statuses = require('../utils/statuses');
const { ConflictError, BadRequestError } = require('../errors');

const { NODE_ENV, JWT_SECRET } = process.env;

const signUp = (req, res, next) => {
  const { password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ ...req.body, password: hash }))
    .then((user) => {
      const { _id, name, email } = user;
      res.status(statuses.created).send({ _id, name, email });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(messages.conflict));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError(messages.badRequest));
      } else {
        next(err);
      }
    });
};

const signIn = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredential(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev_secret',
        { expiresIn: '7d' },
      );

      res
        .cookie('jwt', token, {
          maxAge: 3600000,
          httpOnly: true,
        })
        .send({ _id: user._id, name: user.name, email: user.email });
    })
    .catch(next);
};

const signOut = (req, res) => {
  res.clearCookie('jwt').send({ message: messages.signOut });
};

module.exports = {
  signUp,
  signIn,
  signOut,
};
