'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class business_partner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
    }
  }
  business_partner.init({
    business_partner_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    value: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    isactive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    createdby:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'user_id'
      } 
    },
    updatedby: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'user_id'
      } 
    },
    dnnominal: DataTypes.INTEGER,
    cnnominal: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'business_partner',
    tableName: 'business_partner',
    underscored: true,
    freezeTableName: true,
  });
  return business_partner;
};