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
      business_partner.belongsTo(models.user);
      models.user.hasyMany(business_partner);
    }
  }
  business_partner.init({
    businesspartner_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    value: DataTypes.STRING,
    name: DataTypes.STRING,
    descriptoin: DataTypes.STRING,
    isactive: DataTypes.BOOLEAN,
    createdby:{
      type: DataTypes.INTEGER,
      references: {
        model: user,
        key: 'user_id'
      } 
    },
    updatedby: {
      type: DataTypes.INTEGER,
      references: {
        model: user,
        key: 'user_id'
      } 
    },
    dnnominal: DataTypes.INTEGER,
    cnnominal: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'business_partner',
    underscored: true,
  });
  return business_partner;
};