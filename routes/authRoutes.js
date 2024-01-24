const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Define authentication-related routes
router.post('/signup1', userController.signup);
router.post('/login', userController.login);

module.exports = router;
