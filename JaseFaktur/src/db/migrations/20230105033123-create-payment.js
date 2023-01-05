'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('payments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      payment_id: {
        type: Sequelize.INTEGER
      },
      invoice_id: {
        type: Sequelize.INTEGER
      },
      businesspartner_id: {
        type: Sequelize.INTEGER
      },
      createdby: {
        type: Sequelize.INTEGER
      },
      updatedby: {
        type: Sequelize.INTEGER
      },
      isactive: {
        type: Sequelize.BOOLEAN
      },
      dokumentno: {
        type: Sequelize.STRING
      },
      paymentdate: {
        type: Sequelize.DATE
      },
      isactive: {
        type: Sequelize.BOOLEAN
      },
      grandtotal: {
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
    await queryInterface.dropTable('payments');
  }
};