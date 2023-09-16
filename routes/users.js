const router = require('express').Router();
const { updateUserSchema } = require('../utils/validation-config');
const { getUser, updateUser } = require('../controllers/users');

router.get('/me', getUser);
router.patch('/me', updateUserSchema, updateUser);

module.exports = router;
