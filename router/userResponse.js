const express = require("express");
const router = express.Router();
const UserResponseController = require("../controllers/userResponseController");
const authentication = require('../middlewares/authentication')

router.post('/response-user/:questionId', authentication, UserResponseController.userResponseAnswer)
router.get('/quizzes/:quizId/score', authentication, UserResponseController.calculateQuizScore);
router.delete('/scoreboard/:quizId', authentication, UserResponseController.deleteScoreBoard)
router.delete('/response-user/:quizId', authentication, UserResponseController.deleteUserResponseAnswer)
router.get('/scoreboard/:quizId', authentication, UserResponseController.getAlreadyScoreBoard)

module.exports = router;
