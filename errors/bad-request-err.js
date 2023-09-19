const statuses = require('../utils/statuses');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statuses.badRequest;
  }
}

module.exports = BadRequestError;
