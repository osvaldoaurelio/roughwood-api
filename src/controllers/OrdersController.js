const { Op: { or, in: In, iLike } } = require('sequelize');
const Customer = require('../models/Customer');
const Order = require('../models/Order');
const User = require('../models/User');

module.exports = {
  async list(req, res) {
    const { query: { search = '' } } = req;

    try {
      const orders = await Order.findAll({
        include: [
          { association: 'customer' },
          { association: 'employee' },
        ],
        where: {
          [or]: [
            { description: { [iLike]: `%${search}%` } },
            { '$customer.name$': { [iLike]: `%${search}%` } },
            { '$employee.name$': { [iLike]: `%${search}%` } },
          ],
        },
        order: [ ['created_at', 'ASC'] ],
      });

      return res.json({ orders });
    } catch (err) {
      return res.status(500).json();
    }
  },

  /** User non-admin route */
  async mine(req, res) {
    const { id } = req.user;

    try {
      const orders = await Order.findAll({
        where: {
          user_id: id,
          status: {
            [In]: ['progress', 'late']
          }
        },
        order: [ ['created_at', 'ASC'] ],
        include: { association: 'customer' },
      });
      
      return res.json({ orders });
    } catch (err) {
      return res.status(500).json();
    }
  },

  async store(req, res) {
    const {
      user_id,
      customer_id,
      initial_date,
      final_date,
      price,
      discount = 0,
      status = 'pending',
    } = req.body.order;

    if (user_id && customer_id && initial_date && final_date && price) {
      const user = await User.findByPk(user_id);
      if (!user) {
        return res.status(404).json({ error: 'User not found!' });
      }
      if (user.is_admin) {
        return res.status(403).json({ error: 'Você é admin' });
      }

      const customer = await Customer.findByPk(customer_id);
      if (!customer) {
        return res.status(404).json({ error: 'Customer not found!' });
      }

      const order = await Order.create({
        user_id,
        customer_id,
        initial_date,
        final_date,
        price,
        discount,
        status
      });

      return res.status(201).json({ order });
    } else {
      return res.status(400).json({ error: 'Bad request' });
    }
  },

  async show(req, res) {
    const { id } = req.params;

    const order = await Order.findByPk(id, {
      include: [{ association: 'customer' }, { association: 'employee' }],
    });

    if (order) {
      return res.json({ order });
    } else {
      return res.status(404).json({ error: 'Not Found' });
    }
  },

  async edit(req, res) {
    const { id } = req.params;
    
    let order = await Order.findByPk(id);
    
    if (order) {
      const { user_id, discount, status } = req.body.order;

      order.user_id = user_id ?? order.user_id;
      order.discount = discount ?? order.discount;
      order.status = status ?? order.status;

      order = await order.save();

      return res.json({ order });
    } else {
      return res.status(404).json({ error: 'Not Found' });
    }    
  },

  async destroy(req, res) {
    const { id } = req.params;

    const order = await Order.findByPk(id);
    
    if (order) {
      await order.destroy();

      return res.status(204).json();
    } else {
      return res.status(404).json({ error: 'Not Found' });
    }
  },

}
