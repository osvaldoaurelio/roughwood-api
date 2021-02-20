'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => await queryInterface.createTable('customers', {
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
    cpf: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
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

  down: async (queryInterface, Sequelize) => await queryInterface.dropTable('customers'),
};
