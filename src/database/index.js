const Sequelize = require('sequelize');

const Customer = require('../models/Customer');
const Order = require('../models/Order');
const StockMaterial = require('../models/StockMaterial');
const UsedMaterial = require('../models/UsedMaterial');
const User = require('../models/User');

const dbConfig = require('../config/database');

const connection = new Sequelize(dbConfig);

Customer.init(connection);
Order.init(connection);
StockMaterial.init(connection);
UsedMaterial.init(connection);
User.init(connection);

Customer.associate(connection.models);
Order.associate(connection.models);
StockMaterial.associate(connection.models);
UsedMaterial.associate(connection.models);
User.associate(connection.models);

module.exports = connection;
