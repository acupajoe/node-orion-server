'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Locations', {
      location_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      timestamp: {
        type: Sequelize.INTEGER
      },
      user: {
        index: true,
        type: Sequelize.STRING(256)
      },
      device: {
        index: true,
        type: Sequelize.STRING(256)
      },
      latitude: {
        type: Sequelize.FLOAT
      },
      longitude: {
        type: Sequelize.FLOAT
      },
      accuracy: {
        type: Sequelize.INTEGER
      },
      battery: {
        type: Sequelize.INTEGER
      },
      trigger: {
        type: Sequelize.STRING(1)
      },
      connection: {
        type: Sequelize.STRING(1)
      },
      tracker_id: {
        type: Sequelize.STRING(2)
      },
      address: {
        type: Sequelize.STRING(256)
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Locations');
  }
};