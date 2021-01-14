const { DataTypes, Model } = require('sequelize');

class Customer extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      cpf: DataTypes.STRING,
      address: DataTypes.STRING,
      phone: DataTypes.STRING,
    }, {
      sequelize,
      tableName: 'customers',
    });
  }

  static associate(models) {
    this.hasMany(models.Order, { foreignKey: 'customer_id', as: 'customer_orders' });
  }
}

module.exports = Customer;
