const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
    },
    events: [
      {
        attendanceType: { type: String, enum: ['organizer', 'host', 'player'], default: 'organizer', required: true },
      },
    ],
  },
  { timestamp: true }
);

module.exports = mongoose.model('User', userSchema);
