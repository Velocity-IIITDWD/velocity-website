const express = require('express')
const router = express.Router()

// import controllers
const studentController = require('../controllers/students')

// import validators
const studentValidator = require('../validators/students')

router.get('/', studentController.getStudents)
router.get('/:registrationNumber', studentController.getStudent)

router.post('/add', studentValidator.addStudent, studentController.addStudent)
router.put(
  '/:registrationNumber',
  studentValidator.updateStudent,
  studentController.updateStudent
) // validation logic is same as addStudent

router.delete('/:registrationNumber', studentController.deleteStudent)

module.exports = router
