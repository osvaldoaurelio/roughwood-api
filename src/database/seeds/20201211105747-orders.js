'use strict';

require('../../database');

const User = require('../../models/User');
const Customer = require('../../models/Customer');

const { sample_id } = require('../../utils');

const select_id = { attributes: ['id'] };
const not_admin = { where: { is_admin: false } };

module.exports = {
  up: async (queryInterface, Sequelize) => await queryInterface.bulkInsert('orders', [
    {
      user_id: sample_id(await User.findAll({ ...select_id, ...not_admin })),
      customer_id: sample_id(await Customer.findAll(select_id)),
      description: 'Order de exemplo preenchida no seed 1',
      initial_date: new Date(2020, 10, 1, 12),
      final_date: new Date(2020, 11, 1, 12),
      labor_cost: 50,
      total_price: 250,
      status: 'done',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      user_id: sample_id(await User.findAll({ ...select_id, ...not_admin })),
      customer_id: sample_id(await Customer.findAll(select_id)),
      description: 'Order de exemplo preenchida no seed 2',
      initial_date: new Date(2020, 9, 11, 13),
      final_date: new Date(2020, 10, 11, 13),
      labor_cost: 100,
      total_price: 350,
      status: 'pending',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      user_id: sample_id(await User.findAll({ ...select_id, ...not_admin })),
      customer_id: sample_id(await Customer.findAll(select_id)),
      description: 'Order de exemplo preenchida no seed 3',
      initial_date: new Date(2020, 8, 21, 11),
      final_date: new Date(2020, 9, 21, 11),
      labor_cost: 250,
      total_price: 400,
      status: 'invoiced',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      user_id: sample_id(await User.findAll({ ...select_id, ...not_admin })),
      customer_id: sample_id(await Customer.findAll(select_id)),
      description: 'Order de exemplo preenchida no seed 4',
      initial_date: new Date(2020, 7, 31, 10),
      final_date: new Date(2020, 9, 1, 10),
      labor_cost: 150,
      total_price: 400,
      status: 'pending',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      user_id: sample_id(await User.findAll({ ...select_id, ...not_admin })),
      customer_id: sample_id(await Customer.findAll(select_id)),
      description: 'Order de exemplo preenchida no seed 5',
      initial_date: new Date(2020, 6, 1, 9),
      final_date: new Date(2020, 7, 1, 9),
      labor_cost: 200,
      total_price: 500,
      status: 'progress',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ], {}),

  down: async (queryInterface, Sequelize) => await queryInterface.bulkDelete('orders', null, {}),
};
