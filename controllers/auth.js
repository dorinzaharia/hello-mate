const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.');
    error.statusCode = 422;
    error.data = errors.array();
    next(error);
  }

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const user = new User({
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
    });
    const resultData = await user.save();

    res.status(201).json({
      message: 'User created successfully',
      data: resultData,
    });
  } catch (error) {
    console.log(error);
    const err = new Error('Something went wrong.');
    err.statusCode = 500;
    next(err);
  }
};
