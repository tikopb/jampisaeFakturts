'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  payment.init({
    payment_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    invoice_id: {
      type: DataTypes.INTEGER,
      references: {
        model: invoice,
        key: 'invoice_id'
      } 
    },
    businesspartner_id: {
      type: DataTypes.INTEGER,
      references: {
        model: business_partner,
        key: 'businesspartner_id'
      } 
    },
    createdby:{
      type: DataTypes.INTEGER,
      references: {
        model: user,
        key: 'user_id'
      } 
    },
    isactive: DataTypes.BOOLEAN,
    dokumentno: DataTypes.STRING,
    paymentdate: DataTypes.DATE,
    isactive: DataTypes.BOOLEAN,
    grandtotal: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'payment',
    underscored: true,
  });
  return payment;
};