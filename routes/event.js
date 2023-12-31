const express = require('express');

const eventController = require('../controllers/event');
const isAuth = require('../middleware/auth');

const router = express.Router();

router.get('/', isAuth, eventController.getEvents);
router.post('/', isAuth, eventController.createEvent);
router.delete('/:id', isAuth, eventController.deleteEvent);

module.exports = router;
