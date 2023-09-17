const { Quizz, User, Question, Answer, ResponseUserAnswer } = require('../models');

class QuizController {
    static async createQuiz(req, res) {
        try {
            const { id } = req.userLogged;
            const { title, description } = req.body
            const response = await Quizz.create({ user_id: id, title, description })
            if (response) {
                res.status(201).json({ message: 'create Quiz succes', data: response })
            } else {
                res.status(400).json({ message: `can't create quizz` })
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Internal Server Error' })
        }
    }

    static async getAllQuiz(req, res) {
        try {
            const { title } = req.query;
            const where = {};

            const limit = +req.query.limit || 10;
            const page = +req.query.page || 1;
            const offset = (page - 1) * limit;

            if (title) {
                where.title = { [Op.iLike]: `%${title}%` };
            }
            const { count, rows } = await Quizz.findAndCountAll({
                where,
                limit,
                offset,
                include: [
                    {
                        model: User,
                        attributes: ["username"],
                    },
                ],
            });

            res.status(200).json({
                totalItems: count,
                data: rows,
                currentPage: page,
                totalPages: Math.ceil(count / limit),
            });
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Internal Server Error' })
        }
    }

    static async detailQuizz(req, res) {
        try {
          const { quizId } = req.params;
          const response = await Quizz.findOne({
            where: { id: quizId },
            include: [
              {
                model: Question,
                order: [["id", "ASC"]], // Mengurutkan pertanyaan berdasarkan ID secara ascending
              },
            ],
          });
          if (response) {
            res.status(200).json({ message: 'detail quizz', data: response });
          } else {
            res.status(404).json({ message: 'Not Found' });
          }
        } catch (error) {
          console.log(error);
          res.status(500).json({ message: 'Internal Server Error' });
        }
      }
      

    static async editQuizById(req, res) {
        try {
            const { quizId } = req.params;
            const { title, description } = req.body;
            const quiz = await Quizz.findByPk(quizId);
            if (!quiz) {
                res.status(404).json({ error: 'Kuis tidak ditemukan.' });
            } else {
                quiz.title = title;
                quiz.description = description;
                await quiz.save();
                res.status(200).json({ message: 'edit quizz succes', data: quiz });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Gagal mengedit kuis.' });
        }
    }

    // deleteQuizz not yet
    // <<<<<

    static async addQuestion(req, res) {
        try {
            const { quizId } = req.params;
            const { questionText } = req.body;
            const quiz = await Quizz.findByPk(quizId);
            if (!quiz) {
                res.status(404).json({ error: 'Kuis tidak ditemukan.' });
            } else {
                const question = await Question.create({ questions_text: questionText, quiz_id: quizId });
                res.status(201).json({ message: 'create question succes', data: question });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Gagal menambahkan pertanyaan ke kuis.' });
        }
    }

    //edit question, not yet
    // >>>>>
    //

    static async addAnswer(req, res) {
        try {
            const { questionId } = req.params;
            const { answerText } = req.body;
            const question = await Question.findOne({ where: { id: questionId } });
            if (!question) {
                res.status(404).json({ error: 'Pertanyaan tidak ditemukan.' });
            } else {
                const answer = await Answer.create({ answer_text: answerText, question_id: questionId });
                res.status(201).json({ message: 'add answer succes', data: answer });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Gagal menambahkan jawaban ke pertanyaan.' });
        }
    }


    //edit asnwer, not yet
    // >>>>>
    //

}

module.exports = QuizController