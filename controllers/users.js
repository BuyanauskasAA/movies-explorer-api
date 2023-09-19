const User = require('../models/user');
const messages = require('../utils/messages');
const { BadRequestError, ConflictError, NotFoundError } = require('../errors');

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError(messages.userNotFound))
    .then((user) => res.send(user))
    .catch(next);
};

const updateUser = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { ...req.body },
    { new: true, runValidators: true },
  )
    .orFail(new NotFoundError(messages.userNotFound))
    .then((user) => res.send(user))
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

module.exports = {
  getUser,
  updateUser,
};
