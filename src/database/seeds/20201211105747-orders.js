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
      price: 50,
      discount: 0.07,
      status: 'pending',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      user_id: sample_id(await User.findAll({ ...select_id, ...not_admin })),
      customer_id: sample_id(await Customer.findAll(select_id)),
      description: 'Order de exemplo preenchida no seed 2',
      initial_date: new Date(2020, 9, 11, 13),
      final_date: new Date(2020, 10, 11, 13),
      price: 100,
      discount: 0.1,
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
      price: 250,
      discount: 0.13,
      status: 'pending',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      user_id: sample_id(await User.findAll({ ...select_id, ...not_admin })),
      customer_id: sample_id(await Customer.findAll(select_id)),
      description: 'Order de exemplo preenchida no seed 4',
      initial_date: new Date(2020, 7, 31, 10),
      final_date: new Date(2020, 9, 1, 10),
      price: 150,
      discount: 0.11,
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
      price: 200,
      discount: 0.05,
      status: 'pending',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ], {}),

  down: async (queryInterface, Sequelize) => await queryInterface.bulkDelete('orders', null, {}),
};
