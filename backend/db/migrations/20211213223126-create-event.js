'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      dayOfYear: {
        type: Sequelize.NUMERIC
      },
      date: {
        type: Sequelize.DATE
      },
      timeInMS: {
        type: Sequelize.NUMERIC
      },
      timeOfEvent: {
        type: Sequelize.STRING
      },
      weekday: {
        type: Sequelize.NUMERIC
      },
      month: {
        type: Sequelize.NUMERIC
      },
      dayOfMonth: {
        type: Sequelize.NUMERIC
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
    return queryInterface.dropTable('Events');
  }
};