'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init({
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    isactive: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'user',
    underscored: true
  });
  return user;
};