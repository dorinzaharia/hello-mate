const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    venueId: { type: Schema.Types.ObjectId, ref: 'Venue' },
    price: {
      type: String,
      required: true,
    },
    comments: [{ body: String, date: Date, authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true } }],
    Repeats: {
      type: Boolean,
    },
    price: {
      type: String,
      required: true,
    },
    hostId: { type: Schema.Types.ObjectId, ref: 'User' },
    numberOfPlayers: {
      type: Number,
      required: true,
    },
    numberOfPlayersPerTeam: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model('Event', eventSchema);
