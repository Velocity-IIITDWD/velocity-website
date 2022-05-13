const { body } = require('express-validator')

exports.addStudent = [
  // name validation
  body('name')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long')
    .isLength({ max: 30 })
    .withMessage('Name must be at most 30 characters long')
    .isString()
    .withMessage('Name must be alphabetic')
    .trim(),

  // registrationNumber validation
  body('registrationNumber')
    .isLength({ min: 6 })
    .withMessage('Registration number must be at least 6 characters long')
    .isLength({ max: 9 })
    .withMessage('Registration number must be at most 9 characters long')
    .isAlphanumeric()
    .withMessage('Registration number must be alphanumeric')
    .toUpperCase()
    .trim(),

  // password validation
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .isLength({ max: 30 })
    .withMessage('Password must be at most 30 characters long')
    .trim(),
]

exports.updateStudent = [
  // name validation
  body('name')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long')
    .isLength({ max: 30 })
    .withMessage('Name must be at most 30 characters long')
    .isString()
    .withMessage('Name must be alphabetic')
    .trim(),

  // password validation
  body('password')
    .optional()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .isLength({ max: 30 })
    .withMessage('Password must be at most 30 characters long')
    .trim(),
]
