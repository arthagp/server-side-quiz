const { ResponseUserAnswer, Question, Answer } = require('../models')

class UserResponseController {
    static async userResponseAnswer(req, res) {
        try {
          const { id } = req.userLogged;
          const { questionId } = req.params;
          const { userAnswer } = req.body;
      
          const findAnswer = await Question.findOne({ where: { id: questionId }, include: [Answer] });
      
          if (!findAnswer) {
            return res.status(404).json({ message: 'Question not found' });
          }
      
          const correctAnswer = findAnswer.Answers[0].answer_text.toLowerCase();
          const user_answer = userAnswer.toLowerCase();
          const isCorrect = correctAnswer === user_answer ? 1 : 0;
      
          const response = await ResponseUserAnswer.create({ user_id: id, question_id: questionId, user_answer: userAnswer, is_corect: isCorrect });
      
          if (response) {
            return res.status(201).json({ message: 'User response created', data: response });
          } else {
            return res.status(400).json({ message: 'Failed to create answer' });
          }
        } catch (error) {
          console.error(error);
          return res.status(500).json({ error: 'Internal server error' });
        }
      }
      
      static async calculateQuizScore(req, res) {
        try {
          const { id } = req.userLogged;
          const { quizId } = req.params;
      
          // Mengambil semua respons pengguna untuk kuis tertentu
          const userResponses = await ResponseUserAnswer.findAll({
            where: { user_id: id, id: quizId },
          });
      
          // Menghitung nilai berdasarkan respons pengguna
          let score = 0;
          userResponses.forEach((response) => {
            if (response.is_corect === 1) {
              score += 1;
            }
          });
      
          res.status(200).json({ message: 'Quiz score calculated', data: { score } });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal server error' });
        }
      }
      
}

module.exports = UserResponseController