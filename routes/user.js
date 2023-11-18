const express = require('express');
const { body } = require('express-validator');

const userController = require('../controllers/user');

const router = express.Router();

router.post(
  '/',
  [
    body('firstName').trim().isLength({ min: 2 }),
    body('email').trim().isEmail(),
    body('username').trim().isLength({ min: 5 }),
    body('password').trim().isLength({ min: 6 }),
  ],
  userController.createUser
);
router.get('/:userId', userController.getUser);

module.exports = router;
