const { DataTypes, Model } = require('sequelize');

class StockMaterial extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      supplier_name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      is_active: DataTypes.BOOLEAN,
    }, {
      sequelize,
      tableName: 'stock_materials',
    });
  }

  static associate(models) {
    this.hasMany(models.UsedMaterial, { foreignKey: 'stock_material_id', as: 'stock_used_materials' });
  }
}

module.exports = StockMaterial;
