'use strict';

const { genColor, genInitials } = require("../../utils");

module.exports = {
  up: async (queryInterface, Sequelize) => await queryInterface.bulkInsert('customers', [
    {
      cpf: '12345678901',
      name: 'Clodoaldo Guimarães',
      address: 'Rua 1',
      phone: '33620001',
      color: genColor(),
      initials: genInitials('Clodoaldo Guimarães'),
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      cpf: '12345678902',
      name: 'Sebastião Ignácio',
      address: 'Rua 2',
      phone: '33620002',
      color: genColor(),
      initials: genInitials('Sebastião Ignácio'),
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      cpf: '12345678903',
      name: 'Kleverson Odair',
      address: 'Rua 3',
      phone: '33620003',
      color: genColor(),
      initials: genInitials('Kleverson Odair'),
      created_at: new Date(),
      updated_at: new Date(),
    },
  ], {}),

  down: async (queryInterface, Sequelize) => await queryInterface.bulkDelete('customers', null, {}),
};
