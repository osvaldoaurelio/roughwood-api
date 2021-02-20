'use strict';

const { hash } = require('bcryptjs');

const { genColor, genInitials } = require("../../utils");

module.exports = {
  up: async (queryInterface, Sequelize) => await queryInterface.bulkInsert('users', [
    {
      name: 'Drauzio Pablo',
      username: 'admin',
      password: await hash('admin', 8),
      address: 'Rua 1',
      phone: '33620001',
      color: genColor(),
      initials: genInitials('Drauzio Pablo'),
      is_active: true,
      is_admin: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Gleydson Firmino',
      username: '123456',
      password: await hash('123456', 8),
      address: 'Rua 1',
      phone: '33620001',
      color: genColor(),
      initials: genInitials('Gleydson Firmino'),
      is_active: false,
      is_admin: false,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Henrique Richarllysson',
      username: '654321',
      password: await hash('654321', 8),
      address: 'Rua 1',
      phone: '33620001',
      color: genColor(),
      initials: genInitials('Henrique Richarllysson'),
      is_active: false,
      is_admin: false,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ], {}),

  down: async (queryInterface, Sequelize) => await queryInterface.bulkDelete('users', null, {}),
};
