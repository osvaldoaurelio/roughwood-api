const { Op: { or, iLike } } = require('sequelize');

const Customer = require('../models/Customer');

const { genColor, genInitials } = require('../utils');

module.exports = {
  async list(req, res) {
    const { query: { search = '' } } = req;

    try {
      const customers = await Customer.findAll({
        where: {
          [or]: [
            { name: { [iLike]: `%${search}%` } },
            { cpf: { [iLike]: `%${search}%` } },
          ],
        },
        order: [['updated_at', 'DESC']],
      });
      return res.json({ customers });
    } catch (err) {
      return res.status(500).json();
    }
  },

  async store(req, res) {
    const {
      name,
      cpf,
      address = '',
      phone = '',
    } = req.body.customer;

    if (name && cpf) {
      const customer = await Customer.create({
        name,
        cpf,
        address,
        phone,
        color: genColor(),
        initials: genInitials(name),
      });

      return res.status(201).json({ customer });
    } else {
      return res.status(400).json({ error: 'Bad request' });
    }    
  },

  async show(req, res) {
    const { id } = req.params;

    const customer = await Customer.findByPk(id);

    if (customer) {
      return res.json({ customer });
    } else {
      return res.status(404).json({ error: 'Not found!' });
    }
  },
  
  async orders(req, res) {
    const { id } = req.params;

    const customer = await Customer.findByPk(id, {
      include: [{
        association: 'customer_orders',
        include: [{ association: 'employee' }],
      }],
    });

    if (customer) {
      return res.json({ customer });
    } else {
      return res.status(404).json({ error: 'Not found!' });
    }
  },

  async edit(req, res) {
    const { id } = req.params;
    
    let customer = await Customer.findByPk(id);
    
    if (customer) {
      const { name, cpf, address, phone } = req.body.customer;

      customer.name = name ?? customer.name;
      customer.cpf = cpf ?? customer.cpf;
      customer.address = address ?? customer.address;
      customer.phone = phone ?? customer.phone;
      customer.color = genColor(),
      customer.initials = genInitials(customer.name),

      customer = await customer.save();

      return res.json({ customer });
    } else {
      return res.status(404).json({ error: 'Not found!' });
    }    
  },

  async destroy(req, res) {
    const { id } = req.params;

    const customer = await Customer.findByPk(id);
    
    if (customer) {
      await customer.destroy();

      return res.status(204).json();
    } else {
      return res.status(404).json({ error: 'Not found!' });
    }
  },

}
