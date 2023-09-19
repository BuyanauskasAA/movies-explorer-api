const statuses = require('../utils/statuses');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statuses.forbidden;
  }
}

module.exports = ForbiddenError;
