const { validationResult } = require('express-validator');

const Event = require('../models/event');

exports.getEvents = async (req, res, next) => {
  try {
    const events = await Event.find();
    console.log(events)
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
  const title = req.body.title;
  const description = req.body.description;
  const time = req.body.time;
  const date = req.body.date;
  const location = req.body.location;
  const venueId = req.body.venueId;
  const price = req.body.price;
  const numberOfPlayers = req.body.numberOfPlayers;
  const numberOfPlayersPerTeam = req.body.numberOfPlayersPerTeam;

  const event = new Event({
    title: title,
    description: description,
    time: time,
    date: date,
    location: location,
    venueId: venueId,
    price: price,
    numberOfPlayers: numberOfPlayers,
    numberOfPlayersPerTeam: numberOfPlayersPerTeam,
  });
  try {
    const result = await event.save();
    res.status(201).json({
      message: 'Event created successfully',
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Something went wrong',
    });
  }
};
