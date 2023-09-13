const User = require('../models/user');
const { BadRequestError, NotFoundError } = require('../errors');

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError('Пользователь не найден!'))
    .then((user) => res.end(user))
    .catch(next);
};

const updateUser = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { ...req.body },
    { new: true, runValidators: true },
  )
    .orFail(new NotFoundError('Пользователь не найден!'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные!'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getUser,
  updateUser,
};
