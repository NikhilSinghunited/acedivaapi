const express = require('express');
const ucontroller = require('../controllers/userController');

const router = express.Router();

// Define authentication-related routes
router.post('/register', ucontroller.signup);
router.post('/login', ucontroller.login);

module.exports = router;
