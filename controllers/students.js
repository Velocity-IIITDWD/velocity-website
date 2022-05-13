const { validationResult } = require('express-validator')
const brcypt = require('bcryptjs')

const Student = require('../models/student')

// @route GET get students
exports.getStudents = async (req, res, next) => {
  const page = req.query.page || 1
  const perPage = 15

  try {
    const totalStudents = await Student.find().countDocuments()
    const students = await Student.find()
      .skip((page - 1) * perPage)
      .limit(perPage)

    res.status(200).json({
      message: 'Students fetched!',
      students,
      totalStudents,
      pages: Math.ceil(totalStudents / perPage),
      currentPage: page,
    })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

// @route GET get student by registration number
exports.getStudent = async (req, res, next) => {
  const registrationNumber = req.params.registrationNumber.toUpperCase()

  try {
    const student = await Student.findOne({ registrationNumber })

    if (!student) {
      const error = new Error('Could not find student.')
      error.statusCode = 404
      throw error
    }

    res.status(200).json({ message: 'Student fetched!', student })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

// @route   POST add student
exports.addStudent = async (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.')
    error.statusCode = 422
    error.data = errors.array()
    return next(error)
  }

  const name = req.body.name
  const registrationNumber = req.body.registrationNumber
  const password = req.body.password

  try {
    const studentExists = await Student.findOne({ registrationNumber })

    if (studentExists) {
      const error = new Error(
        `Student already exists with ${registrationNumber} registration number.`
      )
      error.statusCode = 409
      throw error
    }

    const hashedPassword = await brcypt.hash(password, 12)
    const student = new Student({
      name,
      registrationNumber,
      password: hashedPassword,
    })

    const result = await student.save()
    res.status(201).json({ message: 'Student created!', studentId: result._id })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

// @route PUT update student password and name
exports.updateStudent = async (req, res, next) => {
  const registrationNumber = req.params.registrationNumber.toUpperCase()
  const name = req.body.name
  let password = req.body.password

  try {
    const student = await Student.findOne({ registrationNumber })

    if (!student) {
      const error = new Error(
        'Could not find student with registration number: ' + registrationNumber
      )
      error.statusCode = 404
      throw error
    }

    student.name = name

    if (password) {
      hashedPassword = await brcypt.hash(password, 12)
      student.password = hashedPassword
    }

    const result = await student.save()
    res.status(200).json({ message: 'Student updated!', studentId: result._id })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

// @route DELETE delete student
exports.deleteStudent = async (req, res, next) => {
  const registrationNumber = req.params.registrationNumber.toUpperCase()

  try {
    const student = await Student.findOneAndDelete({ registrationNumber })

    if (!student) {
      const error = new Error('Could not find student.')
      error.statusCode = 404
      throw error
    }

    res.status(200).json({ message: 'Student deleted!' })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}
