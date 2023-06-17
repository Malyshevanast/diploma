const { hashSync } = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert('user', [
      {
        username: 'admin',
        email: 'admin@gmail.com',
        password: hashSync('1111', 10),
        role: 'admin',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('service', [
      {
        name: 'индивидуальная',
        description: '',
        price: 200,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'свадебная',
        description: '',
        price: 150,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'лав стори',
        description: '',
        price: 250,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'тематическая',
        description: '',
        price: 1000,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('user', null, {});
    await queryInterface.bulkDelete('service', null, {});
  },
};
