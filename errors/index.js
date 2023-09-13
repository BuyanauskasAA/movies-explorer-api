const BadRequestError = require('./bad-request-err');
const ConfilctError = require('./conflict-err');
const ForbiddenError = require('./forbidden-err');
const NotFoundError = require('./not-found-err');
const UnauthorizedError = require('./unauthorized-err');

module.exports = {
  BadRequestError,
  ConfilctError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
};
