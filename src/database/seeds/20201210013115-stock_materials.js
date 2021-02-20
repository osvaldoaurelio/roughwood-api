'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => await queryInterface.bulkInsert('stock_materials', [
    {
      name: 'Madeira',
      supplier_name: 'Jão',
      price: 10.0,
      description: 'Madeira para vender por troca de dinheiro',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Pregos 15x15',
      supplier_name: 'Zé',
      price: 20.0,
      description: 'Pregos 15x15 para vender por troca de dinheiro',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Verniz',
      supplier_name: 'Glaydstony',
      price: 35.0,
      description: 'Verniz para vender por troca de dinheiro',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ], {}),

  down: async (queryInterface, Sequelize) => await queryInterface.bulkDelete('stock_materials', null, {}),
};
