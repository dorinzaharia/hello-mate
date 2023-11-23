require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  let decodedToken;
  let token = req.get('Authorization');
  if (!token) {
    const err = new Error('Authorization token not provided.');
    err.statusCode = 401;
    throw err;
  }
  token = token.split(' ')[1];
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    const err = new Error('Something went wrong.');
    err.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {
    const err = new Error('Not authenticated.');
    err.statusCode = 401;
    throw err;
  }
  req.userId = decodedToken.userId;
  next();
};
