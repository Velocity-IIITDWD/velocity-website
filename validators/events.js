const { body } = require('express-validator')

exports.createEvent = [
  // title validation
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 5 })
    .withMessage('Title must be at least 5 characters long')
    .isLength({ max: 100 })
    .withMessage('Title cannot be more than 100 characters long')
    .isAscii()
    .withMessage('Title must be ascii characters only')
    .trim(),

  // description validation
  body('description')
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ min: 10 })
    .withMessage('Description must be at least 5 characters long')
    .isLength({ max: 1000 })
    .withMessage('Description cannot be more than 1000 characters long')
    .isAscii()
    .withMessage('Description must be ascii characters only')
    .trim(),

  // eventDate validation
  body('eventDate')
    .notEmpty()
    .withMessage('Event date is required')
    .isISO8601()
    .withMessage('Event date must be in ISO 8601 format [Date]'),

  // poster validation
  body('poster').optional().isURL().withMessage('Poster must be a valid URL'),

  // images validation
  body('images').optional().isArray().withMessage('Images must be an array'),

  // image url validation
  body('images.*').optional().isURL().withMessage('Image must be a valid URL'),

  // winners validation
  body('winners').optional().isArray().withMessage('Winners must be an array'),

  // winner detail validation
  body('winners.*')
    .optional()
    .isString()
    .withMessage('Winner must be a string'),
]
