const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');

// Route for user login
router.post('/login', AuthController.login);

// Add more authentication routes as needed (e.g., register, logout)

// Export the router
module.exports = router;
