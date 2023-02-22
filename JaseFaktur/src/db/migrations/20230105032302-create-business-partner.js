'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('business_partner', {
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
      description: {
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
      'business_partner',{
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
      'business_partner',{
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
    await queryInterface.dropTable('business_partner');
  }
};