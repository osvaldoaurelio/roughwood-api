'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>  await queryInterface.createTable('stock_materials', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    price: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: '',
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      field: 'is_active',
      allowNull: false,
      defaultValue: true,
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

  down: async (queryInterface, Sequelize) =>  await queryInterface.dropTable('stock_materials'),
};
