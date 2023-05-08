'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('payment', {
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
      business_partner_id: {
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
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.addConstraint(
      'payment',{
        fields: ['createdby'],
        type: 'foreign key',
        name: 'userCr_bp_const',
        references: { //Required field
          table: 'user',
          field: 'user_id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
    );
    await queryInterface.addConstraint(
      'payment',{
        fields: ['updatedby'],
        type: 'foreign key',
        name: 'userUp_bp_const',
        references: { //Required field
          table: 'user',
          field: 'user_id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('payment');
  }
};