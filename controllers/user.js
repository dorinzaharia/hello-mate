const { validationResult } = require('express-validator');

exports.getUser = (req, res, next) => {
  res.status(200).json({
    firstName: 'firstName',
    lastName: 'lastName',
  });
};

exports.createUser = (req, res, next) => {
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
  res.status(201).json({
    message: 'User created successfully',
  });
};
