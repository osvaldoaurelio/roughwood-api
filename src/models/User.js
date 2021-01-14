const { DataTypes, Model } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      is_active: DataTypes.BOOLEAN,
      is_admin: DataTypes.BOOLEAN,
    }, {
      sequelize,
      tableName: 'users',
    });
  }

  static associate(models) {
    this.hasMany(models.Order, { foreignKey: 'user_id', as: 'user_orders' });
  }
}

module.exports = User;
