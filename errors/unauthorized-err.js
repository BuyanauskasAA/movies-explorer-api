const statuses = require('../utils/statuses');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statuses.unauthorized;
  }
}

module.exports = UnauthorizedError;
