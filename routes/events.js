// import third party modules
const express = require('express')

// import controllers
const eventController = require('../controllers/events')

// import validators
const eventValidation = require('../validators/events')

const router = express.Router()

router.get('/', eventController.getEvents)
router.get('/:eventId', eventController.getEvent)

router.post('/new', eventValidation.createEvent, eventController.createEvent)
router.put(
  '/:eventId',
  eventValidation.createEvent,
  eventController.updateEvent
) // validation logic is same as createEvent

router.delete('/:eventId', eventController.deleteEvent)

module.exports = router
