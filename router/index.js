const express = require('express')
const router = express.Router()

const userRouter = require('./user')
const quizRouter = require('./quizz')
const userResponse = require('./userResponse')

router.use(userRouter)
router.use(quizRouter)
router.use(userResponse)

module.exports = router