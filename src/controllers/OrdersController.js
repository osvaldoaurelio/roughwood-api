const { Op: { or, in: In, iLike } } = require('sequelize');
var { differenceInDays } = require('date-fns');

const Customer = require('../models/Customer');
const Order = require('../models/Order');
const User = require('../models/User');

const { makeLateMessage, calcDiscount } = require('../utils');

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
        order: [['status', 'ASC'], ['created_at', 'ASC']],
      });
      /** Mover para um CronJob no futuro */ 
      orders.forEach(async order => {
        const expired = order.final_date.getTime() < new Date().getTime();
        const isLateAllowed = !['done', 'invoiced'].includes(order.status);

        if (expired && isLateAllowed) {
          order.status = 'late';
          await order.save();
        }
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
      description = '',
      initial_date,
      final_date,
      labor_cost,
      total_price,
      used_materials,
    } = req.body.order;

    if (user_id) {
      const user = await User.findByPk(user_id);
      if (!user) {
        return res.status(404).json({ error: 'Funcionário não encontrado' });
      }
      if (user.is_admin) {
        return res.status(403).json({ error: 'Funcionário não pode ser admin' });
      }
    }

    if (customer_id && initial_date && final_date && labor_cost && total_price) {
      const customer = await Customer.findByPk(customer_id);
      if (!customer) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
      }

      const finalDate = new Date(...final_date.split('-'));
      const today = new Date()

      const order = await Order.create({
        user_id,
        customer_id,
        description,
        initial_date,
        final_date,
        labor_cost,
        total_price,
        discount: 0,
        used_materials,
        status: finalDate.getTime() > today.getTime() ? 'late' : 'pending',
      }, {
        include: [{ association: 'used_materials' }],
      });

      return res.status(201).json({ order });
    } else {
      return res.status(400).json({ error: 'Bad request' });
    }
  },

  async show(req, res) {
    const { id } = req.params;

    const order = await Order.findByPk(id, {
      include: [
        { association: 'customer' },
        { association: 'employee' },
        {
          association: 'used_materials',
          include: [
            { association: 'stock_material' },
          ],
        },
      ],
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
      const { user_id, description } = req.body.order;

      order.user_id = user_id ?? order.user_id;
      order.description = description ?? order.description;

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

  async invoice(req, res) {
    const { id } = req.params;
    
    let order = await Order.findByPk(id, {
      include: [
        { association: 'customer' },
        { association: 'employee' },
        {
          association: 'used_materials',
          include: [
            { association: 'stock_material' },
          ],
        },
      ],
    });
    
    if (order) {
      order.status = order.status === 'done'
        ? 'invoiced'
        : order.status;

      order = await order.save();

      return res.json({ order });
    } else {
      return res.status(404).json({ error: 'Not Found' });
    }
  },

  /** non-admin User route */
  async mine(req, res) {
    const { id } = req.user;

    try {
      const orders = await Order.findAll({
        where: {
          user_id: id,
          status: {
            [In]: ['pending', 'progress', 'late'],
          },
        },
        include: { association: 'customer' },
        order: [['created_at', 'ASC'], ['status', 'ASC']],
      });
      /** Mover para um CronJob no futuro */ 
      orders.forEach(async order => {
        const expired = order.final_date.getTime() < new Date().getTime();

        if (expired) {
          order.status = 'late';
          await order.save();
        }
      });

      return res.json({ orders });
    } catch (err) {
      return res.status(500).json();
    }
  },

  async done(req, res) {
    const { id } = req.params;
    
    let order = await Order.findByPk(id, {
      include: [
        { association: 'customer' },
        { association: 'employee' },
        {
          association: 'used_materials',
          include: [
            { association: 'stock_material' },
          ],
        },
      ],
    });
    
    if (order) {
      console.log(order.status, 'order.status === late', (order.status === 'late'), '\n\n\n');
      if (order.status === 'late') {
        const days = differenceInDays(new Date(), order.final_date);
        const discount = calcDiscount(days);
        const materialsValues = order.total_price - order.labor_cost;
        const newLaborCost = order.labor_cost * (1 - discount / 100);
        const newTotalPrice = materialsValues + newLaborCost;
        const msg = makeLateMessage(days, discount, order.labor_cost, newLaborCost);

        order.labor_cost = newLaborCost;
        order.total_price = newTotalPrice;
        order.description = `${order.description}${msg}`;
      }
      order.status = ['late', 'progress'].includes(order.status)
        ? 'done'
        : order.status;

      order = await order.save();

      return res.json({ order });
    } else {
      return res.status(404).json({ error: 'Not Found' });
    }
  },

  async progress(req, res) {
    const { id } = req.params;

    let order = await Order.findByPk(id, {
      include: [
        { association: 'customer' },
        { association: 'employee' },
        {
          association: 'used_materials',
          include: [
            { association: 'stock_material' },
          ],
        },
      ],
    });

    if (order) {
      order.status = order.status === 'pending'
        ? 'progress'
        : order.status;

      order = await order.save();

      return res.json({ order });
    } else {
      return res.status(404).json({ error: 'Not Found' });
    }
  },

}
