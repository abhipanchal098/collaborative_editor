const router = require('express').Router();
const userController = require('../controllers/user');

router.post(`/register`, userController.registration);
router.post(`/login`, userController.login);

module.exports = router;
