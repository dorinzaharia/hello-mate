const { validationResult } = require('express-validator');

const User = require('../models/user');

exports.getUser = (req, res, next) => {
  res.status(200).json({
    firstName: 'firstName',
    lastName: 'lastName',
  });
};

exports.createUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({
      message: 'Validation failed',
      errors: errors.array(),
    });
  }
  console.log(errors);
  const firstName = req.body.firstName;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  const user = new User({
    firstName: firstName,
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
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Something went wrong',
    });
  }
};
