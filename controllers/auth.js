require('dotenv').config();
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

    console.log(resultData);

    res.status(201).json({ id: resultData._id.toString(), email: resultData.email, username: resultData.username });
  } catch (error) {
    console.log(error);
    const err = new Error('Something went wrong.');
    err.statusCode = 500;
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.');
    error.statusCode = 422;
    error.data = errors.array();
    next(error);
  }

  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      const error = new Error('User not found.');
      error.statusCode = 401;
      next(error);
    }

    const isEqual = bcrypt.compare(req.body.password, user.password);

    if (!isEqual) {
      if (!user) {
        const error = new Error('Wrong password.');
        error.statusCode = 401;
        next(error);
      }
    }
    const token = jwt.sign({ email: user.email, userId: user._id.toString() }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.status(200).json({ userId: user._id.toString(), token });
  } catch (error) {
    console.log(error);
    const err = new Error('Something went wrong.');
    err.statusCode = 500;
    next(err);
  }
};
