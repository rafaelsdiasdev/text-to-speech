"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("comments", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      text: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      voice: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      accept: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      name_archive: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("comments");
  },
};
