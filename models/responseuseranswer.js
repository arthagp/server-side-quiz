'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ResponseUserAnswer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      this.belongsTo(models.Question, {
        foreignKey: 'question_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  ResponseUserAnswer.init({
    user_id: DataTypes.INTEGER,
    question_id: DataTypes.INTEGER,
    user_answer: DataTypes.STRING,
    is_corect: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ResponseUserAnswer',
  });
  return ResponseUserAnswer;
};