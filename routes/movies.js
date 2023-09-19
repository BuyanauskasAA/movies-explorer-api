const router = require('express').Router();
const { saveMovieSchema, deleteMovieSchema } = require('../utils/validation-config');
const { getMovies, saveMovie, deleteMovie } = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', saveMovieSchema, saveMovie);
router.delete('/:movieId', deleteMovieSchema, deleteMovie);

module.exports = router;
