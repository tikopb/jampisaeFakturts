'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('business_partner', [
      {value:`BP-1`,name : `IndoPart`,description: `sparepart for cycling`, created_at: new Date(), updated_at: new Date(), createdby: 1, updatedby: 1},
      {value:`BP-2`,name : `IndoPart V2`,description: `sparepart for labotory`, created_at: new Date(), updated_at: new Date(), createdby: 1, updatedby: 1},
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('business_partner', null, {});
  }
};
 