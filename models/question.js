'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Answer, {
        foreignKey: 'question_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      this.hasMany(models.ResponseUserAnswer, {
        foreignKey: 'question_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      this.belongsTo(models.Quizz, {
        foreignKey: 'quiz_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  Question.init({
    quiz_id: DataTypes.INTEGER,
    questions_text: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Question',
  });
  return Question;
};