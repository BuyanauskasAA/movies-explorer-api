const messages = require('../utils/messages');
const statuses = require('../utils/statuses');

module.exports = (err, req, res, next) => {
  const { statusCode = statuses.serverError, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === statuses.serverError
        ? messages.serverError
        : message,
    });

  next();
};
