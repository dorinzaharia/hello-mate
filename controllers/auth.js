const { validationResult } = require('express-validator');

const User = require('../models/user');

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.');
    error.statusCode = 422;
    error.data = errors.array();
    next(error);
  }
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  const user = new User({
    email: email,
    username: username,
    password: password,
  });
  try {
    const result = await user.save();
    res.status(201).json({
      message: 'User created successfully',
      result,
    });
  } catch (error) {
    console.log(error);
    const err = new Error('Something went wrong.');
    err.statusCode = 500;
    next(err);
  }
};
