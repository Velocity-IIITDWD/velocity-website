const { validationResult } = require('express-validator')

const Event = require('../models/event')

//  @route   GET get event
exports.getEvents = async (req, res, next) => {
  try {
    const events = await Event.find()
    res.status(200).json({ message: 'Events fetched!', events })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

// @route   GET an event
exports.getEvent = async (req, res, next) => {
  const eventId = req.params.eventId
  try {
    const event = await Event.findById(eventId)
    if (!event) {
      const error = new Error('Event not found')
      error.statusCode = 404
      throw error
    }
    res.status(200).json({ message: 'Event fetched!', event })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

// @route   POST create event
exports.createEvent = async (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.')
    error.statusCode = 422
    error.data = errors.array()
    return next(error)
  }

  const title = req.body.title
  const description = req.body.description
  const eventDate = req.body.eventDate
  const poster = req.body.poster || ''
  const images = req.body.images || []
  const winners = req.body.winners || []

  const event = new Event({
    title,
    description,
    eventDate,
    poster,
    images,
    winners,
  })

  try {
    const result = await event.save()
    res.status(201).json({ message: 'Event created!', event: result })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

// @route   PUT update event
exports.updateEvent = async (req, res, next) => {
  const eventId = req.params.eventId

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.')
    error.statusCode = 422
    error.data = errors.array()
  }

  const title = req.body.title
  const description = req.body.description
  const eventDate = req.body.eventDate
  const poster = req.body.poster || ''
  const images = req.body.images || []
  const winners = req.body.winners || []

  try {
    const event = await Event.findById(eventId)
    if (!event) {
      const error = new Error('Could not find event.')
      error.statusCode = 404
      return next(error)
    }

    event.title = title
    event.description = description
    event.eventDate = eventDate
    event.poster = poster
    event.images = images
    event.winners = winners

    const result = await event.save()
    res.status(201).json({ message: 'Event updated!', event: result })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

// @route   DELETE delete event
exports.deleteEvent = async (req, res, next) => {
  const eventId = req.params.eventId
  try {
    const event = await Event.findById(eventId)
    if (!event) {
      const error = new Error('Could not find event.')
      error.statusCode = 404
      return next(error)
    }
    await event.remove()
    res.status(200).json({ message: 'Event deleted!' })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}
