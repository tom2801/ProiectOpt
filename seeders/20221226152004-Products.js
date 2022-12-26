'use strict';
const {
  randProductName
}=require('@ngneat/falso')
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    const fakeProducts=[]
    for (let i=0 ; i<100; i++){
      fakeProducts.push({
         productName:randProductName(),
         price:String(Math.floor(Math.random() * 100)),
         createdAt: new Date(),
         updatedAt: new Date(),
         
      })
    }
    await queryInterface.bulkInsert('Products', fakeProducts, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
