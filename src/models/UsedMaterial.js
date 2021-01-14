const { DataTypes, Model } = require('sequelize');

class UsedMaterial extends Model {
  static init(sequelize) {
    super.init({
      quantity: DataTypes.INTEGER,
    }, {
      sequelize,
      tableName: 'used_materials',
    });
  }

  static associate(models) {
    this.belongsTo(models.Order, { foreignKey: 'order_id', as: 'used_material_order' });
    this.belongsTo(models.StockMaterial, { foreignKey: 'stock_material_id', as: 'stock_material' });
  }
}

module.exports = UsedMaterial;
