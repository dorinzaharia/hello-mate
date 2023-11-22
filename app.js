require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const authRouter = require('./routes/auth');
const userRoutes = require('./routes/user');
const eventRoutes = require('./routes/event');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/', authRouter);
app.use('/users', userRoutes);
app.use('/events', eventRoutes);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const errors = error.data || [];
  const message = error.message || 'Error! Something went wrong.';
  res.status(status).json({
    message: message,
    errors: errors,
  });
});

// app.listen(process.env.PORT || 3000);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.8zuvkr1.mongodb.net/?retryWrites=true&w=majority`
  )
  .then((result) => {
    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => {
    console.log(err);
  });
