const express = require('express');
const { check } = require('express-validator');
const authController = require('../controllers/auth.controller');

const router = express.Router();

// Validation middleware
const registerValidation = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  check('name', 'Name is required').not().isEmpty()
];

const loginValidation = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
];

// Routes
router.post('/register', registerValidation, authController.register);
router.post('/login', loginValidation, authController.login);
router.get('/check', authController.check);

module.exports = router; 