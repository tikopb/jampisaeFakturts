'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('business_partners', {
      businesspartner_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      value: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      descriptoin: {
        type: Sequelize.STRING
      },
      isactive: {
        type: Sequelize.BOOLEAN
      },
      createdby: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      updatedby: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      dnnominal: {
        type: Sequelize.INTEGER
      },
      cnnominal: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('business_partners');
  }
};