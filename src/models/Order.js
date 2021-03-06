const { DataTypes, Model } = require('sequelize');

class Order extends Model {
  static init(sequelize) {
    super.init({
      description: DataTypes.TEXT,
      initial_date: DataTypes.DATE,
      final_date: DataTypes.DATE,
      labor_cost: DataTypes.FLOAT,
      total_price: DataTypes.FLOAT,
      discount: DataTypes.FLOAT,
      status: DataTypes.ENUM('pending', 'progress', 'done', 'late', 'invoiced'),
    }, {
      sequelize,
      tableName: 'orders',
    });
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'employee' });
    this.belongsTo(models.Customer, { foreignKey: 'customer_id', as: 'customer' });
    this.hasMany(models.UsedMaterial, { foreignKey: 'order_id', as: 'used_materials' });
  }
}

module.exports = Order;
