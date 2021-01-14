'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => await queryInterface.bulkInsert('stock_materials', [
    {
      name: 'Madeira',
      description: 'Madeira para vender por troca de dinheiro',
      quantity: 10,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Pregos 15x15',
      description: 'Pregos 15x15 para vender por troca de dinheiro',
      quantity: 20,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ], {}),

  down: async (queryInterface, Sequelize) => await queryInterface.bulkDelete('stock_materials', null, {}),
};
