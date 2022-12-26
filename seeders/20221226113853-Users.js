'use strict';
const { 
  randUserName,
  randPassword
} = require('@ngneat/falso');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const fakeUsers=[]
    for (let i=0 ; i<100; i++){
      fakeUsers.push({
          userName:randUserName(),
          password:randPassword(),
          createdAt: new Date(),
          updatedAt: new Date(),
      })
    }
    await queryInterface.bulkInsert('Users', fakeUsers, {});
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
