const { Quizz, ResponseUserAnswer, Question, Answer, ScoreBoard } = require('../models')

class UserResponseController {
  // ketika sudah selesai semua kamu coba cek melalui calculate dengan Quizz > Question > User Response = setelah itu simpan score di scoreBoard, coba dulu seperti ini.

  static async userResponseAnswer(req, res) {
    try {
      const { id } = req.userLogged;
      const { questionId } = req.params;
      const { userAnswer } = req.body;

      const findQuestion = await Question.findOne({
        where: { id: questionId },
        include: [Answer], // Pastikan Anda memuat model Answer
      });

      // res.json({findQuestion})

      if (!findQuestion) {
        return res.status(404).json({ message: 'Question not found' });
      } else {
        // Mengambil jawaban yang sesuai dari pertanyaan tertentu
        const correctAnswer = findQuestion.Answers[0].answer_text.toLowerCase();
        const user_answer = userAnswer.toLowerCase();
        const isCorrect = correctAnswer === user_answer ? 1 : 0;

        // Mengambil quiz_id dari pertanyaan (Question)
        const quizId = findQuestion.quiz_id;

        // Lakukan operasi penciptaan respons pengguna (ResponseUserAnswer)
        const response = await ResponseUserAnswer.create({
          user_id: id,
          question_id: questionId,
          user_answer: userAnswer,
          is_corect: isCorrect,
          quiz_id: quizId, // Menggunakan quiz_id yang telah diambil dari pertanyaan
        });

        if (response) {
          return res.status(201).json({ message: 'User response created', data: response });
        } else {
          return res.status(400).json({ message: 'Failed to create answer' });
        }
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
        where: { user_id: id },
        include: [
          {
            model: Question,
            where: { quiz_id: quizId },
          },
        ],
      });

      // res.json({userResponses})

      // Menghitung nilai berdasarkan respons pengguna
      let score = 0;
      userResponses.forEach((response) => {
        if (response.is_corect === 1) {
          score += 1;
        }
      });

      // Menghitung jumlah pertanyaan dalam kuis tertentu
      const totalQuestions = await Question.count({ where: { quiz_id: quizId } });


      // Menyimpan nilai total_score ke dalam tabel ScoreBoard
      const scoreCalculate = score / totalQuestions * 100
      const pembulatanScore = Math.ceil(scoreCalculate)
      const scoreboardEntry = await ScoreBoard.create({
        user_id: id,
        quiz_id: quizId,
        score: pembulatanScore,
      });

      res.status(200).json({ message: 'Quiz score calculated', data: scoreboardEntry.score });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async deleteUserResponseAnswer(req, res) {
    try {
      const { id } = req.userLogged;
      const { quizId } = req.params;
      const response = await ResponseUserAnswer.destroy({
        where: { user_id: id, quiz_id: quizId }
      })
      if (response) {
        res.status(200).json({ message: 'Delete User Response succes' })
      } 
    } catch (error) {
      console.log(error)
    }
  }

  static async deleteScoreBoard(req, res) {
    try {
      const { id } = req.userLogged;
      const { quizId } = req.params;
      const response = await ScoreBoard.destroy({
        where: { user_id: id, quiz_id: quizId }
      })
      if (response) {
        res.status(200).json({ message: 'Delete Score succes' })
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getAlreadyScoreBoard(req, res) {
    try {
      const { id } = req.userLogged;
      const { quizId } = req.params;
      console.log(quizId, id, '<><><><><<')
      const data = await ScoreBoard.findOne({ where: { user_id: id, quiz_id: quizId } })
      if (data) {
        res.status(200).json({ message: 'Found', data })
      } else {
        res.status(400).json({ message: 'Not Found' })
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = UserResponseController