const Movie = require('../models/movie');
const { BadRequestError, NotFoundError, ForbiddenError } = require('../errors');

const getMovies = (req, res, next) => {
  Movie.find()
    .then((movies) => movies.filter((movie) => req.user._id === movie.owner.toString()))
    .then((movies) => res.send(movies))
    .catch(next);
};

const saveMovie = (req, res, next) => {
  Movie.create({ ...req.body, owner: req.user._id })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные!'));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(new NotFoundError('Фильм не найден!'))
    .then((movie) => {
      if (req.user._id !== movie.owner.toString()) {
        throw new ForbiddenError('Фильм сохранен другим пользователем!');
      }

      Movie.findByIdAndRemove(req.params.movieId);
    })
    .then((movie) => res.send(movie))
    .catch(next);
};

module.exports = {
  getMovies,
  saveMovie,
  deleteMovie,
};
