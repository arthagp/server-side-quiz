const express = require("express");
const router = express.Router();
const QuizController = require("../controllers/quizController");
const authentication = require('../middlewares/authentication')

router.post('/create-quiz', authentication, QuizController.createQuiz)
router.get('/all-quiz', QuizController.getAllQuiz)
router.put('/edit-quiz/:quizId', authentication, QuizController.editQuizById)
router.post('/add-question/:quizId', authentication, QuizController.addQuestion)
router.get('/get-detail/:quizId', authentication, QuizController.detailQuizz)
router.get('/my-quizz', authentication, QuizController.getAllQuizByUserId)
router.post('/questions/:questionId/answers', authentication, QuizController.addAnswer)

module.exports = router;
