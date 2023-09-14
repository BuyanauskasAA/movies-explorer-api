const router = require('express').Router();
const auth = require('../middlewares/auth');
const authRouter = require('./auth');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const { NotFoundError } = require('../errors');

router.use('/', authRouter);
router.use(auth);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.use('*', (req, res, next) => next(new NotFoundError('Неверный ULR-запрос к серверу!')));

module.exports = router;
