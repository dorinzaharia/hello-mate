const express = require('express');
const { body } = require('express-validator');

const authController = require('../controllers/auth');

const router = express.Router();

router.post(
  '/signup',
  [
    body('email').trim().isEmail().normalizeEmail(),
    body('username').trim().isLength({ min: 5 }),
    body('password').trim().isLength({ min: 6 }),
  ],
  authController.signup
);

module.exports = router;
