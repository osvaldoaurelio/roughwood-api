'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => await queryInterface.bulkInsert('stock_materials', [
    {
      name: 'Madeira',
      price: 10.0,
      description: 'Madeira para vender por troca de dinheiro',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Pregos 15x15',
      price: 20.0,
      description: 'Pregos 15x15 para vender por troca de dinheiro',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ], {}),

  down: async (queryInterface, Sequelize) => await queryInterface.bulkDelete('stock_materials', null, {}),
};
