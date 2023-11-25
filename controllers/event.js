const { validationResult } = require('express-validator');

const Event = require('../models/event');
const User = require('../models/user');

exports.getEvents = async (req, res, next) => {
  try {
    const events = await Event.find();
    console.log(events);
    res.status(200).json({
      events: events,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Something went wrong',
    });
  }
};

exports.createEvent = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({
      message: 'Validation failed',
      errors: errors.array(),
    });
  }

  console.log(req.body);
  const event = new Event({
    title: req.body.title,
    description: req.body.description,
    time: req.body.time,
    date: req.body.date,
    creatorId: req.userId,
  });
  try {
    const createdEvent = await event.save();
    const user = await User.findById(req.userId);
    user.events.push(event);
    await user.save();
    res.status(201).json({
      message: 'Event created successfully',
      event: createdEvent,
      creator: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Something went wrong',
    });
  }
};

exports.deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      const error = new Error('Event not found');
      error.statusCode = 404;
      return next(error);
    }

    await Event.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: 'Event deleted successfully',
    });
  } catch (error) {
    console.log(error);
    const err = new Error('Something went wrong');
    err.statusCode = 500;
    return next(err);
  }
};
