'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => await queryInterface.createTable('users', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    address: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: '',
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: '',
    },
    color: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: '',
    },
    initials: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: '',
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      field: 'is_active',
      allowNull: true,
      defaultValue: false,
    },
    isAdmin: {
      type: Sequelize.BOOLEAN,
      field: 'is_admin',
      allowNull: true,
      defaultValue: false,
    },
    createdAt: {
      type: Sequelize.DATE,
      field: 'created_at',
      allowNull: false,
    },
    updatedAt: {
      type: Sequelize.DATE,
      field: 'updated_at',
      allowNull: false,
    },
  }),

  down: async (queryInterface, Sequelize) => await queryInterface.dropTable('users'),
};
