'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Images', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      location: {
        type: Sequelize.STRING
      },
      comment: {
        type: Sequelize.STRING
      },
      subLocation: {
        type: Sequelize.STRING
      },
      arrayId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Arrays'
        }
      },
      imageUrl: {
        type: Sequelize.STRING(500),
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Images');
  }
};
