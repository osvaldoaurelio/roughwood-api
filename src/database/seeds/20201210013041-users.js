'use strict';

const { hash } = require('bcryptjs');

const { genColor, genInitials } = require("../../utils");

module.exports = {
  up: async (queryInterface, Sequelize) => await queryInterface.bulkInsert('users', [
    {
      name: 'Osvaldo Aurélio',
      username: 'admin',
      password: await hash('admin', 8),
      address: 'Rua 1',
      phone: '33620001',
      color: genColor(),
      initials: genInitials('Osvaldo Aurélio'),
      is_active: true,
      is_admin: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Aurélio Ribeiro',
      username: 'funcionario1',
      password: await hash('123456', 8),
      address: 'Rua 1',
      phone: '33620001',
      color: genColor(),
      initials: genInitials('Aurélio Ribeiro'),
      is_active: false,
      is_admin: false,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Ribeiro Silva',
      username: 'funcionario2',
      password: await hash('123456', 8),
      address: 'Rua 1',
      phone: '33620001',
      color: genColor(),
      initials: genInitials('Ribeiro Silva'),
      is_active: false,
      is_admin: false,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ], {}),

  down: async (queryInterface, Sequelize) => await queryInterface.bulkDelete('users', null, {}),
};
