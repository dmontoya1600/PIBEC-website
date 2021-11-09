'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: process.env.CHURCH_EMAIL,
        username: process.env.CHURCH_USER,
        hashedPassword: bcrypt.hashSync(process.env.CHURCH_PASSWORD),
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: [process.env.CHURCH_USER] }
    }, {});
  }
};
