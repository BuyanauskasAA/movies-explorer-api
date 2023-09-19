const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const messages = require('../utils/messages');
const { UnauthorizedError } = require('../errors');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
}, { versionKey: false });

userSchema.statics.findUserByCredential = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(messages.wrongEmailOrPassword);
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError(messages.wrongEmailOrPassword);
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
