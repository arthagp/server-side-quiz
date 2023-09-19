const express = require("express");
const router = express.Router();
const QuizController = require("../controllers/quizController");
const authentication = require('../middlewares/authentication')

router.post('/create-quiz', authentication, QuizController.createQuiz)
router.get('/all-quiz', QuizController.getAllQuiz)
router.put('/edit-quiz/:quizId', authentication, QuizController.editQuizById)
router.delete('/delete-quiz/:quizId', authentication, QuizController.deleteQuizById)
router.get('/get-detail/:quizId', authentication, QuizController.detailQuizz)
router.get('/my-quizz', authentication, QuizController.getAllQuizByUserId)
// question :
router.post('/add-question/:quizId', authentication, QuizController.addQuestion)
router.put('/edit-question/:questionId', authentication, QuizController.editQuestion)
// answer :
router.post('/questions/:questionId/answers', authentication, QuizController.addAnswer)
router.put('/questions/:answerId/answers', authentication, QuizController.editAnswer)

module.exports = router;
