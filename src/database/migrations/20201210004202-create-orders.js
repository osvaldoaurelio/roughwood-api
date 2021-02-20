'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => await queryInterface.createTable('orders', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.INTEGER,
      references: { model: 'users', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    customer_id: {
      type: Sequelize.INTEGER,
      references: { model: 'customers', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    initial_date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    final_date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    labor_cost: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    total_price: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    discount: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
    status: {
      type: Sequelize.ENUM,
      values: ['late', 'pending', 'progress', 'done', 'invoiced'],
      defaultValue: 'pending',
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

  down: async (queryInterface, Sequelize) => await queryInterface.dropTable('orders'),
};
