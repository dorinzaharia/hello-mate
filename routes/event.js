const express = require('express');

const eventController = require('../controllers/event');

const router = express.Router();

router.get('/', eventController.getEvents);
router.post('/', eventController.createEvent);

module.exports = router;
