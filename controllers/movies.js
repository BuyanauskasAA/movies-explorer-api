const Movie = require('../models/movie');
const messages = require('../utils/messages');
const statuses = require('../utils/statuses');
const { BadRequestError, NotFoundError, ForbiddenError } = require('../errors');

const getMovies = (req, res, next) => {
  Movie.find()
    .then((movies) => movies.filter((movie) => req.user._id === movie.owner.toString()))
    .then((movies) => res.send(movies))
    .catch(next);
};

const saveMovie = (req, res, next) => {
  Movie.create({ ...req.body, owner: req.user._id })
    .then((movie) => res.status(statuses.created).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(messages.badRequest));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(new NotFoundError(messages.filmNotFound))
    .then((movie) => {
      if (req.user._id !== movie.owner.toString()) {
        throw new ForbiddenError(messages.forbidden);
      }

      return Movie.findByIdAndRemove(req.params.movieId);
    })
    .then((movie) => res.send(movie))
    .catch(next);
};

module.exports = {
  getMovies,
  saveMovie,
  deleteMovie,
};
