const router = require('express').Router();
const { signUpSchema, signInSchema } = require('../utils/validation-config');
const { signUp, signIn, signOut } = require('../controllers/auth');

router.post('/signup', signUpSchema, signUp);
router.post('/signin', signInSchema, signIn);
router.post('/signout', signOut);

module.exports = router;
