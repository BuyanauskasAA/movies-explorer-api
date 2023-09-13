const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const { signUp, signIn, signOut } = require('../controllers/auth');

router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30).required(),
    }),
  }),
  signUp,
);

router.post(
  'signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  signIn,
);

router.post('signout', signOut);

module.exports = router;
