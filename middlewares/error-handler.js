const messages = require('../utils/messages');

module.exports = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? messages.serverError
        : message,
    });

  next();
};
