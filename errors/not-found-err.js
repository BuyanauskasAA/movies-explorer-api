const statuses = require('../utils/statuses');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statuses.notFound;
  }
}

module.exports = NotFoundError;
