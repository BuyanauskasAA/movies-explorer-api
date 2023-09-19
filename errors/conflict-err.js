const statuses = require('../utils/statuses');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statuses.conflict;
  }
}

module.exports = ConflictError;
