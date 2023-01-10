'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  invoice.init({
    invoice_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    businesspartner_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'business_partner',
        key: 'businesspartner_id'
      } 
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
    isactive:{
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    fakturno: DataTypes.STRING,
    duedate: DataTypes.DATE,
    paymentdate: DataTypes.DATE,
    isactive: DataTypes.BOOLEAN,
    grandtotal: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'invoice',
    underscored: true,
  });
  return invoice;
};