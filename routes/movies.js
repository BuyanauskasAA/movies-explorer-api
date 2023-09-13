const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const { getMovies, saveMovie, deleteMovie } = require('../controllers/movies');
const urlRegex = require('../utils/url-regex');

router.get('/', getMovies);

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().regex(urlRegex).required(),
      trailerLink: Joi.string().regex(urlRegex).required(),
      thumbnail: Joi.string().regex(urlRegex).required(),
      owner: Joi.string().hex().length(24).required(),
      movieId: Joi.string().hex().length(24).required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  }),
  saveMovie,
);

router.delete(
  '/:movieId',
  celebrate({
    params: Joi.object().keys({
      movieId: Joi.string().hex().length(24),
    }),
  }),
  deleteMovie,
);

module.exports = router;