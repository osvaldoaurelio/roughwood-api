'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => await queryInterface.bulkInsert('customers', [
    {
      cpf: '12345678901',
      name: 'Cliente 1',
      address: 'Rua 1',
      phone: '33620001',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      cpf: '12345678902',
      name: 'Cliente 2',
      address: 'Rua 2',
      phone: '33620002',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ], {}),

  down: async (queryInterface, Sequelize) => await queryInterface.bulkDelete('customers', null, {}),
};
